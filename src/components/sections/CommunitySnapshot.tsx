import { TOPICS } from "../../data/navigation";
import styles from "./CommunitySnapshot.module.css";

const AUDIENCE = [
  { label: "Mobile engineers", tone: "sage" },
  { label: "Indie hackers", tone: "peach" },
  { label: "Open-source contributors", tone: "lavender" },
  { label: "Founders", tone: "lime" },
  { label: "The simply curious", tone: "plain" },
] as const;

export function CommunitySnapshot() {
  return (
    <section id="about" className={styles.snapshot} aria-labelledby="about-title">
      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.track}>
          {[0, 1].map((copy) => (
            <ul key={copy} role="list" className={styles.tickerList}>
              {TOPICS.map((t) => (
                <li key={t}>
                  {t}
                  <span className={styles.sep}>✳</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <div className={`container ${styles.about}`}>
        <p className={`mono ${styles.label}`}>About</p>
        <div className={styles.body} data-reveal>
          <h2 id="about-title" className={styles.statement}>
            Mobile Builders is where people who build mobile products come together to{" "}
            <em>learn, share, and build better.</em>
          </h2>
          <p className={styles.sub}>
            Android or iOS, native or cross-platform, first app or fiftieth — the community is for anyone who ships to
            a phone and wants to get better at it, alongside others doing the same.
          </p>
          <ul role="list" className={styles.audience} aria-label="Who's here">
            {AUDIENCE.map((a) => (
              <li key={a.label} className={styles[a.tone]}>
                {a.label}
              </li>
            ))}
          </ul>
          {/* The same topics the ticker shows, for anyone who can't see it move. */}
          <p className="visually-hidden">Topics we cover: {TOPICS.join(", ")}.</p>
        </div>
      </div>
    </section>
  );
}
