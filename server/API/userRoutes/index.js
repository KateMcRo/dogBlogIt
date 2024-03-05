const User = require("../../models/User");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

require("dotenv").config();

router.get("/", (req, res) => {
  res.send(`👤`);
});

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

  console.log({ token });

  res.json({ newUser, token });
});

module.exports = router;
