import { ButtonLink } from "../ui/Button";
import { JoinLink } from "../ui/JoinLink";
import { HeroVisual } from "./HeroVisual";
import styles from "./HeroSection.module.css";

const STACKS = ["Android", "iOS", "Kotlin Multiplatform", "Flutter", "React Native", "AI"];

export function HeroSection() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className={`mono ${styles.kicker}`}>
            <span className={styles.pulse} aria-hidden="true" />
            An online community for mobile builders
          </p>
          <h1 id="hero-title" className={styles.title}>
            Better mobile.
            <br />
            <span className={styles.highlight}>Built together.</span>
          </h1>
          <p className={styles.lede}>
            An online community for the people shaping what&rsquo;s next in mobile. Learn from experienced builders,
            explore new technologies, and make better apps together.
          </p>
          <div className={styles.ctas}>
            <JoinLink />
            <ButtonLink href="#events" variant="secondary">
              Explore Events
            </ButtonLink>
          </div>
          <p className={styles.stacks}>
            <span className="mono">Every stack welcome</span>
            <span className={styles.stackList}>{STACKS.join(" · ")}</span>
          </p>
        </div>

        <div className={styles.visual}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
