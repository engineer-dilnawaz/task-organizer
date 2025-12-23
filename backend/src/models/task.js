const mongoose = require("mongoose");
const Category = require("./category");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
  },
  {
    timestamps: true,
    validateBeforeSave: true,
  }
);

taskSchema.set("toJSON", {
  transform: function (_, ret) {
    delete ret.__v;
    return ret;
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
