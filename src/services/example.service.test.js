const exampleService = require("./example.service");

describe("Example service", () => {
    test("should return Hello, World!", () => {
        const result = exampleService.sayHello();
        expect(result).toBe("Hello, World!");
        expect(typeof result).toBe("string");
    });
})