const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
    },
    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.set("toJSON", {
  transform: function (_, ret) {
    delete ret.__v;
    return ret;
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
