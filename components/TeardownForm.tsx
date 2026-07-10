"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const TeardownForm = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/teardown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, repoUrl, note }),
      });

      if (!response.ok) {
        throw new Error("Teardown request failed");
      }

      // Named conversion event — no PII in props.
      track("teardown_request");
      setStatus("success");
      setEmail("");
      setRepoUrl("");
      setNote("");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again in a moment.");
    }
  };

  const inputClass =
    "w-full h-11 rounded-lg border border-white/10 bg-black-200/60 px-4 text-sm text-white placeholder:text-white-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:border-purple disabled:opacity-50";

  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-black-200/40 p-6 md:p-8",
        className,
      )}
    >
      {status === "success" ? (
        <div role="status" aria-live="polite">
          <h3 className="text-lg font-semibold tracking-tight text-purple">
            Got it — your teardown is on the way.
          </h3>
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
              onChange={(event) => setRepoUrl(event.target.value)}
              disabled={status === "loading"}
              className={inputClass}
            />
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
              onChange={(event) => setEmail(event.target.value)}
              disabled={status === "loading"}
              aria-describedby={
                status === "error" ? "teardown-error" : undefined
              }
              className={inputClass}
            />
          </div>

          <div>
            <label
              htmlFor="teardown-note"
              className="block text-sm font-medium mb-2"
            >
              Anything I should focus on?{" "}
              <span className="text-white-200/60 font-normal">(optional)</span>
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
              className="w-full rounded-lg border border-white/10 bg-black-200/60 px-4 py-3 text-sm text-white placeholder:text-white-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:border-purple disabled:opacity-50 resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="h-11 shrink-0 rounded-lg bg-purple px-5 text-sm font-medium text-black-100 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black-100 disabled:opacity-50"
          >
            {status === "loading"
              ? "Sending…"
              : "Send it — get my free teardown"}
          </button>

          <p className="text-xs text-white-200/60 leading-relaxed">
            Free. No call. I&apos;ll only email you the teardown and the
            occasional note on shipping AI-written code safely — unsubscribe
            anytime.
          </p>

          {status === "error" && (
            <p
              id="teardown-error"
              className="text-sm text-red-400"
              role="alert"
            >
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default TeardownForm;
