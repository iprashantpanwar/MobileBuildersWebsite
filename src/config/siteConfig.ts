// Every outward link the site uses lives here. A value left as null is one nobody has
// confirmed yet: the page hides or softens whatever would point at it instead of guessing.

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  /** Public origin, e.g. "https://mobilebuilders.dev". Enables canonical + absolute social-card URLs. */
  siteUrl: string | null;
  logo: {
    /** The original 500×500 asset, transparent background. */
    original: string;
    /** The same artwork with only its transparent margin trimmed (326×196). */
    mark: string;
    markWidth: number;
    markHeight: number;
  };
  links: {
    /** Where every "Join" button goes: Discord, Slack, WhatsApp, Luma calendar, … */
    communityInvite: string | null;
    linkedin: string | null;
    youtube: string | null;
    /** A full events page or calendar (Luma, Meetup, …), if one exists. */
    eventsCalendar: string | null;
    /**
     * The `src` of Luma's calendar embed (Luma → Calendars → your calendar → Settings → Embed),
     * e.g. "https://luma.com/embed/calendar/cal-XXXX/events". Only the URL, not the whole iframe.
     */
    lumaCalendarEmbed: string | null;
    /**
     * The calendar's public iCal feed (Luma calendar page → "Add iCal Subscription").
     * scripts/syncLuma.ts reads it on a schedule and writes src/data/luma/*.json.
     * The LUMA_ICAL_URL environment variable overrides it.
     */
    lumaCalendarIcal: string | null;
  };
  contactEmail: string | null;
  /** Endpoint the collaboration form POSTs JSON to (Formspree, your own API, …). */
  partnershipFormEndpoint: string | null;
};

export const siteConfig: SiteConfig = {
  name: "Mobile Builders",
  tagline: "Better mobile. Built together.",
  description:
    "Join Mobile Builders, an online community for mobile developers exploring Android, iOS, Kotlin Multiplatform, AI-powered development, and the future of mobile.",
  siteUrl: null,
  logo: {
    original: "/logo_backgroundless-preview.png",
    mark: "/logo-mark.png",
    markWidth: 326,
    markHeight: 196,
  },
  links: {
    communityInvite: "https://join.slack.com/t/mobilebuildershub/shared_invite/zt-48904yvtv-eKVPSG3oxudif3N__iqJtw",
    linkedin: null,
    youtube: null,
    eventsCalendar: "https://luma.com/mobilebuilders",
    lumaCalendarEmbed: null,
    lumaCalendarIcal: "https://api.luma.com/ics/get?entity=calendar&id=cal-Xni6GjDRlOxUDP2",
  },
  contactEmail: null,
  partnershipFormEndpoint: null,
};
