import type { ReactNode } from "react";
import { siteConfig } from "../config/siteConfig";
import { PRIVACY_POLICIES as P, PRIVACY_UPDATED } from "../data/privacy";
import { Footer } from "../components/layout/Footer";
import { EmailLink } from "../components/ui/EmailLink";
import { Logo } from "../components/ui/Logo";
import { linkProps } from "../lib/links";
import styles from "./PrivacyPage.module.css";

const home = import.meta.env.BASE_URL;

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return <a {...linkProps(href)}>{children}</a>;
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.block}>
      <h2 id={`${id}-title`}>{title}</h2>
      {children}
    </section>
  );
}

export function PrivacyPage() {
  const email = siteConfig.contactEmail;
  const contact = email ? <EmailLink email={email} /> : "the organizers in the community";

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header id="top" className={styles.header}>
        <div className={`container ${styles.bar}`}>
          <a href={home} className={styles.home} aria-label="Mobile Builders — home">
            <Logo />
          </a>
          <a href={home} className={styles.back}>
            ← Back to the site
          </a>
        </div>
      </header>

      <main id="main" className={`container ${styles.main}`}>
        <p className={`mono ${styles.eyebrow}`}>Last updated {PRIVACY_UPDATED}</p>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.lede}>
          Mobile Builders is an online community for mobile developers. This page explains, in plain words, what
          information we collect, why, and what you can ask us to do with it.
        </p>

        <div className={styles.body}>
          <Section id="short" title="The short version">
            <ul>
              <li>This website uses no cookies, analytics, ads or tracking.</li>
              <li>We only collect what you choose to send us through our forms or by email.</li>
              <li>We never sell your information or use it for marketing.</li>
              <li>You can ask us to show, correct or delete what we hold about you at any time.</li>
            </ul>
          </Section>

          <Section id="who" title="Who we are">
            <p>
              Mobile Builders is run by its organizers, listed in the <a href={`${home}#team`}>Team</a> section. For
              anything about your information, contact us at {contact}.
            </p>
          </Section>

          <Section id="website" title="Visiting this website">
            <p>
              The site is a set of static pages. It sets no cookies, stores nothing in your browser and loads no
              analytics or third-party scripts. Its fonts and images are served from mobilebuilders.org itself.
            </p>
            <p>
              The site is hosted on GitHub Pages. Like any web host, GitHub receives your IP address when you load a
              page and may keep it in its logs for security and operations. See{" "}
              <Ext href={P.github}>GitHub's privacy statement</Ext>.
            </p>
          </Section>

          <Section id="forms" title="Forms">
            <p>
              Our forms are Google Forms. Answers are stored in the organizers' Google account and handled under{" "}
              <Ext href={P.google}>Google's privacy policy</Ext>.
            </p>
            <h3>Collaborate</h3>
            <p>
              The "Get in touch" form asks for your contact details and what you'd like to work on together. We use
              it only to reply to you and plan the collaboration.
            </p>
            <h3>The Builders Choice Awards '26</h3>
            <p>
              The nomination form asks for the nominee's name and public profile links (such as LinkedIn, GitHub, X
              or a portfolio), the award category, why they deserve it, a relevant project link, optional comments,
              whether it's a self-nomination, and the email the nominator uses in the community. We use these
              answers to check eligibility, choose winners and contact nominees.
            </p>
          </Section>

          <Section id="nominees" title="If you've been nominated">
            <p>
              Nominations are made by other people, so we may hold your name and public profile links without
              having heard from you. We only ask for information that is already public and professional.
            </p>
            <p>
              We may publish nominees' and winners' names, categories, public profile links and project links on
              this site and our channels. We never publish the nominator's email, their comments or whether a
              nomination was a self-nomination. If you'd rather not be listed, or want your nomination removed,
              contact us at {contact} and we'll take it down.
            </p>
          </Section>

          <Section id="email" title="Email">
            <p>
              Messages sent to {email ?? "our contact address"} are forwarded by our domain provider, Namecheap, to
              an inbox at Proton Mail (<Ext href={P.proton}>Proton's privacy policy</Ext>). We use them only to
              reply to you.
            </p>
          </Section>

          <Section id="services" title="Services we link to">
            <p>
              Joining the community or an event takes you to other services, which have their own policies once
              you're there:
            </p>
            <ul>
              <li>
                <Ext href={P.slack}>Slack</Ext> hosts the community workspace.
              </li>
              <li>
                <Ext href={P.luma}>Luma</Ext> handles event registration. When you register, Luma shares your name
                and email with us as the event host.
              </li>
              <li>YouTube, LinkedIn and Instagram host our recordings and updates.</li>
            </ul>
            <p>
              The upcoming and past events on this site are copied from our public Luma calendar. That copy contains
              event details only, never anyone's registration.
            </p>
          </Section>

          <Section id="recordings" title="Session recordings">
            <p>
              Some sessions are recorded and published on our YouTube channel. If you'd rather not appear in a
              recording, keep your camera off or let the host know, and contact us if you'd like something edited
              out of a published video.
            </p>
          </Section>

          <Section id="retention" title="How long we keep it">
            <ul>
              <li>Collaboration requests: until the conversation ends, and no longer than 12 months after.</li>
              <li>
                Award nominations: until the awards are announced, then deleted within 6 months. Published winner
                announcements stay up.
              </li>
              <li>Emails: as long as we need them to follow up.</li>
            </ul>
          </Section>

          <Section id="rights" title="Your choices">
            <p>
              You can ask us what we hold about you, ask us to correct or delete it, or object to how we use it. Email{" "}
              {contact} and we'll reply within 30 days. If you're in the EU or UK and aren't happy with our answer,
              you can complain to your local data protection authority.
            </p>
          </Section>

          <Section id="changes" title="Changes">
            <p>
              If what we collect changes, for example a new form or service, we'll update this page and the date at
              the top.
            </p>
          </Section>
        </div>
      </main>

      <Footer linkBase={home} />
    </>
  );
}
