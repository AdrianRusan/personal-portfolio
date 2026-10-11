"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ctaPrimary } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";
type Field = "repoUrl" | "email";
type FieldErrors = Partial<Record<Field, string>>;

const fieldMessages: Record<Field, string> = {
  repoUrl: "Please provide a valid repo or PR URL.",
  email: "Please provide a valid email address.",
};

// The API's field-validation 400s are the same sentences, so map them back to
// their field; any other failure gets the generic retry line.
const fieldForApiError = (message: string): Field | undefined =>
  (Object.keys(fieldMessages) as Field[]).find(
    (key) => fieldMessages[key] === message,
  );

const TeardownForm = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [note, setNote] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") return;

    // Client-side first, every field at once; the API re-validates anyway.
    const form = event.currentTarget;
    const invalid: FieldErrors = {};
    for (const key of Object.keys(fieldMessages) as Field[]) {
      const input = form.elements.namedItem(key) as HTMLInputElement | null;
      if (input && !input.checkValidity()) invalid[key] = fieldMessages[key];
    }
    setFieldErrors(invalid);
    setErrorMessage("");
    const firstInvalid = (Object.keys(fieldMessages) as Field[]).find(
      (key) => invalid[key],
    );
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLInputElement).focus();
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/teardown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, repoUrl, note, optIn }),
      });

      if (!response.ok) {
        const data =
          response.status === 400
            ? await response.json().catch(() => null)
            : null;
        const field =
          typeof data?.error === "string"
            ? fieldForApiError(data.error)
            : undefined;
        setStatus("idle");
        if (field) {
          setFieldErrors({ [field]: fieldMessages[field] });
          (form.elements.namedItem(field) as HTMLInputElement | null)?.focus();
        } else {
          setStatus("error");
          setErrorMessage("Something went wrong. Please try again in a moment.");
        }
        return;
      }

      // Named conversion event — no PII in props.
      track("teardown_request");
      setStatus("success");
      setEmail("");
      setRepoUrl("");
      setNote("");
      setOptIn(false);
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  };

  // A message goes as soon as its field is edited, so a fixed field isn't still announced invalid.
  const clearFieldError = (key: Field) =>
    setFieldErrors((errors) => ({ ...errors, [key]: undefined }));

  // aria-invalid + aria-describedby tie each message to its own input.
  const fieldProps = (key: Field) => ({
    "aria-invalid": fieldErrors[key] ? true : undefined,
    "aria-describedby": fieldErrors[key] ? `teardown-${key}-error` : undefined,
  });
  const fieldError = (key: Field) =>
    fieldErrors[key] && (
      <p id={`teardown-${key}-error`} className="text-sm text-red-400 mt-2">
        {fieldErrors[key]}
      </p>
    );

  const inputClass =
    "w-full h-11 rounded-lg border border-white/10 bg-black-200/60 px-4 text-sm text-white placeholder:text-white-200/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:border-purple disabled:opacity-50";

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8",
        className,
      )}
    >
      {status === "success" ? (
        <div role="status" aria-live="polite">
          <h2 className="text-lg font-semibold tracking-tight text-purple">
            Got it — your teardown is on the way.
          </h2>
          <p className="text-sm text-white-200 leading-relaxed mt-2">
            Check your inbox for a confirmation. You&apos;ll have the Loom
            within 2&ndash;3 business days, no call required.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4"
          noValidate
        >
          <div>
            <label
              htmlFor="teardown-repo"
              className="block text-sm font-medium mb-2"
            >
              Repo or PR URL
            </label>
            <input
              id="teardown-repo"
              name="repoUrl"
              type="url"
              required
              inputMode="url"
              placeholder="https://github.com/you/your-repo/pull/42"
              value={repoUrl}
              onChange={(event) => {
                setRepoUrl(event.target.value);
                clearFieldError("repoUrl");
              }}
              disabled={status === "loading"}
              className={inputClass}
              {...fieldProps("repoUrl")}
            />
            {fieldError("repoUrl")}
          </div>

          <div>
            <label
              htmlFor="teardown-email"
              className="block text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              id="teardown-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                clearFieldError("email");
              }}
              disabled={status === "loading"}
              className={inputClass}
              {...fieldProps("email")}
            />
            {fieldError("email")}
          </div>

          <div>
            <label
              htmlFor="teardown-note"
              className="block text-sm font-medium mb-2"
            >
              Anything I should focus on?{" "}
              <span className="text-white-200/75 font-normal">(optional)</span>
            </label>
            <textarea
              id="teardown-note"
              name="note"
              rows={3}
              maxLength={2000}
              placeholder="e.g. this PR was mostly agent-written; I'm nervous about the auth changes."
              value={note}
              onChange={(event) => setNote(event.target.value)}
              disabled={status === "loading"}
              className="w-full rounded-lg border border-white/10 bg-black-200/60 px-4 py-3 text-sm text-white placeholder:text-white-200/75 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:border-purple disabled:opacity-50 resize-y"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-white-200 leading-relaxed cursor-pointer">
            <input
              type="checkbox"
              name="optIn"
              checked={optIn}
              onChange={(event) => setOptIn(event.target.checked)}
              disabled={status === "loading"}
              className="mt-1 h-4 w-4 shrink-0 accent-purple"
            />
            Also send me occasional notes on shipping AI-written code safely.
            Unsubscribe anytime.
          </label>

          {status === "error" && (
            <p
              id="teardown-error"
              className="text-sm text-red-400"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(ctaPrimary, "w-full sm:w-auto sm:self-start")}
          >
            {status === "loading" ? "Sending…" : "Send for a free teardown"}
          </button>

          <p className="text-xs text-white-200/75 leading-relaxed">
            Free. No call. I&apos;ll only email you about this teardown unless
            you tick the box above.{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-2 hover:text-white-200"
            >
              How I handle your data
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
};

export default TeardownForm;
