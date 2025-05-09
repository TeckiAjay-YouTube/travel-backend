import mongoose from "mongoose";
import Homepage from "../models/homepage.js";
import path from "path";


//   try {
//     const { bannerImg, headingText, logoUrl } = req.body;
//     if (!bannerImg || !headingText || !logoUrl) {
//       return res.status(500).json({ message: "All fields are required." });
//     }

//     const homepage = new Homepage({ bannerImg, logoUrl, headingText });
//     await homepage.sava();
//     res.status(200).json({
//       message: "Successfully added home page content",
//       details: homepage,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error in creating homepage", error: err.message });
//   }
// };

export const getHomepage = async (req, res) => {
  try {
    const homepage = await Homepage.findOne();
    res.status(200).json(homepage);
  } catch (err) {
    res.status(500).json({
      message: "Error in fetching homepage details",
      error: err.message,
    });
  }
};

export const editHomepage = async (req, res) => {
  try {
    const { logoUrl, headingText, bannerImg } = req.body;

    let image = "";
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (bannerImg) {
      image = bannerImg;
    }

    const homepage = await Homepage.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId("6819f56fbc2bb942bcca2951") },
      {
        bannerImg: image,
        logoUrl,
        headingText,
      },{new: true, runValidators: true}
    );

    res.status(200).json({
      message: "successfully updated homepage details",
      details: homepage,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in updating" });
  }
};
