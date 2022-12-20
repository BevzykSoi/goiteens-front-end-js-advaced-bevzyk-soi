const exampleController = require("./example.controller");  
const exampleService = require("../services/example.service");  

jest.mock("../services/example.service");

describe("Example controller", () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn((message) => message)
        };
    });

    test("should return hello", () => {
        const response = exampleController.sayHello(req, res);
        expect(response).toBe("Hello, World!");
        expect(res.status).toBeCalledTimes(1);
        expect(res.send).toBeCalledTimes(1);
        expect(res.status).toBeCalledWith(200);
        expect(exampleService.sayHello).toBeCalledTimes(1);
    });
});