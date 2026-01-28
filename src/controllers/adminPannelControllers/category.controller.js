import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName, icon } = req.body;

    let subcategories = [];

    if (req.body.name && req.body.description) {
      const imagePath = req.file
        ? `/uploads/${req.file.filename}`
        : req.body.image;
      subcategories.push({
        name: req.body.name,
        description: req.body.description,
        image: imagePath,
      });
    }

    if (req.body.subcategories) {
      let parsed =
        typeof req.body.subcategories === "string"
          ? JSON.parse(req.body.subcategories)
          : req.body.subcategories;

      subcategories = parsed;
    }

    const existingCategory = await Category.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json(new ApiError(400, "Category with this name already exists !"));
    }

    const category = new Category({
      categoryName,
      icon,
      subcategories,
    });

    await category.save();
    console.log("success");

    res.status(200).json(new ApiResponse(201, "category created successfully !"));
  } catch (err) {
    res.status(500).json(new ApiError(500, "Internel server Error !"));
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(new ApiResponse(200, categories, categories?.length));
  } catch (err) {
    res.status(500).json(new ApiError(500,"Internel server Error !"));
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json(new ApiError(404,"Category not found"));
    }

    res.status(200).json(new ApiResponse(200,category));
  } catch (error) {
    res.status(500).json(new ApiError(500,"Internel server error !"));
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(id, req.body);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(new ApiResponse(200, "Category updated successfully"));
  } catch (err) {
    res.status(500).json(new ApiError(500, "Internel server error !"));
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json(new ApiResponse(200, "Category deleted successfully"));
  } catch (err) {
    res.status(500).json(new ApiError(500, "Internel server error !"));
  }
};
