const express = require("express");
const Task = require("../models/task");
const Category = require("../models/category");

const taskRouter = express.Router();

taskRouter.post("/tasks", async (req, res) => {
  const { title, category } = req.body;

  try {
    if (!title || !category) {
      throw new Error("All fields are required");
    }

    // Convert category name to ObjectId if needed, or use ObjectId directly
    let categoryId = category;
    if (typeof category === "string" && !category.match(/^[0-9a-fA-F]{24}$/)) {
      // If it's not a valid ObjectId, treat it as a category name
      const categoryDoc = await Category.findOne({ name: category });
      if (!categoryDoc) {
        throw new Error(
          `Category "${category}" does not exist. Please create it first.`
        );
      }
      categoryId = categoryDoc._id;
    }

    // Validation happens at model level
    const task = new Task({ title, category: categoryId });
    await task.save({ validateBeforeSave: true });
    await task.populate("category");
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find().populate("category");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, category, completed } = req.body;

  try {
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
          throw new Error(
            `Category "${category}" does not exist. Please create it first.`
          );
        }
        categoryId = categoryDoc._id;
      }
      updateData.category = categoryId;
    }

    // Validation happens at model level
    const task = await Task.findByIdAndUpdate(id, updateData, {
      new: true,
      validateBeforeSave: true,
      runValidators: true,
    }).populate("category");

    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new Error("Task ID is required");
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      throw new Error("Task not found");
    }
    res.status(200).json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = taskRouter;
