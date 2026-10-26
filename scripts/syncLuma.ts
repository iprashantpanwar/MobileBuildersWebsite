// Syncs Luma events into the site's data files. Run by the scheduled GitHub workflows
// (.github/workflows/luma-*.yml), or by hand:
//
//   node scripts/syncLuma.ts upcoming   # replaces src/data/luma/upcoming.json
//   node scripts/syncLuma.ts past       # adds new past technical sessions to src/data/luma/past.json
//
// Past sessions are only ever added, never rewritten, so a recording link filled in by hand
// survives every later sync. Sessions already written by hand in src/data/events.ts are skipped.

import { readFile, writeFile } from "node:fs/promises";
import { siteConfig } from "../src/config/siteConfig.ts";
import { PAST_EVENTS, type CommunityEvent } from "../src/data/events.ts";
import { fetchLumaEvents } from "./lumaIcal.ts";

const DATA_DIR = new URL("../src/data/luma/", import.meta.url);
const UPCOMING_FILE = new URL("upcoming.json", DATA_DIR);
const PAST_FILE = new URL("past.json", DATA_DIR);

/** Comparable form of a title: Luma's titles are sometimes a shortened version of ours. */
const normalize = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, "");

function isSameSession(a: string, b: string) {
  const [x, y] = [normalize(a), normalize(b)];
  return x.startsWith(y) || y.startsWith(x);
}

async function readEvents(file: URL): Promise<CommunityEvent[]> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as CommunityEvent[];
  } catch {
    return [];
  }
}

/** Writes only when the content changed, so an unchanged sync leaves nothing to commit. */
async function writeEvents(file: URL, events: CommunityEvent[]) {
  const next = JSON.stringify(events, null, 2) + "\n";
  const current = await readFile(file, "utf8").catch(() => "");
  if (current === next) return false;
  await writeFile(file, next);
  return true;
}

async function syncUpcoming(all: CommunityEvent[], now: number) {
  const upcoming = all.filter((e) => Date.parse(e.startsAt!) > now);
  const changed = await writeEvents(UPCOMING_FILE, upcoming);
  console.log(`Upcoming: ${upcoming.length} event(s)${changed ? ", file updated" : ", no change"}`);
}

async function syncPast(all: CommunityEvent[], now: number) {
  const existing = await readEvents(PAST_FILE);
  const known = new Set(existing.map((e) => e.id));
  const added = all
    .filter((e) => Date.parse(e.startsAt!) <= now)
    // Only technical sessions are recorded, so only they belong in the past-sessions library.
    .filter((e) => e.kind === "Technical Session")
    .filter((e) => !known.has(e.id))
    .filter((e) => !PAST_EVENTS.some((p) => isSameSession(p.title, e.title)))
    .map((e): CommunityEvent => ({ ...e, recordingUrl: null, slidesUrl: null }));

  await writeEvents(
    PAST_FILE,
    [...existing, ...added].sort((a, b) => (a.startsAt ?? "").localeCompare(b.startsAt ?? "")),
  );
  console.log(
    added.length
      ? `Past: added ${added.map((e) => `"${e.title}"`).join(", ")}`
      : "Past: no new technical sessions",
  );
}

const mode = process.argv[2];
if (mode !== "upcoming" && mode !== "past") {
  console.error("Usage: node scripts/syncLuma.ts <upcoming|past>");
  process.exit(1);
}

const icalUrl = process.env.LUMA_ICAL_URL || siteConfig.links.lumaCalendarIcal;
if (!icalUrl) {
  console.error("No Luma iCal URL: set links.lumaCalendarIcal in src/config/siteConfig.ts or LUMA_ICAL_URL.");
  process.exit(1);
}

const all = await fetchLumaEvents(icalUrl);
// SYNC_NOW (an ISO date) pretends the sync runs at another time, to preview or backfill.
const now = process.env.SYNC_NOW ? Date.parse(process.env.SYNC_NOW) : Date.now();
await (mode === "upcoming" ? syncUpcoming(all, now) : syncPast(all, now));
