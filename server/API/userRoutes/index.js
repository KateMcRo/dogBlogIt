const User = require("../../models/User");

const router = require("express").Router();

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
  res.json({ newUser });
});

module.exports = router;
