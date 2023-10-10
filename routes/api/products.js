var express = require("express");
var router = express.Router();
var { Product } = require("../../Models/products");
var validateProduct = require("../../middlewares/validateProduct");

//get products
router.get("/", async (req, res) => {
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});

/* GET Single home page. */
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});

//update product
router.put("/:id", validateProduct, async function (req, res) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.color = req.body.color;
  product.department = req.body.department;
  product.description = req.body.description;
  await product.save();
  return res.send(product);
});

//delete product
router.delete("/:id", async function (req, res) {
  let product = await Product.findByIdAndDelete(req.params.id);

  return res.send(product);
});

//Post product
router.post("/", validateProduct, async function (req, res) {
  let product = new Product();
  product.name = req.body.name;
  product.price = req.body.price;
  product.color = req.body.color;
  product.department = req.body.department;
  product.description = req.body.description;
  await product.save();
  return res.send(product);
});

module.exports = router;
