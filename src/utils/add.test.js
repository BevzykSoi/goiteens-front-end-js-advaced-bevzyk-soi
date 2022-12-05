const add = require("./add");

describe("Add util", () => {
  test("should add two numbers", () => {
    const result = add(1, 1);
    expect(typeof result).toBe("number");
    expect(result).toBe(2);
  });
});