const mongoose = require("mongoose");

const clothesSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  category: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  price: { type: Number, required: true },
  sizes: { type: [String], required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model("Clothes", clothesSchema);
