import { siteConfig } from "../../config/siteConfig";
import { DEV_SAMPLE_EVENT, UPCOMING_EVENTS, type CommunityEvent } from "../../data/events";
import { LUMA_UPCOMING_EVENTS } from "../../data/lumaEvents";
import { ButtonLink } from "../ui/Button";
import { JoinLink } from "../ui/JoinLink";
import { SectionHeader } from "../ui/SectionHeader";
import { EventCard } from "./EventCard";
import styles from "./UpcomingEventsSection.module.css";

/** How many upcoming events get a full card; the rest are a click away on Luma. */
const MAX_SHOWN = 3;

/** Hand-written events first, then Luma's — skipping any Luma event already listed by hand. */
function mergeEvents(manual: CommunityEvent[], fromLuma: CommunityEvent[]) {
  const listed = new Set(manual.map((e) => e.registrationUrl).filter(Boolean));
  return [...manual, ...fromLuma.filter((e) => !listed.has(e.registrationUrl))];
}

export function UpcomingEventsSection() {
  const now = Date.now();
  // An event drops off by itself once its start time has passed, even between builds.
  const allUpcoming = mergeEvents(UPCOMING_EVENTS, LUMA_UPCOMING_EVENTS)
    .filter((e) => !e.startsAt || new Date(e.startsAt).getTime() > now)
    .sort((a, b) => (a.startsAt ?? "9").localeCompare(b.startsAt ?? "9"));
  const upcoming = allUpcoming.slice(0, MAX_SHOWN);
  const more = allUpcoming.length - upcoming.length;
  const calendar = siteConfig.links.eventsCalendar;
  const lumaEmbed = siteConfig.links.lumaCalendarEmbed;

  return (
    <section id="events" className={`section ${styles.section}`} aria-labelledby="events-title">
      <div className="container">
        <SectionHeader
          id="events-title"
          index="02"
          label="Upcoming events"
          title={
            <>
              Good conversations.
              <br />
              Real-world lessons.
            </>
          }
          intro="Online sessions, workshops and community events, led by people who have shipped the thing they're talking about."
          aside={
            calendar ? (
              <ButtonLink href={calendar} variant="secondary">
                View All Events
              </ButtonLink>
            ) : (
              <ButtonLink href="#sessions" variant="secondary">
                See past sessions
              </ButtonLink>
            )
          }
        />

        {upcoming.length > 0 && (
          <ul role="list" className={styles.list}>
            {upcoming.map((event) => (
              <li key={event.id} data-reveal>
                <EventCard event={event} variant="upcoming" />
              </li>
            ))}
          </ul>
        )}
        {more > 0 && calendar && (
          <p className={styles.more}>
            <ButtonLink href={calendar} variant="ghost">
              {`${more} more upcoming on Luma`}
            </ButtonLink>
          </p>
        )}

        {/* With a Luma calendar connected, it lists what's coming up and keeps itself current. */}
        {lumaEmbed ? (
          <div className={styles.luma} data-reveal>
            <div className={styles.lumaBar}>
              <p className="mono">Live from our Luma calendar</p>
              {calendar && (
                <ButtonLink href={calendar} variant="ghost" size="sm">
                  Open in Luma
                </ButtonLink>
              )}
            </div>
            <iframe
              src={lumaEmbed}
              title="Upcoming Mobile Builders events on Luma"
              className={styles.lumaFrame}
              loading="lazy"
              allowFullScreen
            />
          </div>
        ) : (
          upcoming.length === 0 && (
            <div className={styles.stack}>
              <div className={styles.empty} data-reveal>
                <div className={styles.calendar} aria-hidden="true">
                  {Array.from({ length: 21 }, (_, i) => (
                    <span key={i} className={i === 11 ? styles.marked : undefined} />
                  ))}
                </div>
                <div className={styles.emptyText}>
                  <p className={`mono ${styles.emptyLabel}`}>Next session</p>
                  <h3 className={styles.emptyTitle}>The next session is being planned.</h3>
                  <p className={styles.emptyBody}>
                    New sessions are announced to the community first. Join to hear about the next one — or tell us what
                    you&rsquo;d like to learn, or teach.
                  </p>
                  <div className={styles.emptyCtas}>
                    <JoinLink />
                    <ButtonLink href="#collaborate" variant="ghost">
                      Propose a session
                    </ButtonLink>
                  </div>
                </div>
              </div>
              {import.meta.env.DEV && (
                <div data-reveal>
                  <EventCard event={DEV_SAMPLE_EVENT} variant="upcoming" sample />
                </div>
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
