var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  department: String,
  description: String,
});

var Product = mongoose.model("Product", productSchema);

module.exports = Product;
