import { SectionHeader } from "../ui/SectionHeader";
import styles from "./CommunitySection.module.css";

const DIFFERENCES = [
  "Knowledge shared without gatekeeping",
  "Lessons from real engineering work, not slideware",
  "Different stacks, different approaches, one room",
  "Questions are welcome — all of them",
  "Engineers, creators and founders building side by side",
  "Contributions that help the wider mobile ecosystem",
];

const PRINCIPLES = [
  { title: "Share generously.", body: "What you figured out last month is what someone else is stuck on today." },
  { title: "Stay curious.", body: "The best sessions start with “how does that actually work?”" },
  { title: "Build thoughtfully.", body: "Care about the craft — the architecture, the edge cases, the person using it." },
  { title: "Learn in public.", body: "Half-finished ideas and honest mistakes teach as much as polished wins." },
  { title: "Make room for others.", body: "Every expert here was a beginner who someone made space for." },
];

export function CommunitySection() {
  return (
    <section id="community" className={`section ${styles.section}`} aria-labelledby="community-title">
      <div className="container">
        <SectionHeader
          id="community-title"
          tone="dark"
          index="04"
          label="Community"
          title={
            <>
              Come for the tech.
              <br />
              <span className={styles.accent}>Stay for the people.</span>
            </>
          }
        />

        <div className={styles.layout}>
          <div className={styles.side} data-reveal>
            <p className={styles.lead}>
              Mobile Builders isn&rsquo;t an audience watching a stage. It&rsquo;s a room full of people who build, and
              who know that the fastest way to get better is to learn from each other.
            </p>
            <ul role="list" className={styles.differences}>
              {DIFFERENCES.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          <div className={styles.manifesto}>
            <p className={`mono ${styles.manifestoLabel}`}>How we show up</p>
            <ol role="list" className={styles.principles}>
              {PRINCIPLES.map((p, i) => (
                <li key={p.title} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
                  <span className={`mono ${styles.num}`}>0{i + 1}</span>
                  <div>
                    <h3 className={styles.principle}>{p.title}</h3>
                    <p className={styles.principleBody}>{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
