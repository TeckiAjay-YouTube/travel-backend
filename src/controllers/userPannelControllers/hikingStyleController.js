import HikingStyle from "../../models/hikingStyle.js";

export const getHikingStyle = async (req, res) => {
  try {
    const docs = await HikingStyle.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch", error: err.message });
  }
};

export const createHikingStyle = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    if (!title) {
      return res.status(500).json({ message: "Title is required." });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/hikingStyles/${req.file.filename}`;
    } else {
      imagePath = image;
    }

    const existingDoc = await HikingStyle.findOne({ title: title.trim() });

    if (existingDoc) {
      return res
        .status(500)
        .json({ message: "Hiking Style with this title is already exist" });
    }

    const hikingStyle = new HikingStyle({
      title,
      description,
      image: imagePath,
    });

    await hikingStyle.save();

    res.status(200).json({
      message: "Hiking style added successfully",
      hikingStyle: hikingStyle,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in creating hiking style", error: err.message });
  }
};

export const editHikingStyle = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const { id } = req.params;

    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/hikingStyles/${req.file.filename}`;
    } else if (image) {
      imagePath = image;
    }

    const existingDoc = await HikingStyle.findById(id)

    if(!existingDoc){
      return res.status(404).json({message: "Hiking style not found."})
    }


    const updatedDoc = await HikingStyle.findOneAndUpdate(
      { _id: id },
      { title, description, image: imagePath },
      { new: true, runValidators: true }
    );

   

    res.status(200).json({
      message: "Hiking style updated successfully",
      newDoc: updatedDoc,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in updting hiking style", error: err.message });
  }
};

export const deleteHikingStyle = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteDoc = await HikingStyle.findByIdAndDelete(id);

    res.status(200).json({
      message: "Hiking style deleted successfully",
      deletedDoc: deleteDoc,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in deleting hiking style", error: err.message });
  }
};
