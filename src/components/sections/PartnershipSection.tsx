import { siteConfig } from "../../config/siteConfig";
import { ButtonLink } from "../ui/Button";
import { JoinLink } from "../ui/JoinLink";
import { SectionHeader } from "../ui/SectionHeader";
import { COLLABORATION_TYPES, PartnershipForm } from "./PartnershipForm";
import styles from "./PartnershipSection.module.css";

const WAYS = [
  { title: "Speakers & educators", body: "Share a hard-won lesson, run a workshop, or teach something you know well." },
  { title: "Open-source maintainers", body: "Bring your project to people who'll use it, question it and contribute to it." },
  { title: "Developer tools & companies", body: "Support sessions and initiatives that are genuinely useful to mobile developers." },
];

export function PartnershipSection() {
  const hostedForm = siteConfig.collaborationFormUrl;
  // With a hosted form, "Get in touch" opens it. Otherwise the built-in form shows once it can
  // actually deliver a message (or in dev, to design against).
  const formReady =
    !hostedForm && Boolean(siteConfig.partnershipFormEndpoint || siteConfig.contactEmail || import.meta.env.DEV);

  return (
    <section id="collaborate" className={`section ${styles.section}`} aria-labelledby="collaborate-title">
      <div className={`container ${styles.layout}`}>
        <div>
          <SectionHeader
            id="collaborate-title"
            index="08"
            label="Collaborate"
            title="Good things happen when builders collaborate."
            intro="Mobile Builders welcomes partnerships, educational initiatives and ideas that make life better for mobile developers. If that's you, let's talk."
          />
          <ul role="list" className={styles.ways}>
            {WAYS.map((w) => (
              <li key={w.title} data-reveal>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.panel} data-reveal>
          <p className={`mono ${styles.panelLabel}`}>Collaborate with Mobile Builders</p>
          {formReady ? (
            <PartnershipForm />
          ) : (
            <div className={styles.fallback}>
              <p>
                {hostedForm
                  ? "Tell us what you have in mind. The form only takes a couple of minutes."
                  : "The quickest way to reach the people who run Mobile Builders is inside the community itself."}
              </p>
              <ul role="list" className={styles.typeList}>
                {COLLABORATION_TYPES.slice(0, -1).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {hostedForm ? (
                <ButtonLink href={hostedForm} variant="dark">
                  Get in touch
                </ButtonLink>
              ) : (
                <JoinLink variant="dark">Get in touch</JoinLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
