const mongoose = require("mongoose");
const category_model = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: "" },
  description: { type: String, required: true },
  taxApplicability: { type: Boolean, default: false },
  tax: { type: Number, default: null },
  taxType: { type: String, default: null },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  modelType: { type: String, default: "category" },
  baseAmount: { type: Number, default: null },
  discount: { type: Number, default: null },
  totalAmount: { type: Number, default: null },
});

module.exports = mongoose.model("Category", category_model);
