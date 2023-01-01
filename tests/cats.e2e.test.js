const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const app = require("../src/app");

describe("Cats router", () => {
  jest.setTimeout(30 * 1000);

  let mongod;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri);
    console.log("DB connected succesfully!");
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
  });

  test("GET /cats should return empty array", async () => {
    const response = await request(app).get("/api/v1/cats");
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(0);
  });

  test("POST /cats should create new cat", async () => {
    const data = {
      name: "John",
      age: 5,
    };
    const response = await request(app).post("/api/v1/cats").send(data);
    expect(response.statusCode).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("name", data.name);
    expect(response.body).toHaveProperty("age", data.age);
  });

  test("GET /cats/:catId should return cat by id", async () => {
    const data = {
      name: "John",
      age: 5,
    };

    const createResponse = await request(app).post("/api/v1/cats").send(data);

    const response = await request(app).get(`/api/v1/cats/${createResponse.body._id}`);

    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", createResponse.body._id);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("age");
  });

  test('DELETE /cats/:catId should delete cat by id', async () => {
    const data = {
      name: "John",
      age: 5,
    };

    const createResponse = await request(app).post("/api/v1/cats").send(data);

    const response = await request(app).delete(
      `/api/v1/cats/${createResponse.body._id}`
    );

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Cat deleted!");
  });
});
