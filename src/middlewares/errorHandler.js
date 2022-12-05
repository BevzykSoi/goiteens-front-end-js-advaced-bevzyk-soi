module.exports = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (process.env?.NODE_ENV !== "test") {
    console.log(error);
  }
  return res.status(statusCode).send(error);
};