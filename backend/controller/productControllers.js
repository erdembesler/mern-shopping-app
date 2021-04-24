const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const addProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  newProduct
    .save()
    .then(() => res.json(newProduct))
    .catch((err) => res.status(400).json("Error: " + err));
};

const editProduct = async (req, res) => {
  try {
    Product.findById(req.params.id).then((product) => {
      product.name = req.body.name;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      product.price = req.body.price;
      product.countInStock = req.body.countInStock;

      product
        .save()
        .then(() => res.json(product))
        .catch((err) => res.json("Error: " + err));
    });

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const deleteProduct = async (req, res) => {
  try {
    Product.findByIdAndDelete(req.params.id)
      .then(() => res.json("Product deleted"))
      .catch((err) => res.status(400).json("Error: " + err));

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  deleteProduct,
  editProduct,
};
