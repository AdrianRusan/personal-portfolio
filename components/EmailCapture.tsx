"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ctaSecondary } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

const en = {
  heading: "The checklist I review agent PRs with",
  body: "Get the Agent PR Review Checklist: the checks that catch the bugs your tests let through. Plus an occasional email on shipping AI-written code safely. Unsubscribe anytime.",
  success: "Check your inbox.",
  label: "Email address",
  placeholder: "you@company.com",
  sending: "Sending…",
  submit: "Get the checklist",
  error: "Something went wrong. Please try again in a moment.",
  invalid: "Please provide a valid email address.",
  privacy: "How I handle your data",
};
export type EmailCaptureCopy = typeof en;

const EmailCapture = ({
  variant = "inline",
  className,
  copy = en,
}: {
  variant?: "inline" | "footer";
  className?: string;
  copy?: EmailCaptureCopy | undefined;
}) => {
  // Two captures can share a page (inline + footer), so ids must be unique.
  const inputId = useId();
  const errorId = useId();
  const headingId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") return;

    // noValidate keeps the browser bubble away; check here so a typo gets the
    // real reason, not the generic retry line.
    const input = event.currentTarget.elements.namedItem("email");
    if (input instanceof HTMLInputElement && !input.checkValidity()) {
      setStatus("error");
      setErrorMessage(copy.invalid);
      input.focus();
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        // The API's only "Please …" 400 is the email check (app/api/subscribe).
        const data =
          response.status === 400
            ? await response.json().catch(() => null)
            : null;
        setStatus("error");
        setErrorMessage(
          typeof data?.error === "string" && data.error.startsWith("Please ")
            ? copy.invalid
            : copy.error,
        );
        return;
      }

      track("email_submit", { variant });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage(copy.error);
    }
  };

  // A labelled region, so it is a landmark wherever it sits (axe "region").
  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        // #114 M: no card; the caller places it (ClosingCta draws a rule).
        variant === "footer" && "max-w-md",
        className,
      )}
    >
      <p id={headingId} className="text-lg font-semibold tracking-tight text-white">
        {copy.heading}
      </p>
      <p className="text-sm text-white-200 leading-relaxed mt-2">{copy.body}</p>

      {status === "success" ? (
        <p
          className="text-sm font-medium text-purple mt-5"
          role="status"
          aria-live="polite"
        >
          {copy.success}
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col sm:flex-row gap-3"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor={inputId} className="sr-only">
              {copy.label}
            </label>
            <input
              id={inputId}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={copy.placeholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
              aria-invalid={errorMessage === copy.invalid ? true : undefined}
              aria-describedby={
                status === "error" ? errorId : undefined
              }
              className="w-full h-11 rounded-lg border border-white/10 bg-black-200/60 px-4 text-sm text-white placeholder:text-white-200/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:border-purple disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(ctaSecondary, "min-h-11 shrink-0 px-5")}
          >
            {status === "loading" ? copy.sending : copy.submit}
          </button>
        </form>
      )}

      {status === "error" && (
        <p
          id={errorId}
          className="text-sm text-red-400 mt-3"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      <p className="text-xs text-white-200/75 mt-3">
        <Link
          href="/privacy"
          className="underline underline-offset-2 hover:text-white-200"
        >
          {copy.privacy}
        </Link>
      </p>
    </section>
  );
};

export default EmailCapture;
