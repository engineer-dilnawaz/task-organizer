const mongoose = require("mongoose");
const { CONNECTION_STRING } = require("../utils/dbConfig");
const Category = require("../models/category");

const dbConnect = async () => {
  await mongoose.connect(CONNECTION_STRING);

  // Initialize default category if it doesn't exist
  const defaultCategoryName = "Uncategorised";
  const defaultCategory = await Category.findOne({ name: defaultCategoryName });

  if (!defaultCategory) {
    await Category.create({
      name: defaultCategoryName,
      isSystem: true,
    });
    console.log(`Default category "${defaultCategoryName}" created`);
  }
};

module.exports = dbConnect;
