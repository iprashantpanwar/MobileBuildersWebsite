// Hackathons, awards and open calls worth knowing about. Add one here and it appears in the
// Opportunities section; once its deadline passes it drops off the page by itself.

export type OpportunityKind = "Award" | "Hackathon" | "Call for speakers" | "Challenge";

export type Opportunity = {
  id: string;
  title: string;
  kind: OpportunityKind;
  /** Who runs it, e.g. "Mobile Builders" or a partner. */
  organizer: string;
  summary: string;
  /** Who can take part, shown as a callout. */
  eligibility?: string;
  /** ISO 8601 date the opportunity closes. Leave null when no date has been announced. */
  deadline: string | null;
  cta: { label: string; url: string };
  /** Text for the round emblem on the card: words around the ring, and a short centre mark. */
  emblem?: { ring: string; center: string };
  /** Award categories, shown as emblem tiles under the card. */
  categories?: { heading: string; items: AwardCategory[] };
};

/** Tile colours from the Builder's Choice Awards identity. */
export type AwardTile = "forest" | "sage" | "lavender" | "peach" | "charcoal";

export type AwardCategory = {
  name: string;
  /** Emblem file in public/awards/. */
  emblem: string;
  tile: AwardTile;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: "builders-choice-awards-26",
    title: "The Builders Choice Awards '26",
    kind: "Award",
    organizer: "Mobile Builders",
    summary:
      "Spotlighting the builders, engineers and creators who elevate the mobile industry through their code, products and community spirit.",
    eligibility: "Nominations are open exclusively to members of the Mobile Builders Hub.",
    deadline: null,
    cta: {
      label: "Nominate a builder",
      url: "https://docs.google.com/forms/d/1cC7PssWWWLIBTHxQ-sCLgWS-BXFpNa_ubS-FMD_nL00/viewform",
    },
    emblem: { ring: "Builders Choice Awards · Mobile Builders · ", center: "’26" },
    categories: {
      heading: "Builder’s Choice Awards · 2026",
      items: [
        { name: "Mobile Builder of the Year", emblem: "awards/01-structured-summit.svg", tile: "forest" },
        { name: "Community Champion", emblem: "awards/02-interlocking-rings.svg", tile: "sage" },
        { name: "Open Source Contributor", emblem: "awards/03-open-module-grid.svg", tile: "lavender" },
        { name: "Indie Hacker / Solo Founder", emblem: "awards/04-standalone-tower.svg", tile: "peach" },
        { name: "Rising Star in Mobile", emblem: "awards/05-rising-spark.svg", tile: "charcoal" },
      ],
    },
  },
];
