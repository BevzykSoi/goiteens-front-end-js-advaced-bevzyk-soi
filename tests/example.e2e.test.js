const request = require("supertest");

const app = require("../src/app");

describe("Example router", () => {
  test("GET /example/hello should return hello", async () => {
    const response = await request(app).get("/api/v1/example/hello");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/text\/html/);
    expect(response.text).toBe("Hello, World!"); 
  });
});