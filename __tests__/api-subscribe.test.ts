/**
 * @jest-environment node
 */
import { POST } from "@/app/api/subscribe/route";

// Outside production the route no-ops (returns ok:true without any network
// call) when the ESP env vars are unset — so these guard tests exercise the
// input-validation path in isolation. In production that same unset-env path
// fails closed (Sentry alert + 500); covered by the separate describe below.
// Ensure no Resend config leaks in from the environment.
beforeEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_FROM;
  delete process.env.EMAIL_API_URL;
});

function post(body: string) {
  return POST(
    new Request("http://localhost/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );
}

describe("POST /api/subscribe — input guard", () => {
  it("rejects a non-JSON body with 400", async () => {
    const res = await post("not-json");
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  it("rejects a missing email with 400", async () => {
    const res = await post(JSON.stringify({ name: "x" }));
    expect(res.status).toBe(400);
  });

  it("rejects a malformed email with 400", async () => {
    for (const bad of ["nope", "a@b", "a@b.", "@b.com", "a b@c.com"]) {
      const res = await post(JSON.stringify({ email: bad }));
      expect(res.status).toBe(400);
    }
  });

  it("accepts a valid email and no-ops when no ESP is configured", async () => {
    const res = await post(JSON.stringify({ email: "Founder@Startup.io" }));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });
});

describe("POST /api/subscribe — production misconfig fails closed", () => {
  const ORIGINAL_NODE_ENV = process.env.NODE_ENV;
  // @types/node types NODE_ENV as read-only; assign through the index signature.
  const setNodeEnv = (value: string | undefined) => {
    (process.env as Record<string, string | undefined>).NODE_ENV = value;
  };

  afterEach(() => {
    setNodeEnv(ORIGINAL_NODE_ENV);
    jest.dontMock("@sentry/nextjs");
    jest.resetModules();
  });

  it("alerts Sentry once and returns 500 (never a fake ok:true) when the ESP env is unset in prod", async () => {
    const captureMessage = jest.fn();
    jest.resetModules();
    jest.doMock("@sentry/nextjs", () => ({ captureMessage }));
    setNodeEnv("production");
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;

    const { POST: ProdPOST } = await import("@/app/api/subscribe/route");
    const res = await ProdPOST(
      new Request("http://localhost/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "founder@startup.io" }),
      }),
    );

    expect(res.status).toBe(500);
    expect((await res.json()).ok).toBe(false);
    expect(captureMessage).toHaveBeenCalledTimes(1);
    expect(captureMessage).toHaveBeenCalledWith(
      expect.stringContaining("lead capture dropped"),
      "error",
    );
  });
});
