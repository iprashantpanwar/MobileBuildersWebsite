import { useState, type FormEvent } from "react";
import { siteConfig } from "../../config/siteConfig";
import styles from "./PartnershipSection.module.css";

export const COLLABORATION_TYPES = [
  "Speak at a session",
  "Run a workshop",
  "Open-source collaboration",
  "Educational initiative",
  "Developer tool or company partnership",
  "Something else",
] as const;

type Status = { kind: "idle" | "sending" | "sent" | "error" | "unconnected"; message?: string };

export function PartnershipForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const endpoint = siteConfig.partnershipFormEndpoint;
  const email = siteConfig.contactEmail;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (endpoint) {
      setStatus({ kind: "sending" });
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setStatus({ kind: "sent", message: "Thanks — your message is in. We'll get back to you." });
      } catch {
        setStatus({ kind: "error", message: "That didn't go through. Please try again in a moment." });
      }
      return;
    }

    if (email) {
      const subject = `Collaboration: ${data.type} — ${data.organization || data.name}`;
      const body = `${data.message}\n\n— ${data.name}${data.organization ? `, ${data.organization}` : ""}\n${data.email}`;
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ kind: "sent", message: "Your email app should open with the message ready to send." });
      return;
    }

    setStatus({
      kind: "unconnected",
      message: "This form isn't connected yet, so nothing was sent. Set partnershipFormEndpoint or contactEmail in src/config/siteConfig.ts.",
    });
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <div className={styles.row2}>
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <Field label="Organization" name="organization" autoComplete="organization" optional />
      <div className={styles.field}>
        <label htmlFor="collab-type">Type of collaboration</label>
        <select id="collab-type" name="type" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {COLLABORATION_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>
      <div className={styles.field}>
        <label htmlFor="collab-message">Message</label>
        <textarea
          id="collab-message"
          name="message"
          rows={5}
          required
          placeholder="What do you have in mind, and how would it help mobile developers?"
        />
      </div>
      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className={`${styles.status} ${styles[status.kind]}`} role="status" aria-live="polite">
          {status.message}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  optional?: boolean;
};

function Field({ label, name, type = "text", autoComplete, required, optional }: FieldProps) {
  const id = `collab-${name}`;
  return (
    <div className={styles.field}>
      <label htmlFor={id}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      <input id={id} name={name} type={type} autoComplete={autoComplete} required={required} />
    </div>
  );
}
