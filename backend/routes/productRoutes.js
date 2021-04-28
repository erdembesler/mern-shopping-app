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
router.post("/add", addProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);
router.patch("/update/:id", editProduct);

module.exports = router;
