const express = require("express");
const Category = require("../models/category");

const categoryRouter = express.Router();

categoryRouter.post("/categories", async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      throw new Error("Category name is required");
    }

    // Prevent creating a category with the reserved system name
    if (name.toLowerCase() === "uncategorised") {
      throw new Error(
        'Category name "Uncategorised" is reserved for system use'
      );
    }

    const category = new Category({ name });
    await category.save({ validateBeforeSave: true });
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.patch("/categories/:id", async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  try {
    if (!name) {
      throw new Error("Category name is required");
    }
    if (!id) {
      throw new Error("Category ID is required");
    }

    // Prevent renaming to the reserved system name
    if (name.toLowerCase() === "uncategorised") {
      throw new Error(
        'Category name "Uncategorised" is reserved for system use'
      );
    }

    // Check if category exists and is a system category
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Prevent editing system categories
    if (existingCategory.isSystem) {
      throw new Error("System categories cannot be edited");
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Check if category exists and is a system category
    const category = await Category.findById(id);
    if (!category) {
      throw new Error("Category not found");
    }

    // Prevent deletion of system categories
    if (category.isSystem) {
      throw new Error("System categories cannot be deleted");
    }

    await Category.findByIdAndDelete(id);
    res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = categoryRouter;
