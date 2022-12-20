const catsController = require("./cats.controller");
const catsService = require("../services/cats.service");

jest.mock("../services/cats.service.js");

describe("Cats controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn((message) => message),
      json: jest.fn((data) => data),
    };

    next = jest.fn();
  });

  test("should return all cats", async () => {
    const cats = await catsController.getAll(req, res, next);
    expect(cats).toBeDefined();
    expect(cats).toBeInstanceOf(Array);
    expect(cats).toHaveLength(1);
    expect(catsService.getAll).toBeCalled();
  });

  test("should find cat by id", async () => {
    req.params.catId = "id-1";
    const cat = await catsController.findById(req, res, next);
    expect(cat).toBeDefined();
    expect(cat).toHaveProperty("_id", req.params.catId);
    expect(res.status).toBeCalled();
    expect(res.status).toBeCalledWith(200);
  });

  test("should fail searching cat by id", async () => {
    req.params.catId = "failed-id";
    const response = await catsController.findById(req, res, next);
    expect(response).toBe("Cat not found");
    expect(res.status).toBeCalled();
    expect(res.status).toBeCalledWith(404);
  });
});
