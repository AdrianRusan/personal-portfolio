import { NextResponse } from "next/server";

// Simple, pragmatic email check — good enough to reject garbage input without
// rejecting valid-but-unusual addresses.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const espApiKey = process.env.EMAIL_API_KEY;

  if (!espApiKey) {
    // No ESP configured yet — no-op success so the UI works in dev/staging.
    console.warn(
      "[subscribe] EMAIL_API_KEY is not set. Skipping ESP forward for:",
      sanitizedEmail,
    );
    return NextResponse.json({ ok: true });
  }

  try {
    // Forward to the configured ESP. Provider-specific request shape can be
    // filled in once a real ESP is wired — this keeps the contract stable.
    const response = await fetch(process.env.EMAIL_API_URL ?? "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${espApiKey}`,
      },
      body: JSON.stringify({ email: sanitizedEmail }),
    });

    if (!response.ok) {
      throw new Error(`ESP responded with status ${response.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[subscribe] Failed to forward subscription to ESP:", error);
    // Fail gracefully — never surface ESP/provider details to the client.
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 502 },
    );
  }
}
