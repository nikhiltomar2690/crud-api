const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();

// we can use the concept of controllers and routes to do the same task
const { getProducts } = require("../controllers/product.controller.js");
router.get('/', getProducts);

module.exports = router;
