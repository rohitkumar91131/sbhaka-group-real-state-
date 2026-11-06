"use client";

import { FormEvent, useState } from "react";

type ContactCopy = typeof import("../lib.json").default.contact;

export function ContactForm({ contact, divisions }: { contact: ContactCopy; divisions: string[] }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; message: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Contact submission failed");

      form.reset();
      setStatus({ kind: "success", message: contact.successMessage });
    } catch {
      setStatus({ kind: "error", message: contact.errorMessage });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-fields">
        <label className="contact-field">
          <span>{contact.fields.name.label}</span>
          <input name="name" autoComplete="name" placeholder={contact.fields.name.placeholder} required maxLength={100} />
        </label>
        <label className="contact-field">
          <span>{contact.fields.email.label}</span>
          <input name="email" type="email" autoComplete="email" placeholder={contact.fields.email.placeholder} required maxLength={254} />
        </label>
        <label className="contact-field">
          <span>{contact.fields.phone.label}</span>
          <input name="phone" type="tel" autoComplete="tel" placeholder={contact.fields.phone.placeholder} maxLength={30} />
        </label>
        <label className="contact-field">
          <span>{contact.fields.division.label}</span>
          <select name="division" defaultValue="" required>
            <option value="" disabled>{contact.fields.division.placeholder}</option>
            {divisions.map((division) => <option key={division} value={division}>{division}</option>)}
            <option value={contact.generalOption}>{contact.generalOption}</option>
          </select>
        </label>
        <label className="contact-field contact-field-wide">
          <span>{contact.fields.message.label}</span>
          <textarea name="message" placeholder={contact.fields.message.placeholder} required minLength={10} maxLength={5000} rows={5} />
        </label>
      </div>
      <div className="contact-form-bottom">
        <p>{contact.privacyNote}</p>
        <button className="btn-primary" type="submit" disabled={sending}>
          {sending ? contact.submittingLabel : contact.submitLabel}
        </button>
      </div>
      <label className="contact-honeypot" aria-hidden="true" tabIndex={-1}>
        Leave this field empty
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className={`contact-status${status ? ` ${status.kind}` : ""}`} role="status" aria-live="polite">
        {status?.message ?? ""}
      </p>
    </form>
  );
}
