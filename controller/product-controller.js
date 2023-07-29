const productModel = require("../model/product-model");

const productctrl = {
  createProduct(req, res) {
    const product = req.body;
    console.log("Product Received: ", product);

    console.log("File: ", req.file);
    if (req.file) product.proof = `Received-products/${req.file.filename}`;

    new productModel(product)
      .save()
      .then((result) => {
        res.status(201).send({
          message: "product created",
          data: result,
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "Could not created the product", error: err });
      });
  }, //createProduct

  updateProduct(req, res) {
    const product = req.body;
    const { id } = req?.params;

    productModel
      .updateOne({ _id: id }, product)
      .then((updateResult) => {
        if (updateResult.n === 0) {
          throw new Error("Product is not available!");
        }
        res.status(200).send({ message: "Product Updated", data: product });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not update the product", error: err });
      });
  },
  deleteProduct(req, res) {
    const product = req.body;
    const { productName } = req?.params;

    productModel
      .deleteOne({ productName }, product)
      .then((updateResult) => {
        if (updateResult.n === 0) {
          throw new Error("Product is not available!");
        }
        res.status(200).send({ message: "Product deleted", data: product });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "Could not delete the product", error: err });
      });
  },
  fetchOneProduct(req, res) {
    const { id } = req?.params;

    productModel
      .findOne({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "product record", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "product is not available", error: err });
      });
  }, //fetchOneproduct

  fetchAllProduct(req, res) {
    productModel
      .find()
      .then((result) => {
        res.status(200).send({ message: "product List", data: result });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(404)
          .send({ message: "The products are not available", error: err });
      });
  }, //fetchAllproduct
};

module.exports = productctrl;
