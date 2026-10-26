import { siteConfig } from "../../config/siteConfig";
import styles from "./Logo.module.css";

type Props = { size?: "md" | "lg"; className?: string };

/** The MB mark exactly as supplied (transparent margin trimmed), with the name set beside it. */
export function Logo({ size = "md", className }: Props) {
  const { mark, markWidth, markHeight } = siteConfig.logo;
  return (
    <span className={[styles.logo, styles[size], className].filter(Boolean).join(" ")}>
      <img src={`${import.meta.env.BASE_URL}${mark}`} width={markWidth} height={markHeight} alt="" className={styles.mark} />
      <span className={styles.wordmark}>
        Mobile<br />Builders
      </span>
    </span>
  );
}
