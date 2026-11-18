import { TOPICS } from "../../data/navigation";
import styles from "./TopicsTicker.module.css";

/** The strip of topics under the hero. */
export function TopicsTicker() {
  return (
    <div className={styles.ticker}>
      <div className={styles.track} aria-hidden="true">
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
      {/* The same topics, for anyone who can't see the strip move. */}
      <p className="visually-hidden">Topics we cover: {TOPICS.join(", ")}.</p>
    </div>
  );
}
