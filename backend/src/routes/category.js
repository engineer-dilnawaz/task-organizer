const express = require("express");
const Category = require("../models/category");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const categoryRouter = express.Router();

categoryRouter.post(
  "/categories",
  asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
      throw new AppError("Category name is required", 400);
    }

    if (name.toLowerCase() === "uncategorised") {
      throw new AppError(
        'Category name "Uncategorised" is reserved for system use',
        400
      );
    }

    const category = await Category.create({ name });

    res.status(201).json(category);
  })
);

categoryRouter.get(
  "/categories",
  asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json(categories);
  })
);

categoryRouter.patch(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      throw new AppError("Category name is required", 400);
    }
    if (!id) {
      throw new AppError("Category ID is required", 400);
    }

    // Prevent renaming to the reserved system name
    if (name.toLowerCase() === "uncategorised") {
      throw new AppError(
        'Category name "Uncategorised" is reserved for system use',
        403
      );
    }

    // Check if category exists and is a system category
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }

    // Prevent editing system categories
    if (existingCategory.isSystem) {
      throw new AppError("System categories cannot be edited", 403);
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    res.status(200).json(category);
  })
);

categoryRouter.delete(
  "/categories/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
      throw new AppError("Category ID is required", 400);
    }
    // Check if category exists and is a system category
    const category = await Category.findById(id);
    if (!category) {
      throw new AppError("Category not found", 404);
    }

    // Prevent deletion of system categories
    if (category.isSystem) {
      throw new AppError("System categories cannot be deleted", 403);
    }

    // await Category.findByIdAndDelete(id);
    await category.deleteOne();
    res
      .status(200)
      .json({ message: "Category deleted successfully", category });
  })
);

module.exports = categoryRouter;
