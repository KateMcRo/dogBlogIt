const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  date: { type: Date, default: Date.now },
  title: { type: String, required: true, minLength: 3, maxLength: 20 },
  content: { type: String, required: true, maxLength: 1200 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
