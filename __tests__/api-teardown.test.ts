/**
 * @jest-environment node
 */
import { POST } from "@/app/api/teardown/route";

// Outside production the route no-ops (returns ok:true without any network
// call) when the ESP env vars are unset — so these guard tests exercise the
// input-validation path in isolation. In production that same unset-env path
// fails closed (Sentry alert + 500); covered by the separate describe below.
beforeEach(() => {
  delete process.env.RESEND_API_KEY;
  delete process.env.EMAIL_FROM;
});

function post(body: string) {
  return POST(
    new Request("http://localhost/api/teardown", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }),
  );
}

const VALID_REPO = "https://github.com/you/your-repo/pull/42";

describe("POST /api/teardown — input guard", () => {
  it("rejects a non-JSON body with 400", async () => {
    const res = await post("not-json");
    expect(res.status).toBe(400);
    expect((await res.json()).ok).toBe(false);
  });

  it("rejects a malformed email with 400", async () => {
    const res = await post(
      JSON.stringify({ email: "nope", repoUrl: VALID_REPO }),
    );
    expect(res.status).toBe(400);
  });

  it("rejects a missing or non-http repo URL with 400", async () => {
    for (const bad of [
      undefined,
      "",
      "not a url",
      "ftp://x.com",
      "javascript:alert(1)",
    ]) {
      const res = await post(
        JSON.stringify({ email: "founder@startup.io", repoUrl: bad }),
      );
      expect(res.status).toBe(400);
    }
  });

  it("accepts a valid request and no-ops when no ESP is configured", async () => {
    const res = await post(
      JSON.stringify({ email: "Founder@Startup.io", repoUrl: VALID_REPO }),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });
});

describe("POST /api/teardown — production misconfig fails closed", () => {
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
    jest.doMock("@sentry/nextjs", () => ({
      captureMessage,
      captureException: jest.fn(),
    }));
    setNodeEnv("production");
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;

    const { POST: ProdPOST } = await import("@/app/api/teardown/route");
    const res = await ProdPOST(
      new Request("http://localhost/api/teardown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "founder@startup.io",
          repoUrl: VALID_REPO,
        }),
      }),
    );

    expect(res.status).toBe(500);
    expect((await res.json()).ok).toBe(false);
    expect(captureMessage).toHaveBeenCalledTimes(1);
    expect(captureMessage).toHaveBeenCalledWith(
      expect.stringContaining("teardown request dropped"),
      "error",
    );
  });
});
