import type { AwardCategory } from "../../data/opportunities";
import styles from "./AwardCategories.module.css";

type Props = { id: string; heading: string; items: AwardCategory[] };

/** The award's categories as emblem tiles, from the Builder's Choice Awards identity. */
export function AwardCategories({ id, heading, items }: Props) {
  const titleId = `${id}-categories`;
  return (
    <section className={styles.categories} aria-labelledby={titleId}>
      <div className={`mono ${styles.header}`}>
        <h4 id={titleId}>Award categories</h4>
        <p>{heading}</p>
      </div>
      <ol role="list" className={styles.grid}>
        {items.map((c, i) => (
          <li key={c.name} className={styles.item} data-reveal style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}>
            <div className={`${styles.tile} ${styles[c.tile]}`}>
              <img src={`${import.meta.env.BASE_URL}${c.emblem}`} alt="" width={180} height={180} className={styles.emblem} />
            </div>
            <p className={`mono ${styles.number}`}>Category {String(i + 1).padStart(2, "0")}</p>
            <h5 className={styles.name}>{c.name}</h5>
          </li>
        ))}
      </ol>
    </section>
  );
}
