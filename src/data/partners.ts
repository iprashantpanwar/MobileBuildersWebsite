// Organisations Mobile Builders partners with. Only list a partner once the partnership is agreed.
// Colours and icons come from each partner's own site; icons live in public/partners/.

export type Partner = {
  name: string;
  /** Official website; null until confirmed, and the card then shows no link. */
  url: string | null;
  /** Card gradient, light to deep, built around the partner's brand colour. */
  gradient: [from: string, to: string];
  /** Text colour on that gradient (checked for 4.5:1 contrast at both ends). */
  onColor: string;
  icon: {
    /** Path inside public/, without a leading slash. */
    src: string;
    width: number;
    height: number;
    /** "mark": a transparent mark set on a white tile. "tile": a square image that is the tile itself. */
    kind: "mark" | "tile";
  };
};

export const PARTNERS: Partner[] = [
  {
    name: "Modaal",
    url: "https://modaal.dev",
    gradient: ["#5b7042", "#26311c"],
    onColor: "#f5f4ed",
    icon: { src: "partners/modaal.svg", width: 92, height: 64, kind: "mark" },
  },
  {
    name: "Newly",
    url: "https://newly.app",
    gradient: ["#c41ae0", "#5d1bc9"],
    onColor: "#ffffff",
    icon: { src: "partners/newly.svg", width: 35, height: 26, kind: "mark" },
  },
  {
    name: "Packt",
    url: "https://www.packtpub.com",
    gradient: ["#ffa25c", "#f46f22"],
    onColor: "#14231f",
    icon: { src: "partners/packt.jpg", width: 256, height: 256, kind: "tile" },
  },
];
