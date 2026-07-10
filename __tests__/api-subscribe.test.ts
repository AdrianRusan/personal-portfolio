/**
 * @jest-environment node
 */
import { POST } from "@/app/api/subscribe/route";

// The route no-ops (returns ok:true without any network call) when the ESP env
// vars are unset — so these tests exercise the input-validation guard in
// isolation. Ensure no Resend config leaks in from the environment.
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
