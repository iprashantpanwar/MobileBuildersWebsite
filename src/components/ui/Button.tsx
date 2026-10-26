import type { ReactNode } from "react";
import { isExternal, linkProps } from "../../lib/links";
import { Arrow } from "./Arrow";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "dark" | "ghost";

type Props = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: "md" | "sm";
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", size = "md", arrow = true, className, onClick }: Props) {
  const external = isExternal(href);
  return (
    <a
      {...linkProps(href)}
      onClick={onClick}
      className={[styles.button, styles[variant], styles[size], className].filter(Boolean).join(" ")}
    >
      <span>{children}</span>
      {arrow && <Arrow direction={external ? "up-right" : "right"} className={styles.arrow} />}
      {external && <span className="visually-hidden"> (opens in a new tab)</span>}
    </a>
  );
}

/** Looks like a button but says plainly that there's nothing to click yet. */
export function PendingButton({ children, variant = "primary" }: { children: ReactNode; variant?: ButtonVariant }) {
  return <span className={[styles.button, styles[variant], styles.md, styles.pending].join(" ")}>{children}</span>;
}

export const buttonStyles = styles;
