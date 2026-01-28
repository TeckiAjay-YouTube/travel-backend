import Category from "../../models/category.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isStatus: "true" });
    res.status(200).json(new ApiResponse(200, categories, categories?.length));
  } catch (err) {
    res.status(500).json(new ApiError(500, "Internel server error !"));
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json(new ApiError(404, "Category not found !"));
    }

    res.status(200).json(new ApiResponse(200, category, category?.length));
  } catch (error) {
    res.status(500).json(new ApiError(500, "Internel server Error !"));
  }
};