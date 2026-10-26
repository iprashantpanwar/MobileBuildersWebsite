// Events are data, not markup: add one here and it appears on the page.
// Leave a field null rather than filling it with something unconfirmed — the cards
// are built to read well with speakers, dates and links missing.

export type EventKind = "Technical Session" | "Workshop" | "Community Event" | "Hackathon";

export type TopicTag =
  | "Cross-platform"
  | "Android"
  | "iOS"
  | "Kotlin Multiplatform"
  | "Jetpack Compose"
  | "Architecture"
  | "AI-assisted engineering";

export type CommunityEvent = {
  id: string;
  title: string;
  kind: EventKind;
  /** ISO 8601 with offset, e.g. "2026-11-12T18:30:00+05:30". */
  startsAt: string | null;
  durationMinutes?: number;
  speakers: string[];
  /** Who runs the event, as Luma lists it. Shown as "Hosted by"; not the same as speakers. */
  hostedBy?: string[];
  description?: string;
  topics: TopicTag[];
  registrationUrl?: string | null;
  recordingUrl?: string | null;
  slidesUrl?: string | null;
  /** Optional speaker portrait or cover; needs width/height to avoid layout shift. */
  image?: { src: string; alt: string; width: number; height: number } | null;
};

/** Sessions that haven't happened yet. Empty until one is confirmed. */
export const UPCOMING_EVENTS: CommunityEvent[] = [];

/**
 * Sessions the community has already run. Titles are the community's own; speakers,
 * dates and slides are left empty until they're filled in from the source.
 */
export const PAST_EVENTS: CommunityEvent[] = [
  {
    id: "cross-platform-showdown",
    title: "The Cross-Platform Showdown: KMP vs React Native vs Flutter",
    kind: "Technical Session",
    startsAt: null,
    speakers: [],
    description:
      "Three ways to ship one product to two platforms, compared side by side: where each one shares code, where it gets in the way, and how to choose for your team.",
    topics: ["Cross-platform", "Kotlin Multiplatform"],
    recordingUrl: "https://youtu.be/T3AxRyMDfZY",
    slidesUrl: null,
  },
  {
    id: "compose-zero-to-advanced",
    title: "Jetpack Compose: Zero to Advanced",
    kind: "Technical Session",
    startsAt: null,
    speakers: [],
    description:
      "From the first composable to the parts that trip up experienced teams — state, recomposition and building UI that stays fast as it grows.",
    topics: ["Android", "Jetpack Compose"],
    recordingUrl: "https://youtu.be/9VmBHroh2eU",
    slidesUrl: null,
  },
  {
    id: "payment-flows",
    title: "Building Payment Flows That Don't Break: Architecture Lessons from 4M+ Users",
    kind: "Technical Session",
    startsAt: null,
    speakers: [],
    description:
      "What it takes to keep money moving reliably in a mobile app at scale: the architecture decisions behind payment flows that hold up in production.",
    topics: ["Architecture"],
    recordingUrl: "https://youtu.be/KLLPKaod3dE",
    slidesUrl: null,
  },
  {
    id: "solid-android",
    title: "SOLID Principles in Real-World Android Development",
    kind: "Technical Session",
    startsAt: null,
    speakers: [],
    description:
      "How to use SOLID principles to write cleaner, more maintainable Android code through practical examples, common code smells, and refactoring techniques.",
    topics: ["Android", "Architecture"],
    recordingUrl: "https://youtu.be/D0d--VSKI4A",
    slidesUrl: null,
  },
  {
    id: "native-shared-workflows",
    title: "Cross-Platform Setup: Targeting iOS & Android using Claude & Modaal App Builder",
    kind: "Technical Session",
    startsAt: null,
    speakers: [],
    description:
      "Explores how to build maintainable, dual-platform mobile projects using the open-source Duet framework and AI-assisted, spec-driven development.",
    topics: ["Cross-platform", "iOS", "Android", "AI-assisted engineering"],
    recordingUrl: "https://youtu.be/GqYvWXcY8m8",
    slidesUrl: null,
  },
];

/**
 * Shown only in `npm run dev`, so the upcoming-event card can be designed against
 * something. It is stamped as sample data and never ships in a production build.
 */
export const DEV_SAMPLE_EVENT: CommunityEvent = {
  id: "sample",
  title: "Sample session title — replace with a real event in src/data/events.ts",
  kind: "Workshop",
  startsAt: "2026-12-03T18:30:00+05:30",
  durationMinutes: 90,
  speakers: ["Speaker name"],
  description: "A short description of the session: what attendees will learn and who it's for.",
  topics: ["Kotlin Multiplatform", "AI-assisted engineering"],
  registrationUrl: null,
};
