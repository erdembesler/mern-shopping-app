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
    .then(() => res.status(200).json(newProduct))
    .catch((err) => res.status(400).json("Error: " + err));
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, imageUrl, description, price, countInStock } = req.body;

    const editedProduct = {
      name,
      imageUrl,
      countInStock,
      description,
      price,
      _id: id,
    };

    await Product.findByIdAndUpdate(id, editedProduct, { new: true });

    res.json(editedProduct);
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
