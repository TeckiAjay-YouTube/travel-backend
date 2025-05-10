import TripPicture from "../models/tripPicture.js";

export const createTripPicture = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;


    const file = req.file.fieldname



    if(!name && (!file || !imageUrl)){
      return res.status(500).json({message: "name and imageUrl are required."})
    }


    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    } else {
      imagePath = req.body.imageUrl;
    }

    const tripPicture = await TripPicture.create({
      name: name,
      imageUrl: imagePath,
    });

    res
      .status(200)
      .json({ message: "Trip picture added successfully", doc: tripPicture });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in creating trip pictures", error: err.message });
  }
};

export const getTripPicture = async (req, res) => {
  try {
    const tripPicture = await TripPicture.find();
    res.status(200).json(tripPicture);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch." });
  }
};

export const deleteTripPicture = async (req, res) => {
  try {
    const { id } = req.params;

    const tripPicture = await TripPicture.findById(id);

    if (!tripPicture) {
      return res.status(404).json({ message: "Trip picture not found." });
    }

    const deletedTripPicture = await TripPicture.findByIdAndDelete(id);

    res.status(200).json({
      message: "Trip picture deleted successfully",
      deletedDoc: deletedTripPicture,
    });
  } catch (err) {
    res.status(500).json({ error: "Error in deleting trip picture." });
  }
};
