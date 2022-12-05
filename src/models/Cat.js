const { Schema, model } = require("mongoose");

const catSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 0,
  },
});

module.exports = model("cat", catSchema);