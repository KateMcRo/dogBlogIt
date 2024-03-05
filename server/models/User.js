const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
  try {
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
  } catch (error) {
    console.error(error);
  } finally {
    next();
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
