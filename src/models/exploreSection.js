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

const exploreSectionSchema = new mongoose.Schema({
  icon: { type: String },
  name: { type: String, required: true, unique: true },
  subcategories: [subcategorySchema],
});

const ExploreSection = mongoose.model("ExploreSection", exploreSectionSchema);

export default ExploreSection;
