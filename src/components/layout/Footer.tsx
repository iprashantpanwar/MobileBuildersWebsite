import { siteConfig } from "../../config/siteConfig";
import { NAV_LINKS } from "../../data/navigation";
import { linkProps } from "../../lib/links";
import { EmailLink } from "../ui/EmailLink";
import { Logo } from "../ui/Logo";
import styles from "./Footer.module.css";

type FooterLink = { label: string; href: string | null };

export function Footer() {
  const { links } = siteConfig;
  // Links nobody has confirmed are simply left out.
  const elsewhere = ([
    { label: "Join the community", href: links.communityInvite },
    { label: "Events calendar", href: links.eventsCalendar },
    { label: "LinkedIn", href: links.linkedin },
    { label: "YouTube", href: links.youtube },
    { label: "Instagram", href: links.instagram },
  ] as FooterLink[]).filter((l): l is { label: string; href: string } => Boolean(l.href));

  const onPage: { label: string; href: string }[] = [
    ...NAV_LINKS,
    { label: "Past sessions", href: "#sessions" },
    { label: "Collaborate", href: "#collaborate" },
  ];

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          <a href="#top" className={styles.home} aria-label="Mobile Builders — back to top">
            <Logo size="lg" />
          </a>
          <p className={styles.blurb}>
            An online community for people building the future of mobile — across Android, iOS and everything in
            between.
          </p>
        </div>

        <nav aria-label="Footer" className={styles.cols}>
          <div>
            <h2 className={`mono ${styles.colTitle}`}>On this page</h2>
            <ul role="list" className={styles.list}>
              {onPage.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          {elsewhere.length > 0 && (
            <div>
              <h2 className={`mono ${styles.colTitle}`}>Elsewhere</h2>
              <ul role="list" className={styles.list}>
                {elsewhere.map((l) => (
                  <li key={l.label}>
                    <a {...linkProps(l.href)}>{l.label}</a>
                  </li>
                ))}
                {siteConfig.contactEmail && (
                  <li>
                    <EmailLink email={siteConfig.contactEmail}>Email</EmailLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </nav>
      </div>

      <div className={`container ${styles.base}`}>
        <p>© {new Date().getFullYear()} Mobile Builders</p>
        <p className="mono">Built by builders, for builders</p>
      </div>
    </footer>
  );
}
