const exampleService = require("../services/example.service");

exports.sayHello = (req, res) => {
  const message = exampleService.sayHello();
  return res.status(200).send(message);
};