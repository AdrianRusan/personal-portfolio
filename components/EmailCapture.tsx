"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const en = {
  heading: "Not ready to book?",
  body: "Get the Agent PR Review Checklist — the checks that catch bugs the tests pass clean. Plus an occasional email on shipping AI-written code safely — unsubscribe anytime.",
  success: "Check your inbox.",
  label: "Email address",
  placeholder: "you@company.com",
  sending: "Sending…",
  submit: "Get the checklist",
  error: "Something went wrong. Please try again in a moment.",
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription request failed");
      }

      track("email_submit", { variant });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage(copy.error);
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8",
        variant === "footer" && "max-w-md",
        className,
      )}
    >
      <h3 className="text-lg font-semibold tracking-tight">
        {copy.heading}
      </h3>
      <p className="text-sm text-white-200 leading-relaxed mt-2">
        {copy.body}
      </p>

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
            <label htmlFor="email-capture-input" className="sr-only">
              {copy.label}
            </label>
            <input
              id="email-capture-input"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={copy.placeholder}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
              aria-describedby={
                status === "error" ? "email-capture-error" : undefined
              }
              className="w-full h-11 rounded-lg border border-white/10 bg-black-200/60 px-4 text-sm text-white placeholder:text-white-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:border-purple disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="h-11 shrink-0 rounded-lg bg-purple px-5 text-sm font-medium text-black-100 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100 disabled:opacity-50"
          >
            {status === "loading" ? copy.sending : copy.submit}
          </button>
        </form>
      )}

      {status === "error" && (
        <p
          id="email-capture-error"
          className="text-sm text-red-400 mt-3"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default EmailCapture;
