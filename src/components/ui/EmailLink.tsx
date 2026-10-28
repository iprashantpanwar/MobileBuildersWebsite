import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./EmailLink.module.css";

type Props = { email: string; children?: ReactNode; className?: string };

/**
 * A mailto link that also copies the address. Without a default mail app (common for anyone on
 * webmail) a mailto click does nothing at all, so the click also copies the address and, when
 * the label isn't the address itself, reveals it — in case the browser won't allow the copy.
 */
export function EmailLink({ email, children = email, className }: Props) {
  const [state, setState] = useState<"idle" | "shown" | "copied">("idle");
  const timer = useRef<number>(undefined);
  const labelIsAddress = children === email;

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onClick = () => {
    if (!labelIsAddress) setState((s) => (s === "copied" ? s : "shown"));
    navigator.clipboard?.writeText(email).then(
      () => {
        setState("copied");
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setState(labelIsAddress ? "idle" : "shown"), 2500);
      },
      () => {},
    );
  };

  const message =
    state === "copied" ? (labelIsAddress ? "Copied" : `${email} · copied`) : state === "shown" ? email : "";

  return (
    <>
      <a href={`mailto:${email}`} className={className} onClick={onClick} title={email}>
        {children}
      </a>
      <span role="status" className={labelIsAddress ? styles.inline : styles.block}>
        {message}
      </span>
    </>
  );
}
