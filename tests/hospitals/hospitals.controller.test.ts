import Fastify from "fastify";
import { hospitalsRoutes } from "../../src/hospitals";

describe("Hospitals API", () => {
  const build = () => {
    const app = Fastify();
    app.register(hospitalsRoutes, { prefix: "/api/hospitals" });
    return app;
  };

  it("GET /api/hospitals returns hospitals list", async () => {
    const app = build();
    const res = await app.inject({ method: "GET", url: "/api/hospitals" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(Array.isArray(body.hospitals)).toBe(true);
    expect(typeof body.page).toBe("number");
    expect(typeof body.limit).toBe("number");
    expect(typeof body.total).toBe("number");
  });

  it("GET /api/hospitals/cardiology filters by emergency", async () => {
    const app = build();
    const res = await app.inject({ method: "GET", url: "/api/hospitals/cardiology" });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(Array.isArray(body.hospitals)).toBe(true);
    body.hospitals.forEach((h: any) =>
      expect(h.specialties.map((s: string) => s.toLowerCase())).toContain("cardiology")
    );
  });

  it("POST /api/hospitals/search returns filtered hospitals", async () => {
    const app = build();
    const res = await app.inject({
      method: "POST",
      url: "/api/hospitals/search",
      payload: { query: "Hospital A" }
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(Array.isArray(body)).toBe(true);
    expect(body[0].name).toMatch(/Hospital A/);
  });
});
