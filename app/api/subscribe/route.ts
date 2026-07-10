import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

// Lead-magnet capture → Resend. On submit we add the contact to the audience
// (for nurture) and email them the checklist. No SDK — Resend's REST API over
// fetch keeps the dependency surface small.
//
// Required env (unset = safe dev no-op; in PRODUCTION unset fails closed so a
// misconfiguration can't silently black-hole every lead behind a fake success):
//   RESEND_API_KEY       server-side API key (never exposed to the client)
//   EMAIL_FROM           verified sender, e.g. "Adrian Rusan <hello@adrian-rusan.com>"
// Optional:
//   RESEND_AUDIENCE_ID   audience contacts are added to (best-effort nurture only)
//   NEXT_PUBLIC_SITE_URL used to build the checklist download link

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.adrian-rusan.com";
const CHECKLIST_URL = `${SITE_URL}/agent-pr-review-checklist.pdf`;

// Fire the prod-misconfig alert at most once per warm instance so a flood
// against this unauthenticated endpoint during a misconfig window can't burn
// Sentry quota or bury the signal. The 500 still fires on every request.
let misconfigAlerted = false;

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

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? (body as { email: unknown }).email
      : undefined;

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email.trim())) {
    return NextResponse.json(
      { ok: false, error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const sanitizedEmail = email.trim().toLowerCase();

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    if (process.env.NODE_ENV === "production") {
      // Misconfiguration in prod is a silent black-hole: the visitor sees
      // success but no contact is stored and no checklist is sent. Alert
      // loudly (once per warm instance) and fail closed rather than faking a 200.
      if (!misconfigAlerted) {
        Sentry.captureMessage(
          "[subscribe] RESEND_API_KEY/EMAIL_FROM unset in production — lead capture dropped",
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
      "[subscribe] RESEND_API_KEY/EMAIL_FROM not set. Skipping capture for:",
      sanitizedEmail,
    );
    return NextResponse.json({ ok: true });
  }

  const authHeaders = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

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
        // 409 = already a contact; anything else is worth a log, not a failure.
        console.warn("[subscribe] Resend audience add returned:", res.status);
      }
    } catch (error) {
      console.warn("[subscribe] Resend audience add failed:", error);
    }
  }

  // 2. Send the checklist (the actual thing the visitor asked for).
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({
        from,
        to: sanitizedEmail,
        subject: "The Agent PR Review Checklist",
        html: `
          <p>Here it is — the checks that catch bugs the tests pass clean:</p>
          <p><a href="${CHECKLIST_URL}">Download The Agent PR Review Checklist (PDF)</a></p>
          <p>Run passes 1&nbsp;&rarr;&nbsp;4 in order, security first. Don't merge on green — merge on a completed checklist.</p>
          <p>If you'd want your backlog shipped this way — reviewed before it reaches you — <a href="${SITE_URL}/services">book a 30-minute scoping call</a>.</p>
          <p>— Adrian</p>
        `,
      }),
    });

    if (!res.ok) {
      throw new Error(`Resend send responded with ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[subscribe] Failed to send checklist email:", error);
    // Never surface provider details to the client.
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
}
