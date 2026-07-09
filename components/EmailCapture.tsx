"use client";

import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EmailCapture = ({
  variant = "inline",
  className,
}: {
  variant?: "inline" | "footer";
  className?: string;
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

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
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
        Not ready to book?
      </h3>
      <p className="text-sm text-white-200 leading-relaxed mt-2">
        Get the Agent PR Review Checklist — the checks that catch bugs the tests
        pass clean. No pitch.
      </p>

      {status === "success" ? (
        <p
          className="text-sm font-medium text-purple mt-5"
          role="status"
          aria-live="polite"
        >
          Check your inbox.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-5 flex flex-col sm:flex-row gap-3"
          noValidate
        >
          <div className="flex-1">
            <label htmlFor="email-capture-input" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture-input"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
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
            {status === "loading" ? "Sending…" : "Get the checklist"}
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
