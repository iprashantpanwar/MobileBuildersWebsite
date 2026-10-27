import { useEffect, useState } from "react";
import { NAV_LINKS } from "../../data/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { JoinLink } from "../ui/JoinLink";
import { Logo } from "../ui/Logo";
import styles from "./Navbar.module.css";

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape, and if the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 1200px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={[styles.header, scrolled && styles.scrolled, open && styles.open].filter(Boolean).join(" ")}>
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.home} aria-label="Mobile Builders — back to top" onClick={close}>
          <Logo />
        </a>

        <nav aria-label="Primary" className={styles.desktopNav}>
          <ul role="list" className={styles.links}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  aria-current={active === link.href.slice(1) ? "location" : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <span className={styles.cta}>
            <JoinLink size="sm" />
          </span>
          <button
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span className={styles.burger} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.panel} hidden={!open}>
        <nav aria-label="Mobile" className="container">
          <ul role="list" className={styles.panelLinks}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <a href={link.href} onClick={close} className={styles.panelLink}>
                  <span className="mono">0{i + 1}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.panelCta}>
            <JoinLink onClick={close} />
          </div>
        </nav>
      </div>
    </header>
  );
}
