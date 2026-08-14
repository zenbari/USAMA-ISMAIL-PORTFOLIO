"use client";

import { FormEvent, useId, useState } from "react";
import { Check } from "lucide-react";
import { SITE } from "@/data/site";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClasses =
  "rounded-md border border-border bg-surface px-4 py-3 text-sm text-fg " +
  "transition-colors duration-[var(--motion-ui-hover)] " +
  "hover:border-border-strong focus-visible:border-accent";

/**
 * No backend contact-form provider is configured yet. This composes a
 * pre-filled mailto: link on submit — works with zero server setup and zero
 * secrets, and degrades gracefully since the email link above it always
 * works on its own. To wire up real submissions (e.g. Formspree, Resend),
 * see README.md "Configure the contact form".
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opened">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const nameErrorId = useId();
  const emailErrorId = useId();
  const messageErrorId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    // The form carries `noValidate` so the browser's own validation UI never
    // fires (it's inconsistent across browsers and easy to style badly) —
    // this replaces it with an honest, first-error-focused check of our
    // own, rather than silently opening a mailto: with blank fields.
    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter your email.";
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!message) nextErrors.message = "Enter a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Field names in form order, not Object.keys(nextErrors) order (an
      // object literal built with `if` statements has no guaranteed key
      // order to rely on) — and queried by `name`, not `[aria-invalid]`:
      // the DOM won't reflect the aria-invalid we just set until after this
      // handler returns and React re-renders, so reading it back here would
      // always find the *previous* render's (usually empty) state.
      const order: (keyof FieldErrors)[] = ["name", "email", "message"];
      const firstInvalidField = order.find((field) => nextErrors[field]);
      const firstInvalid = e.currentTarget.querySelector<HTMLElement>(
        `[name="${firstInvalidField}"]`
      );
      firstInvalid?.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="flex flex-col gap-2">
        <label htmlFor={nameId} className="text-sm text-fg-muted">
          Name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? nameErrorId : undefined}
          className={inputClasses}
        />
        {errors.name && (
          <p id={nameErrorId} className="text-xs text-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={emailId} className="text-sm text-fg-muted">
          Your email
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? emailErrorId : undefined}
          className={inputClasses}
        />
        {errors.email && (
          <p id={emailErrorId} className="text-xs text-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={messageId} className="text-sm text-fg-muted">
          Message
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? messageErrorId : undefined}
          className={inputClasses}
        />
        {errors.message && (
          <p id={messageErrorId} className="text-xs text-error">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "opened"}
        className="inline-flex w-fit items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg transition-[background-color,transform] duration-[var(--motion-ui-hover)] hover:bg-accent-strong active:scale-[0.97] disabled:cursor-default disabled:opacity-80 disabled:active:scale-100"
      >
        {status === "opened" && <Check size={16} aria-hidden="true" />}
        {status === "opened" ? "Email client opened" : "Send message"}
      </button>

      <p role="status" className="text-xs text-fg-subtle">
        {status === "opened"
          ? "Opening your email client with this message pre-filled — send it from there to reach me."
          : `Opens your email client, addressed to ${SITE.email}, with this message pre-filled.`}
      </p>
    </form>
  );
}
