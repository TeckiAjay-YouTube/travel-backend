import ExploreSection from "../../models/exploreSection.js";

export const createCategory = async (req, res) => {
  try {
    const { icon, name, subcategories } = req.body;

    const category = await ExploreSection.findOne({ name: name.trim() });
    if (category) {
      return res.status(500).json({ message: "Category is already available" });
    }

    const newCategory = new ExploreSection({ icon, name, subcategories });

    await newCategory.save();

    res.status(200).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in creating category", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await ExploreSection.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await ExploreSection.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error in getting single category" });
  }
};

export const updateCategory = async (req, res) => {
  const { icon, name, subcategories } = req.body;
  const { id } = req.params;

  try {
    const category = await ExploreSection.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = name;
    category.icon = icon;
    category.subcategories = subcategories;

    await category.save();

    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in update category", error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await ExploreSection.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory: category,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in deleting category" });
  }
};
