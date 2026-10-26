import type { ReactNode } from "react";
import styles from "./SectionHeader.module.css";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  id?: string;
  tone?: "light" | "dark";
  aside?: ReactNode;
};

/** The numbered label + headline every section opens with. */
export function SectionHeader({ index, label, title, intro, id, tone = "light", aside }: Props) {
  return (
    <header className={[styles.header, tone === "dark" && styles.dark].filter(Boolean).join(" ")} data-reveal>
      <div className={styles.main}>
        <p className={`mono ${styles.label}`}>
          <span className={styles.index}>{index}</span>
          <span className={styles.rule} aria-hidden="true" />
          {label}
        </p>
        <h2 id={id} className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </header>
  );
}
