const catsService = require("./cats.service");
const Cat = require("../models/Cat");

jest.mock("../models/Cat.js");

describe("Cats service", () => {
  test("should create new cat", async () => {
    const catData = {
        name: "Pushok",
        age: 9,
    };
    const newCat = await catsService.create(catData.name, catData.age);
    expect(newCat).toBeDefined();
    expect(newCat).toHaveProperty("_id");
    expect(newCat).toMatchObject(catData);
    expect(Cat.create).toBeCalled();
    expect(Cat.create).toBeCalledWith(catData);
  });

  test('should find all cats', async () => {
    const cats = await catsService.getAll();
    expect(cats).toBeDefined();
    expect(cats).toHaveLength(1);
  });

  test('should find cat by id', async () => {
    const cat = await catsService.getById("0");
    // expect(cat).not.toBe(null);
    // expect(cat).toBeDefined();
    expect(cat).toBeTruthy();
    expect(cat._id).toBe("0");
    expect(Cat.findById).toBeCalledWith("0");
  });
});
