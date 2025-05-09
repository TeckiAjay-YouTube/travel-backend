import mongoose from "mongoose";

const hikingStyleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  image: String,
});

const HikingStyle = mongoose.model("HikingStyle", hikingStyleSchema);

export default HikingStyle;
