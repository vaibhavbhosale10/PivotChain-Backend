const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const productSchema = new mongoose.Schema({
  productId: Number,
  productImg: String,
  productName: { type: String, minlength: 3, maxlength: 45, required: true },
  price: { type: String, minlength: 3, maxlength: 45, required: true },
  description: { type: String, minlength: 3, maxlength: 5000, required: true },
  category: String,
  operatingSystem: {
    type: String,
  },
  processor: {
    type: String,
  },
  storage: String,
});

module.exports = mongoose.model("products", productSchema);
productSchema.plugin(autoIncrement, { inc_field: "productId" });
