import Category from "../../models/category.js";

export const createCategory = async (req, res) => {
  try {
    const { categoryName, icon, subcategories } = req.body;

    let imagePath = "";

    if (req.file) {
      imagePath = `/uploads/categories/${req.file.filename}`;
    }

    const newSubcat = subcategories.map((sub) => ({
      name: sub.name,
      image: imagePath || sub.image,
      description: sub.description,
    }));

    const existingCategory = await Category.findOne({
      categoryName: categoryName,
    });

    if (existingCategory) {
      return res
        .status(500)
        .json({ message: "Category with this name already exist" });
    }

    const category = new Category({
      categoryName,
      icon,
      subcategories: newSubcat,
    });

    await category.save();

    res
      .status(200)
      .json({ message: "category created successfully", category });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error in create category", error: err.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

export const getSingleCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);

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
    const category = await Category.findById(id);
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
    const category = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Category deleted successfully",
      deletedCategory: category,
    });
  } catch (err) {
    res.status(500).json({ message: "Error in deleting category" });
  }
};
