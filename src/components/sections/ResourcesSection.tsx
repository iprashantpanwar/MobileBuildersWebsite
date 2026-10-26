import { PAST_EVENTS } from "../../data/events";
import { LUMA_PAST_EVENTS } from "../../data/lumaEvents";
import { RESOURCE_CATEGORIES, RESOURCES, type ResourceCategoryId } from "../../data/resources";
import { linkProps } from "../../lib/links";
import { Arrow } from "../ui/Arrow";
import { ButtonLink } from "../ui/Button";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./ResourcesSection.module.css";

function countFor(id: ResourceCategoryId) {
  const listed = RESOURCES.filter((r) => r.category === id).length;
  // Recordings also count every past session that has one published.
  return id === "recordings" ? listed + [...PAST_EVENTS, ...LUMA_PAST_EVENTS].filter((e) => e.recordingUrl).length : listed;
}

export function ResourcesSection() {
  return (
    <section id="resources" className="section" aria-labelledby="resources-title">
      <div className="container">
        <SectionHeader
          id="resources-title"
          index="05"
          label="Resources"
          title="A library built by the people who use it."
          intro="Recordings, write-ups, open-source work and tools shared by members. It grows one contribution at a time."
          aside={
            <ButtonLink href="#collaborate" variant="secondary">
              Share a resource
            </ButtonLink>
          }
        />

        <ol role="list" className={styles.index}>
          {RESOURCE_CATEGORIES.map((cat, i) => {
            const count = countFor(cat.id);
            const items = RESOURCES.filter((r) => r.category === cat.id);
            return (
              <li key={cat.id} className={styles.row} data-reveal>
                <span className={`mono ${styles.n}`}>{String(i + 1).padStart(2, "0")}</span>
                <div className={styles.main}>
                  <h3 className={styles.title}>{cat.title}</h3>
                  <p className={styles.desc}>{cat.description}</p>
                  {items.length > 0 && (
                    <ul role="list" className={styles.items}>
                      {items.map((r) => (
                        <li key={r.id}>
                          <a {...linkProps(r.url)}>
                            {r.title}
                            {r.author && <span className={styles.author}> — {r.author}</span>}
                            <Arrow direction="up-right" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className={`mono ${styles.status} ${count > 0 ? styles.live : ""}`}>
                  {count > 0 ? `${count} ${count === 1 ? "item" : "items"}` : "Being collected"}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
