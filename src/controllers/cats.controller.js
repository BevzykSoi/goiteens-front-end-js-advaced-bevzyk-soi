const catsService = require("../services/cats.service");

exports.create = async (req, res, next) => {
  try {
    const newCat = await catsService.create(req.body.name, req.body.age);
    return res.status(201).json(newCat);
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const cats = await catsService.getAll();
    return res.status(200).json(cats);
  } catch (error) {
    next(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const cat = await catsService.getById(req.params.catId);
    if (!cat) {
      return res.status(404).send("Cat not found");
    }

    return res.status(200).json(cat);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const cat = await catsService.getById(req.params.catId);
    if (!cat) {
      return res.status(404).send("Cat not found");
    }

    await catsService.delete(req.params.catId);

    return res.status(200).send("Cat deleted");
  } catch (error) {
    next(error);
  }
};
