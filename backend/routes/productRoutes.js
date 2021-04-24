const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  editProduct,
} = require("../controller/productControllers");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.post("/update/:id", editProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
