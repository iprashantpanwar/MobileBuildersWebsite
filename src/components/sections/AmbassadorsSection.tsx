import { AMBASSADOR_PROGRAM, AMBASSADORS } from "../../data/ambassadors";
import { linkProps } from "../../lib/links";
import { Arrow } from "../ui/Arrow";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./AmbassadorsSection.module.css";

export function AmbassadorsSection() {
  if (AMBASSADORS.length === 0) return null;

  return (
    <section id="ambassadors" className="section" aria-labelledby="ambassadors-title">
      <div className="container">
        <SectionHeader
          id="ambassadors-title"
          index="07"
          label="Ambassador program"
          title={
            <>
              Meet our Founding <span className={styles.accent}>Ambassadors.</span>
            </>
          }
          intro={`A handpicked cohort. Over the next ${AMBASSADOR_PROGRAM.term.toLowerCase()}, our Founding Ambassadors will help shape what Mobile Builders becomes.`}
        />

        <div className={styles.program} data-reveal>
          <p className={`mono ${styles.badge}`}>
            <span className={styles.diamond} aria-hidden="true" />
            {AMBASSADOR_PROGRAM.term} · {AMBASSADOR_PROGRAM.cohort}
          </p>
          <ol role="list" className={styles.commitments}>
            {AMBASSADOR_PROGRAM.commitments.map((c, i) => (
              <li key={c}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {c}
              </li>
            ))}
          </ol>
        </div>

        <ul role="list" className={styles.grid}>
          {AMBASSADORS.map((a, i) => (
            <li
              key={a.name}
              className={styles.card}
              data-reveal
              style={{ "--reveal-delay": `${(i % 4) * 80}ms` } as React.CSSProperties}
            >
              <img
                src={`${import.meta.env.BASE_URL}${a.photo}`}
                alt={`Portrait of ${a.name}`}
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className={styles.photo}
              />
              <div className={styles.body}>
                <p className={`mono ${styles.number}`}>Nº {String(i + 1).padStart(2, "0")}</p>
                <h3 className={styles.name}>{a.name}</h3>
                <p className={styles.role}>{a.role}</p>
                <a {...linkProps(a.linkedin)} className={styles.link}>
                  LinkedIn <Arrow direction="up-right" className={styles.arrow} />
                  <span className="visually-hidden"> profile of {a.name} (opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
