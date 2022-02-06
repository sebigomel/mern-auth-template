const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  modelNumber: { type: String, required: true },
  description: { type: String, required: true },
  memory: { type: String, required: true },
  year: { type: String, required: true },
  brand: { type: Schema.Types.ObjectId, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
