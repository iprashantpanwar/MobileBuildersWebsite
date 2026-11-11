import { PARTNERS } from "../../data/partners";
import { linkProps } from "../../lib/links";
import { Arrow } from "../ui/Arrow";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./PartnersSection.module.css";

const domain = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export function PartnersSection() {
  if (PARTNERS.length === 0) return null;

  return (
    <section id="partners" className="section" aria-labelledby="partners-title">
      <div className="container">
        <SectionHeader
          id="partners-title"
          index="08"
          label="Community partners"
          title="Built with good company."
          intro="The organisations that partner with Mobile Builders to bring more to the community."
        />

        <ul role="list" className={styles.grid}>
          {PARTNERS.map((partner, i) => (
            <li
              key={partner.name}
              className={styles.card}
              data-reveal
              style={
                {
                  "--reveal-delay": `${i * 90}ms`,
                  "--partner-bg": partner.color,
                  "--partner-fg": partner.onColor,
                } as React.CSSProperties
              }
            >
              <div className={styles.top}>
                <span className={`${styles.icon} ${styles[partner.icon.kind]}`}>
                  <img
                    src={`${import.meta.env.BASE_URL}${partner.icon.src}`}
                    alt=""
                    width={partner.icon.width}
                    height={partner.icon.height}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <p className={`mono ${styles.kicker}`}>Partner {String(i + 1).padStart(2, "0")}</p>
              </div>
              <h3 className={styles.name}>{partner.name}</h3>
              {partner.url && (
                <a {...linkProps(partner.url)} className={`mono ${styles.link}`}>
                  {domain(partner.url)} <Arrow direction="up-right" className={styles.arrow} />
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
