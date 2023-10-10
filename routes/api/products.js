var express = require("express");
var router = express.Router();
var product = require("../../Models/products");

/* GET home page. */
router.get("/", async function (req, res) {
  let products = await product.find();
  return res.send(products);
});

/* GET Single home page. */
router.get("/:id ", async function (req, res) {
  let products = await product.findById(req.params.id);
  return res.send(products);
});

module.exports = router;
