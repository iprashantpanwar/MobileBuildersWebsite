import { OPPORTUNITIES, type Opportunity } from "../../data/opportunities";
import { ButtonLink } from "../ui/Button";
import { JoinLink } from "../ui/JoinLink";
import { SectionHeader } from "../ui/SectionHeader";
import styles from "./OpportunitiesSection.module.css";

const DAY = 24 * 60 * 60 * 1000;

function status(o: Opportunity, now: number) {
  if (!o.deadline) return { label: "Open", soon: false };
  const end = Date.parse(o.deadline);
  const date = new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" }).format(end);
  return end - now < 7 * DAY ? { label: `Closing soon · ${date}`, soon: true } : { label: `Open · closes ${date}`, soon: false };
}

export function OpportunitiesSection() {
  const now = Date.now();
  // An opportunity drops off by itself once its deadline has passed.
  const open = OPPORTUNITIES.filter((o) => !o.deadline || Date.parse(o.deadline) > now);

  return (
    <section id="opportunities" className={`section ${styles.section}`} aria-labelledby="opportunities-title">
      <div className="container">
        <SectionHeader
          id="opportunities-title"
          index="04"
          label="Opportunities"
          title="Find your next thing to build."
          intro="Hackathons, awards and open calls we think mobile builders should know about."
        />

        {open.length > 0 ? (
          <ul role="list" className={styles.list}>
            {open.map((o) => (
              <li key={o.id} data-reveal>
                <OpportunityCard opportunity={o} status={status(o, now)} />
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty} data-reveal>
            <p>
              Nothing open right now. New hackathons, awards and calls are announced in the community first.
            </p>
            <JoinLink variant="ghost" />
          </div>
        )}
      </div>
    </section>
  );
}

function OpportunityCard({ opportunity: o, status }: { opportunity: Opportunity; status: { label: string; soon: boolean } }) {
  const titleId = `opportunity-${o.id}`;
  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <div className={styles.content}>
        <p className={styles.tags}>
          <span className={`mono ${styles.kind}`}>{o.kind}</span>
          <span className={`mono ${styles.status} ${status.soon ? styles.soon : ""}`}>
            <span className={styles.dot} aria-hidden="true" />
            {status.label}
          </span>
        </p>
        <h3 id={titleId} className={styles.title}>
          {o.title}
        </h3>
        <p className={styles.organizer}>Powered by {o.organizer}</p>
        <p className={styles.summary}>{o.summary}</p>

        {o.eligibility && (
          <div className={styles.eligibility}>
            <p className={`mono ${styles.eligibilityLabel}`}>Eligibility</p>
            <p>{o.eligibility}</p>
          </div>
        )}

        <div className={styles.ctas}>
          <ButtonLink href={o.cta.url} variant="dark">
            {o.cta.label}
          </ButtonLink>
          {o.eligibility && <JoinLink variant="ghost">Not a member yet? Join the community</JoinLink>}
        </div>
      </div>

      <div className={styles.art} aria-hidden="true">
        <Emblem ring={o.emblem?.ring ?? `${o.kind} · ${o.organizer} · `} center={o.emblem?.center ?? o.kind[0]} />
      </div>
    </article>
  );
}

/** A round badge: words running around a ring, with a short mark in the middle. */
function Emblem({ ring, center }: { ring: string; center: string }) {
  const id = `ring-${ring.replace(/[^a-z0-9]/gi, "").slice(0, 16)}`;
  return (
    <svg viewBox="0 0 200 200" className={styles.emblem}>
      <defs>
        <path id={id} d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" className={styles.emblemOuter} />
      <circle cx="100" cy="100" r="58" className={styles.emblemInner} />
      <g className={styles.emblemRing}>
        <text className={styles.emblemText}>
          <textPath href={`#${id}`} textLength={2 * Math.PI * 74 - 4} lengthAdjust="spacing">
            {ring.toUpperCase()}
          </textPath>
        </text>
      </g>
      <text x="100" y="100" className={styles.emblemCenter} dominantBaseline="central" textAnchor="middle">
        {center}
      </text>
    </svg>
  );
}
