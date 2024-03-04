const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/dogBlogIt");

const database = mongoose.connection;

database.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

module.exports = database;
