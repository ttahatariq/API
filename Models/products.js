var mongoose = require("mongoose");
const Joi = require("joi");

var productSchema = mongoose.Schema({
  name: String,
  price: Number,
  color: String,
  department: String,
  description: String,
});

var Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    price: Joi.number().min(0).required(),
    color: Joi.string().min(3).max(20).required(),
    department: Joi.string().min(3).max(20).required(),
    description: Joi.string().min(3).max(40).required(),
  });
  return schema.validate(data);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
