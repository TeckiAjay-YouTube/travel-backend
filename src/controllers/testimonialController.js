import Testimonial from "../models/Testimonial.js";

export const createTestimonial = async (req, res) => {
  try {
    const { description, rating, profileImage, name, designation } = req.body;

    if (!description || !rating || !name || !designation) {
      return res.status(500).json({ message: "All fields are required." });
    }

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/testimonial/${req.file.filename}`;
    } else {
      imagePath = profileImage;
    }

    const testimonial = await Testimonial.create({
      description,
      rating,
      profileImage: imagePath,
      name,
      designation,
    });

    res
      .status(200)
      .json({ message: "Testimonial Created", Testimonial: testimonial });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Error in creating testimonial.", error: err.message });
  }
};

export const getTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.find();
    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch", error: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Testimonial Deleted", deletedDoc: deletedTestimonial });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete", error: err.message });
  }
};
