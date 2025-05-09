import mongoose from "mongoose";

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
});

const categorySchema = new mongoose.Schema({
  icon: { type: String },
  categoryName: { type: String, required: true, unique: true },
  subcategories: [subcategorySchema],
});

const Category = mongoose.model("Category", categorySchema);

export default Category;
