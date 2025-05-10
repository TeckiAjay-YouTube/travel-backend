import mongoose from "mongoose";

const tripPictureSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const TripPicture = mongoose.model("TripPicture", tripPictureSchema);

export default TripPicture;
