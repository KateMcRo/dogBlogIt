const User = require("../../models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

/* Route Testing */
router.get("/", (req, res) => {
  res.send(`👤`);
});

/* Create User */
router.post("/create", async (req, res) => {
  const data = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const newUser = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
  };

  const token = await jwt.sign({ newUser }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  res.json({ newUser, token });
});

/* Log User In */
try {
  router.post("/login", async (req, res) => {
    // Check for User by username
    const user = await User.findOne({ username: req.body.username });
    // Error if not found
    if (!user) {
      return res.json({ message: "You lost bro? Username not found." });
    }
    // If found (check password)
    const validPass = await bcrypt.compare(req.body.password, user.password);
    // wrong password (error)
    if (!validPass) {
      return res.json({ message: "Nice try, imposter." });
    }
    // Valid password (create user object)
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      posts: user.posts,
    };
    // Sign token, send response
    const token = jwt.sign({ userData }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ userData, token });
  });
} catch (error) {
  res.json({ error: error.message });
}

/* Check for Valid Token */
router.post("/validate", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // split to remove "Bearer"
    console.log(token);
    const isValid = await jwt.verify(token, process.env.JWT_SECRET);
    console.log(isValid);
    if (!isValid) {
      res.json({ message: `❌ Invalid Token` }).status(500);
    }
    res.json({ message: `✅ Success`, valid: true }).status(200);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});

/* Log User Out */
router.post("/logout", async (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json({ message: "You have been logged out." });
});

/* Edit User Details */

/* Delete User */
router.delete("/delete/:id", async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(`Deleted user: ${deletedUser.firstName} ${deletedUser.lastName}`);
});
try {
} catch (error) {
  res.json({ error: error.message });
}

module.exports = router;
