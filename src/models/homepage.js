import mongoose from "mongoose";

const homepageSchema = new mongoose.Schema({
  bannerImg: {
    type: String,
  },
  logoUrl: {
    type: String,
  },
  headingText: {
    type: String,
  },
});

const Homepage = mongoose.model("Homepage", homepageSchema, "homepage");

export default Homepage;
