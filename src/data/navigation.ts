export type NavLink = { label: string; href: `#${string}` };

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Opportunities", href: "#opportunities" },
  { label: "Resources", href: "#resources" },
  { label: "Community", href: "#community" },
  { label: "Team", href: "#team" },
  { label: "Ambassadors", href: "#ambassadors" },
];

/** What the community talks about. Shown in the snapshot strip and used as event topics. */
export const TOPICS = [
  "Android",
  "iOS",
  "Kotlin Multiplatform",
  "Jetpack Compose",
  "SwiftUI",
  "Flutter",
  "React Native",
  "AI × Mobile",
  "AI agents",
  "Mobile architecture",
  "Open source",
  "Developer tools",
  "Indie hacking",
  "Product building",
] as const;
