import { SectionHeader } from "../ui/SectionHeader";
import styles from "./WhatWeDoSection.module.css";

const PILLARS = [
  {
    n: "01",
    title: "Learn",
    body: "Technical sessions, live demos, engineering discussions and practical lessons from people working on real products.",
    tags: ["Sessions", "Live demos", "Deep dives"],
    art: "learn",
  },
  {
    n: "02",
    title: "Connect",
    body: "Meet mobile engineers, indie makers, founders, open-source contributors and curious developers who want to swap ideas and learn together.",
    tags: ["Discussions", "Peers", "Mentors"],
    art: "connect",
  },
  {
    n: "03",
    title: "Build and Share",
    body: "Explore new technology, share what you're working on, talk through hard problems, contribute to open source and help others get better at the craft.",
    tags: ["Projects", "Open source", "Feedback"],
    art: "build",
  },
] as const;

function PillarArt({ kind }: { kind: (typeof PILLARS)[number]["art"] }) {
  if (kind === "learn") {
    return (
      <svg viewBox="0 0 160 100" aria-hidden="true" className="art">
        <rect x="18" y="22" width="96" height="62" rx="8" className="fill-surface stroke" />
        <rect x="34" y="12" width="96" height="62" rx="8" className="fill-surface stroke" />
        <rect x="50" y="2" width="96" height="62" rx="8" className="fill-ink" />
        <path d="M91 22 L107 33 L91 44 Z" className="fill-lime" />
        <rect x="62" y="52" width="72" height="3" rx="1.5" className="fill-muted" />
        <rect x="62" y="52" width="30" height="3" rx="1.5" className="fill-lime" />
      </svg>
    );
  }
  if (kind === "connect") {
    const nodes: [number, number][] = [
      [30, 30], [80, 18], [130, 34], [52, 76], [108, 80], [80, 50],
    ];
    const edges = [[0, 5], [1, 5], [2, 5], [3, 5], [4, 5], [0, 3], [2, 4], [0, 1], [1, 2]];
    return (
      <svg viewBox="0 0 160 100" aria-hidden="true" className="art">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} className="stroke" />
        ))}
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 5 ? 12 : 8} className={i === 5 ? "fill-ink" : i % 2 ? "fill-surface stroke" : "fill-lime stroke"} />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 100" aria-hidden="true" className="art">
      <rect x="22" y="58" width="38" height="34" rx="6" className="fill-ink" />
      <rect x="62" y="58" width="38" height="34" rx="6" className="fill-surface stroke" />
      <rect x="102" y="58" width="38" height="34" rx="6" className="fill-lime stroke" />
      <rect x="42" y="22" width="38" height="34" rx="6" className="fill-surface stroke" />
      <rect x="82" y="22" width="38" height="34" rx="6" className="fill-ink" />
      <rect x="62" y="-8" width="38" height="28" rx="6" className="fill-lime stroke lift" />
    </svg>
  );
}

export function WhatWeDoSection() {
  return (
    <section id="what-we-do" className="section" aria-labelledby="what-we-do-title">
      <div className="container">
        <SectionHeader
          id="what-we-do-title"
          index="01"
          label="What we do"
          title={
            <>
              Less gatekeeping.
              <br />
              More building.
            </>
          }
          intro="Mobile Builders is run by and for people who make things. Three ideas hold it together."
        />
        <ol role="list" className={styles.grid}>
          {PILLARS.map((p, i) => (
            <li
              key={p.n}
              className={`${styles.card} ${styles[p.art]}`}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className={styles.artWrap}>
                <PillarArt kind={p.art} />
              </div>
              <div className={styles.text}>
                <p className={`mono ${styles.n}`}>{p.n}</p>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.body}>{p.body}</p>
                <ul role="list" className={styles.tags}>
                  {p.tags.map((t) => (
                    <li key={t} className="mono">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
