import { useMemo, useState } from "react";
import { PAST_EVENTS, type TopicTag } from "../../data/events";
import { LUMA_PAST_EVENTS } from "../../data/lumaEvents";
import { SectionHeader } from "../ui/SectionHeader";
import { EventCard } from "./EventCard";
import styles from "./PastEventsSection.module.css";

const TONES = ["lavender", "sage", "peach", "lime"] as const;

// Hand-written sessions keep their place; sessions synced from Luma follow, oldest first.
const SESSIONS = [...PAST_EVENTS, ...LUMA_PAST_EVENTS];

export function PastEventsSection() {
  const topics = useMemo(() => {
    const all = new Set<TopicTag>();
    SESSIONS.forEach((e) => e.topics.forEach((t) => all.add(t)));
    return [...all];
  }, []);
  const [filter, setFilter] = useState<TopicTag | null>(null);
  const shown = filter ? SESSIONS.filter((e) => e.topics.includes(filter)) : SESSIONS;

  return (
    <section id="sessions" className={`section ${styles.section}`} aria-labelledby="sessions-title">
      <div className="container">
        <SectionHeader
          id="sessions-title"
          index="03"
          label="Past sessions"
          title="Good ideas deserve to be shared."
          intro="Watch the sessions the community has already run — a growing library of what members have learned the hard way."
        />

        {topics.length > 1 && (
          <div className={styles.filters} role="group" aria-label="Filter sessions by topic">
            <button type="button" aria-pressed={filter === null} onClick={() => setFilter(null)}>
              All <span className={styles.count}>{SESSIONS.length}</span>
            </button>
            {topics.map((t) => (
              <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)}>
                {t}
              </button>
            ))}
          </div>
        )}

        <p className="visually-hidden" aria-live="polite">
          Showing {shown.length} of {SESSIONS.length} sessions
        </p>

        <ul role="list" className={styles.grid}>
          {shown.map((event) => (
            <li key={event.id}>
              <EventCard event={event} variant="past" tone={TONES[SESSIONS.indexOf(event) % TONES.length]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
