import { TEAM } from "../../data/team";
import { linkProps } from "../../lib/links";
import { Arrow } from "../ui/Arrow";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./TeamSection.module.css";

const TONES = ["lavender", "sage", "peach", "lime"] as const;

export function TeamSection() {
  return (
    <section id="team" className="section" aria-labelledby="team-title">
      <div className={`container ${styles.layout}`}>
        <SectionHeader
          id="team-title"
          index="06"
          label="Team"
          title="The people behind Mobile Builders."
          intro="Mobile Builders is run by builders, for builders. Say hello, or reach out about a session you'd like to see."
        />

        <ul role="list" className={styles.grid}>
          {TEAM.map((member, i) => (
            <li
              key={member.name}
              className={styles.card}
              data-reveal
              style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className={`${styles.photoWrap} ${styles[TONES[i % TONES.length]]}`}>
                <img
                  src={`${import.meta.env.BASE_URL}${member.photo}`}
                  alt={`Portrait of ${member.name}`}
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className={styles.photo}
                />
              </div>
              <div className={styles.body}>
                <p className={`mono ${styles.role}`}>{member.role}</p>
                <h3 className={styles.name}>{member.name}</h3>
                <a {...linkProps(member.linkedin)} className={styles.link}>
                  LinkedIn <Arrow direction="up-right" className={styles.arrow} />
                  <span className="visually-hidden"> profile of {member.name} (opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
