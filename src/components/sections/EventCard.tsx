import type { CommunityEvent } from "../../data/events";
import { linkProps } from "../../lib/links";
import { Arrow } from "../ui/Arrow";
import { ButtonLink } from "../ui/Button";
import styles from "./EventCard.module.css";

type Tone = "lavender" | "sage" | "peach" | "lime";

type Props = {
  event: CommunityEvent;
  variant: "upcoming" | "past";
  tone?: Tone;
  /** Marks development-only sample data so it can't be mistaken for a real event. */
  sample?: boolean;
};

function formatWhen(iso: string, durationMinutes?: number) {
  const start = new Date(iso);
  const day = new Intl.DateTimeFormat(undefined, { day: "numeric" }).format(start);
  const month = new Intl.DateTimeFormat(undefined, { month: "short" }).format(start);
  const weekday = new Intl.DateTimeFormat(undefined, { weekday: "long" }).format(start);
  const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit", timeZoneName: "short" }).format(start);
  const full = new Intl.DateTimeFormat(undefined, { dateStyle: "full", timeStyle: "short" }).format(start);
  return { day, month, weekday, time, full, duration: durationMinutes ? `${durationMinutes} min` : null };
}

export function EventCard({ event, variant, tone = "sage", sample = false }: Props) {
  const titleId = `event-${event.id}`;

  if (variant === "upcoming") {
    const when = event.startsAt ? formatWhen(event.startsAt, event.durationMinutes) : null;
    return (
      <article className={`${styles.upcoming} ${sample ? styles.sample : ""}`} aria-labelledby={titleId}>
        {sample && <p className={`mono ${styles.sampleStamp}`}>Sample data · dev only</p>}
        <div className={styles.date}>
          {when ? (
            <time dateTime={event.startsAt!} title={when.full}>
              <span className={styles.day}>{when.day}</span>
              <span className={styles.month}>{when.month}</span>
              <span className={`mono ${styles.time}`}>
                {when.weekday}
                <br />
                {when.time}
              </span>
            </time>
          ) : (
            <span className={`mono ${styles.time}`}>Date to be announced</span>
          )}
        </div>
        <div className={styles.content}>
          <p className={`mono ${styles.kind}`}>
            {event.kind}
            {when?.duration && <span> · {when.duration}</span>}
          </p>
          <h3 id={titleId} className={styles.title}>
            {event.title}
          </h3>
          {event.speakers.length > 0 && <p className={styles.speakers}>with {event.speakers.join(", ")}</p>}
          {event.hostedBy && event.hostedBy.length > 0 && (
            <p className={styles.hosts}>Hosted by {joinNames(event.hostedBy)}</p>
          )}
          {event.description && <p className={styles.description}>{event.description}</p>}
          <Topics topics={event.topics} />
        </div>
        <div className={styles.action}>
          {event.registrationUrl ? (
            <ButtonLink href={event.registrationUrl} variant="dark">
              {isLuma(event.registrationUrl) ? "Register on Luma" : "Register"}
            </ButtonLink>
          ) : (
            <p className={`mono ${styles.pending}`}>Registration opens soon</p>
          )}
        </div>
      </article>
    );
  }

  const primary = event.recordingUrl;
  return (
    <article className={`${styles.past} ${styles[tone]} ${primary ? styles.clickable : ""}`} aria-labelledby={titleId}>
      <div className={styles.pastTop}>
        <p className={`mono ${styles.kind}`}>{event.kind}</p>
        {event.startsAt && (
          <time className="mono" dateTime={event.startsAt}>
            {new Intl.DateTimeFormat(undefined, { month: "short", year: "numeric" }).format(new Date(event.startsAt))}
          </time>
        )}
      </div>
      <h3 id={titleId} className={styles.pastTitle}>
        {event.title}
      </h3>
      {event.speakers.length > 0 && <p className={styles.speakers}>{event.speakers.join(", ")}</p>}
      {event.hostedBy && event.hostedBy.length > 0 && (
        <p className={styles.hosts}>Hosted by {joinNames(event.hostedBy)}</p>
      )}
      {event.description && <p className={styles.description}>{event.description}</p>}
      <Topics topics={event.topics} />
      <div className={styles.links}>
        {primary ? (
          <a {...linkProps(primary)} className={`${styles.link} ${styles.stretched}`}>
            Watch the recording <Arrow direction="up-right" className={styles.linkArrow} />
            <span className="visually-hidden"> of {event.title} (opens in a new tab)</span>
          </a>
        ) : (
          <p className={`mono ${styles.pending}`}>Recording not yet published</p>
        )}
        {event.slidesUrl && (
          <a {...linkProps(event.slidesUrl)} className={styles.link}>
            Slides <Arrow direction="up-right" className={styles.linkArrow} />
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </article>
  );
}

function isLuma(url: string) {
  return /^https?:\/\/(?:lu\.ma|luma\.com)\//.test(url);
}

/** "A", "A and B", "A, B and C". */
function joinNames(names: string[]) {
  return names.length < 2 ? names.join("") : `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

function Topics({ topics }: { topics: string[] }) {
  if (topics.length === 0) return null;
  return (
    <ul role="list" className={styles.topics} aria-label="Topics">
      {topics.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
