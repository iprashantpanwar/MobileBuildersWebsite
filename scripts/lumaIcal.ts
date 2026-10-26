// Reads a Luma calendar's public iCal feed and turns its events into the same
// CommunityEvent shape the rest of the site uses. Used by scripts/syncLuma.ts; it can't run
// in the browser, because Luma's feed doesn't allow other sites to read it.
//
// What Luma's feed carries, per event: title, start/end, a "Get up-to-date information at:
// <link>" line and a "Hosted by A & B" line. There's no description, cover or speaker field,
// so the cards leave those out rather than guess.

import type { CommunityEvent, EventKind, TopicTag } from "../src/data/events";

type IcalProperty = { name: string; params: Record<string, string>; value: string };

/** Fetches the feed and returns every event in it, past and upcoming, oldest first. */
export async function fetchLumaEvents(icalUrl: string): Promise<CommunityEvent[]> {
  const res = await fetch(icalUrl, { headers: { Accept: "text/calendar" } });
  if (!res.ok) throw new Error(`Luma iCal feed answered ${res.status}`);
  return parseLumaIcal(await res.text());
}

export function parseLumaIcal(ics: string): CommunityEvent[] {
  return splitEvents(ics)
    .map(toCommunityEvent)
    .filter((e): e is CommunityEvent => e !== null)
    .sort((a, b) => a.startsAt!.localeCompare(b.startsAt!));
}

function splitEvents(ics: string): IcalProperty[][] {
  // RFC 5545 folds long lines: a line starting with a space or tab continues the previous one.
  const lines = ics.replace(/\r\n/g, "\n").replace(/\n[ \t]/g, "").split("\n");
  const events: IcalProperty[][] = [];
  let current: IcalProperty[] | null = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") current = [];
    else if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
    } else if (current && line) {
      const prop = parseProperty(line);
      if (prop) current.push(prop);
    }
  }
  return events;
}

function parseProperty(line: string): IcalProperty | null {
  // The value starts at the first colon that isn't inside a quoted parameter.
  let inQuotes = false;
  let split = -1;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') inQuotes = !inQuotes;
    else if (line[i] === ":" && !inQuotes) {
      split = i;
      break;
    }
  }
  if (split === -1) return null;
  const [name, ...rawParams] = line.slice(0, split).split(";");
  const params: Record<string, string> = {};
  for (const p of rawParams) {
    const eq = p.indexOf("=");
    if (eq > 0) params[p.slice(0, eq).toUpperCase()] = p.slice(eq + 1).replace(/^"|"$/g, "");
  }
  return { name: name.toUpperCase(), params, value: line.slice(split + 1) };
}

function unescapeText(value: string) {
  return value.replace(/\\([\\;,nN])/g, (_, c: string) => (c === "n" || c === "N" ? "\n" : c));
}

/** DTSTART/DTEND → ISO string. Handles UTC ("…Z"), TZID-local and all-day dates. */
function parseDate(prop: IcalProperty | undefined): string | null {
  if (!prop) return null;
  const m = prop.value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/);
  if (!m) return null;
  const [, y, mo, d, h = "00", mi = "00", s = "00", utc] = m;
  const asUtc = Date.UTC(+y, +mo - 1, +d, +h, +mi, +s);
  const tz = prop.params.TZID;
  if (utc || !tz) return new Date(asUtc).toISOString();
  // Wall-clock time in `tz`: shift by that zone's offset at (roughly) that moment.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(asUtc));
  const get = (t: string) => +parts.find((p) => p.type === t)!.value;
  const zoned = Date.UTC(get("year"), get("month") - 1, get("day"), get("hour"), get("minute"), get("second"));
  return new Date(asUtc - (zoned - asUtc)).toISOString();
}

function toCommunityEvent(props: IcalProperty[]): CommunityEvent | null {
  const get = (name: string) => props.find((p) => p.name === name);
  const status = get("STATUS")?.value.toUpperCase();
  const title = get("SUMMARY") && unescapeText(get("SUMMARY")!.value).trim();
  const startsAt = parseDate(get("DTSTART"));
  if (!title || !startsAt || status === "CANCELLED") return null;

  const endsAt = parseDate(get("DTEND"));
  const description = unescapeText(get("DESCRIPTION")?.value ?? "");
  const location = unescapeText(get("LOCATION")?.value ?? "");

  // Luma's short public link sits in the description; the location holds the long /event/ one.
  const lumaLink = /https?:\/\/(?:lu\.ma|luma\.com)\/[^\s\\]+/;
  const registrationUrl =
    description.match(/up-to-date information at:\s*(\S+)/i)?.[1] ??
    description.match(lumaLink)?.[0] ??
    location.match(lumaLink)?.[0] ??
    get("URL")?.value ??
    null;

  const hosts = description.match(/Hosted by (.+)/i)?.[1];
  const hostedBy = hosts
    ? hosts
        .split(/\s*(?:&|,| and )\s*/)
        .map((h) => h.trim())
        .filter(Boolean)
    : [];

  const uid = get("UID")?.value ?? title;
  return {
    id: `luma-${uid.split("@")[0]}`,
    title,
    kind: inferKind(title),
    startsAt,
    durationMinutes: endsAt ? Math.round((Date.parse(endsAt) - Date.parse(startsAt)) / 60000) : undefined,
    speakers: [],
    hostedBy,
    description: "",
    topics: inferTopics(title),
    registrationUrl,
  };
}

function inferKind(title: string): EventKind {
  if (/hackathon/i.test(title)) return "Hackathon";
  if (/workshop/i.test(title)) return "Workshop";
  if (/builders connect|shipping|meetup|community|social/i.test(title)) return "Community Event";
  return "Technical Session";
}

const TOPIC_KEYWORDS: [TopicTag, RegExp][] = [
  ["Kotlin Multiplatform", /\bKMP\b|multiplatform/i],
  ["Jetpack Compose", /compose/i],
  ["Cross-platform", /cross-platform|flutter|react native|\bKMP\b/i],
  ["Android", /android/i],
  ["iOS", /\biOS\b|swift/i],
  ["AI-assisted engineering", /\bAI\b|agent|LLM|claude/i],
  ["Architecture", /architecture|modulari[sz]ation|SOLID|clean/i],
];

function inferTopics(title: string): TopicTag[] {
  return TOPIC_KEYWORDS.filter(([, re]) => re.test(title)).map(([tag]) => tag);
}
