const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  content: { type: String, required: true, maxLength: 1000 },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
