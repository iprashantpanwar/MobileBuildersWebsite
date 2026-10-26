import styles from "./HeroVisual.module.css";

// The composition is laid out on a 560 × 560 artboard; everything is positioned in those
// units and converted to percentages, so it scales as one piece.
const W = 560;
const H = 560;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;

type Node = {
  label: string;
  /** Where the chip's connector dot sits. */
  at: [number, number];
  /** Where its line meets the device. */
  to: [number, number];
  side: "left" | "right";
  tone: "lime" | "lavender" | "peach" | "sage" | "plain";
};

const NODES: Node[] = [
  { label: "Android", at: [150, 112], to: [185, 168], side: "left", tone: "sage" },
  { label: "iOS", at: [150, 222], to: [185, 252], side: "left", tone: "lavender" },
  { label: "Indie products", at: [150, 508], to: [185, 470], side: "left", tone: "peach" },
  { label: "KMP", at: [418, 252], to: [395, 290], side: "right", tone: "lime" },
  { label: "AI agents", at: [418, 336], to: [395, 362], side: "right", tone: "plain" },
  { label: "Open source", at: [418, 470], to: [395, 438], side: "right", tone: "sage" },
];

function connector({ at: [ax, ay], to: [tx, ty] }: Node) {
  const mx = (ax + tx) / 2;
  return `M ${ax} ${ay} C ${mx} ${ay}, ${mx} ${ty}, ${tx} ${ty}`;
}

// A fixed, hand-tuned pattern so the "contributions" card looks the same on every render.
const CONTRIBUTIONS = "0120312401230102304012140320120431201403".split("").map(Number);

export function HeroVisual() {
  return (
    <figure className={styles.stage} aria-hidden="true">
      <svg className={styles.lines} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {NODES.map((n) => (
          <g key={n.label}>
            <path d={connector(n)} className={styles.path} />
            <circle cx={n.to[0]} cy={n.to[1]} r={3.5} className={styles.joint} />
          </g>
        ))}
      </svg>

      {/* Device */}
      <div className={styles.phone} style={{ left: pct(185, W), top: pct(40, H), width: pct(210, W), height: pct(460, H) }}>
        <div className={styles.screen}>
          <div className={styles.status}>
            <span>9:41</span>
            <span className={styles.island} />
            <span className={styles.signal} />
          </div>
          <div className={styles.appHeader}>
            <span className={styles.appTitle}>Build log</span>
            <span className={styles.avatars}>
              <i style={{ background: "var(--c-lavender)" }} />
              <i style={{ background: "var(--c-peach)" }} />
              <i style={{ background: "var(--c-lime)" }} />
            </span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureTag}>shared module</span>
            <span className={styles.featureBar} style={{ width: "78%" }} />
            <span className={styles.featureBar} style={{ width: "54%" }} />
            <span className={styles.progress}>
              <span style={{ width: "68%" }} />
            </span>
          </div>
          <ul className={styles.rows}>
            {["var(--c-sage)", "var(--c-lavender)", "var(--c-peach)"].map((c, i) => (
              <li key={c}>
                <span className={styles.rowIcon} style={{ background: c }} />
                <span className={styles.rowText}>
                  <span style={{ width: `${72 - i * 14}%` }} />
                  <span style={{ width: `${44 + i * 8}%` }} />
                </span>
                <span className={[styles.toggle, i === 0 && styles.toggleOn].filter(Boolean).join(" ")} />
              </li>
            ))}
          </ul>
          <nav className={styles.tabbar}>
            <span className={styles.tabActive} />
            <span />
            <span />
            <span />
          </nav>
        </div>
      </div>

      {/* Shared code */}
      <div className={`${styles.card} ${styles.code}`} style={{ left: 0, top: pct(318, H), width: pct(250, W) }}>
        <span className={styles.cardLabel}>commonMain / Platform.kt</span>
        <pre>
          <code>
            <span className={styles.kw}>expect</span> <span className={styles.kw}>class</span> Platform() {"{"}
            {"\n  "}
            <span className={styles.kw}>val</span> name: <span className={styles.type}>String</span>
            {"\n}"}
          </code>
        </pre>
      </div>

      {/* Contributions */}
      <div className={`${styles.card} ${styles.contrib}`} style={{ left: pct(350, W), top: pct(64, H), width: pct(210, W) }}>
        <span className={styles.cardLabel}>contributions</span>
        <span className={styles.cells}>
          {CONTRIBUTIONS.map((v, i) => (
            <i key={i} data-level={v} />
          ))}
        </span>
        <span className={styles.cardFoot}>pull requests welcome</span>
      </div>

      {NODES.map((n) => (
        <span
          key={n.label}
          className={`${styles.chip} ${styles[n.side]} ${styles[n.tone]}`}
          style={{ left: pct(n.at[0], W), top: pct(n.at[1], H) }}
        >
          {n.label}
        </span>
      ))}

      <figcaption className={styles.caption}>fig. 01 — one product, many hands</figcaption>
    </figure>
  );
}
