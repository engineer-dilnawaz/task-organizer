const express = require("express");

const Task = require("../models/task");
const Category = require("../models/category");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { default: mongoose } = require("mongoose");

const taskRouter = express.Router();

taskRouter.post(
  "/tasks",
  asyncHandler(async (req, res) => {
    const { title, category } = req.body;

    if (!title) {
      throw new AppError("Title is required", 400);
    }

    if (!category) {
      throw new AppError("Category is required", 400);
    }

    // Convert category name to ObjectId if needed, or use ObjectId directly
    let categoryId = category;
    if (typeof category === "string" && !category.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's not a valid ObjectId, treat it as a category name
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        throw new AppError(
          `Category "${category}" does not exist. Please create it first.`,
          400
        );
      }
      categoryId = categoryDoc._id;
    }

    // Validation happens at model level
    const task = await Task.create({ title, category: categoryId });
    // await task.save({ validateBeforeSave: true });
    await task.populate("category");
    res.status(201).json(task);
  })
);

taskRouter.get(
  "/tasks",
  asyncHandler(async (_, res) => {
    const tasks = await Task.find().populate("category");
    res.status(200).json(tasks);
  })
);

taskRouter.patch(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, category, completed } = req.body;

    if (!id || !mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid task ID", 400);
    }

    let updateData = { title, completed };

    // Convert category name to ObjectId if needed
    if (category) {
      let categoryId = category;
      if (
        typeof category === "string" &&
        !category.match(/^[0-9a-fA-F]{24}$/)
      ) {
        // If it's not a valid ObjectId, treat it as a category name
        const categoryDoc = await Category.findOne({ name: category });
        if (!categoryDoc) {
          throw new AppError(
            `Category "${category}" does not exist. Please create it first.`,
            400
          );
        }
        categoryId = categoryDoc._id;
      }
      updateData.category = categoryId;
    }

    // Validation happens at model level
    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).populate("category");

    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(200).json(task);
  })
);

taskRouter.delete(
  "/tasks/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.isValidObjectId(id)) {
      throw new AppError("Invalid task ID", 400);
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    await task.populate("category");
    res.status(200).json({ message: "Task deleted successfully", task });
  })
);

module.exports = taskRouter;
