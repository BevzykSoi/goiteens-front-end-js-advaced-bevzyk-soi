const Cat = require("../models/Cat");

exports.create = async (name, age) => 
  await Cat.create({
    name,
    age,
  });

exports.getAll = async () => await Cat.find();

exports.getById = async (id) => await Cat.findById(id);

exports.delete = async (id) => await Cat.findByIdAndDelete(id);