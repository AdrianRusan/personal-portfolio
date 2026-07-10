import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

// Free-teardown intake → Resend. On submit we notify Adrian of the request,
// send the submitter a confirmation, and (best-effort) add them to the nurture
// audience. No SDK — Resend's REST API over fetch keeps the surface small.
//
// Required env (unset = safe dev no-op; in PRODUCTION unset fails closed so a
// misconfiguration can't silently drop lead requests behind a fake success):
//   RESEND_API_KEY       server-side API key (never exposed to the client)
//   EMAIL_FROM           verified sender, e.g. "Adrian Rusan <hello@adrian-rusan.com>"
// Optional:
//   TEARDOWN_NOTIFY_TO   where the request notification lands (default contact@)
//   RESEND_AUDIENCE_ID   audience the submitter is added to (best-effort nurture only)

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOTIFY_TO = process.env.TEARDOWN_NOTIFY_TO ?? "contact@adrian-rusan.com";
const MAX_NOTE = 2000;

// User-supplied values are embedded in an HTML email body — escape to prevent
// HTML/attribute injection in whatever mail client renders the notification.
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Fire the prod-misconfig alert at most once per warm instance so a flood
// against this unauthenticated endpoint during a misconfig window can't burn
// Sentry quota or bury the signal. The 500 still fires on every request.
let misconfigAlerted = false;

const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  const field = (key: string): unknown =>
    typeof body === "object" && body !== null && key in body
      ? (body as Record<string, unknown>)[key]
      : undefined;

  const email = field("email");
  const repoUrl = field("repoUrl");
  const note = field("note");

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  if (typeof repoUrl !== "string" || !isHttpUrl(repoUrl.trim())) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid repo or PR URL." },
      { status: 400 },
    );
  }

  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedRepo = repoUrl.trim();
  const sanitizedNote =
    typeof note === "string" ? note.trim().slice(0, MAX_NOTE) : "";

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      // Misconfiguration in prod is a silent black-hole: the visitor sees
      // success but no request is delivered. Alert loudly (once per warm
      // instance) and fail closed rather than faking a 200.
      if (!misconfigAlerted) {
        Sentry.captureMessage(
          "[teardown] RESEND_API_KEY/EMAIL_FROM unset in production — teardown request dropped",
          "error",
        );
        misconfigAlerted = true;
      }
      return NextResponse.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 },
      );
    }
    // Dev/staging without Resend configured — no-op success so the UI works.
    console.warn(
      "[teardown] RESEND_API_KEY/EMAIL_FROM not set. Skipping request for:",
      sanitizedEmail,
    );
    return NextResponse.json({ ok: true });
  }

  const authHeaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // 1. Add to the audience (best-effort — nurture, not the primary value).
  if (audienceId) {
    try {
      const res = await fetch(
        `https://api.resend.com/audiences/${audienceId}/contacts`,
        {
          method: "POST",
          headers: authHeaders,
          body: JSON.stringify({ email: sanitizedEmail, unsubscribed: false }),
        },
      );
      if (!res.ok && res.status !== 409) {
        console.warn("[teardown] Resend audience add returned:", res.status);
      }
    } catch (error) {
      console.warn("[teardown] Resend audience add failed:", error);
    }
  }

  // 2. Notify Adrian — this is the primary value (a lead asked for a teardown).
  //    If this send fails, fail the request so the submitter retries rather
  //    than believing a request was delivered that never arrived.
  try {
    const noteBlock = sanitizedNote
      ? `<p><strong>Note:</strong> ${escapeHtml(sanitizedNote)}</p>`
      : "";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        from,
        to: NOTIFY_TO,
        reply_to: sanitizedEmail,
        subject: "New teardown request",
        html: `
          <p>New free-teardown request:</p>
          <p><strong>From:</strong> ${escapeHtml(sanitizedEmail)}</p>
          <p><strong>Repo/PR:</strong> <a href="${escapeHtml(sanitizedRepo)}">${escapeHtml(sanitizedRepo)}</a></p>
          ${noteBlock}
        `,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend notify responded with ${res.status}`);
    }
  } catch (error) {
    console.error("[teardown] Failed to send request notification:", error);
    Sentry.captureException(error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }

  // 3. Confirm to the submitter (best-effort — the request is already logged
  //    with Adrian, so a failed confirmation shouldn't fail the whole request).
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        from,
        to: sanitizedEmail,
        subject: "Your code teardown is on the way",
        html: `
          <p>Thanks — I've got your teardown request.</p>
          <p>I'll review the repo or PR you sent and record a ~15-minute Loom of what your AI-generated code is hiding — security bugs that pass tests and merge anyway. You'll have it within 2&ndash;3 business days, no call required.</p>
          <p>If anything's unclear about the repo, I'll reply to this email.</p>
          <p>— Adrian</p>
        `,
      }),
    });
  } catch (error) {
    console.warn("[teardown] Confirmation email failed (non-fatal):", error);
  }

  return NextResponse.json({ ok: true });
}
