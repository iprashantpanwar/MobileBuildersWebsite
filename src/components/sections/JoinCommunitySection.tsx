import { siteConfig } from "../../config/siteConfig";
import { ButtonLink, PendingButton } from "../ui/Button";
import styles from "./JoinCommunitySection.module.css";

export function JoinCommunitySection() {
  const invite = siteConfig.links.communityInvite;

  return (
    <section id="join" className={styles.section} aria-labelledby="join-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy} data-reveal>
          <p className={`mono ${styles.kicker}`}>Join Mobile Builders</p>
          <h2 id="join-title" className={styles.title}>
            Build your craft.
            <br />
            Find your people.
          </h2>
          <p className={styles.body}>
            Join a community of mobile builders sharing knowledge, exploring what&rsquo;s next, and helping each other
            build better products.
          </p>
          <div className={styles.ctas}>
            {invite ? (
              <ButtonLink href={invite} variant="dark">
                Join Mobile Builders
              </ButtonLink>
            ) : (
              <PendingButton variant="dark">Invite link coming soon</PendingButton>
            )}
            <ButtonLink href="#events" variant="ghost">
              See what&rsquo;s on
            </ButtonLink>
          </div>
          {!invite && import.meta.env.DEV && (
            <p className={styles.devNote}>
              Dev note: set <code>links.communityInvite</code> in <code>src/config/siteConfig.ts</code> and every Join
              button on the page points there.
            </p>
          )}
        </div>

        <div className={styles.mosaic} aria-hidden="true">
          {["Android", "iOS", "KMP", "Compose", "SwiftUI", "Flutter", "RN", "AI", "OSS"].map((t, i) => (
            <span key={t} className={styles[`tile${i % 4}`]}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
