const multer = require('multer');
const Product = require("../models/Product");
const { uploadToLocal, uploadProduct } = require("../middleware/imageMiddleware.js");

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params; 
    let product = await Product.findById(productId);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find(req.query); // Fetch products based on query parameters

    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "No products found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const addProduct = async (req, res) => {
  try {
    let cloudImgUrl;
    const upload = uploadToLocal.single('product_image');

    upload(req, res, async function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
      }

      const { brand, name, weight, price, description, ingedients, breedSize, ageGroup } = req.body;
      if (req.file) {
        cloudImgUrl = await uploadProduct(req.file, name);
      } else {
        return res.status(500).json({ message: "Error with uploading file" });
      }

      const product = await Product.create({
        brand, name, weight, price, description, ingedients, breedSize, ageGroup, imageURL: cloudImgUrl
      });

      if (product) {
        return res.status(200).json({ message: "Success" });
      }
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { getProduct, getProductById, addProduct };
