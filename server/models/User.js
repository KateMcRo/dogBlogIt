const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minLength: 2, maxLength: 12 },
  lastName: { type: String, required: true, minLength: 2, maxLength: 15 },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 10,
    unique: true,
    trim: true,
  },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
