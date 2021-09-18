const { Router } = require("express");
const bcrypt = require("bcryptjs");
const router = Router();

const User = require("../models/User");

router.get("/", async (req, res) => {
  res.send({ msg: "funfa" });
});

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("username already exists!");
    }
    const salt = bcrypt.genSaltSync(14);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      email,
      passwordHash,
    });
    res.send(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error While Create user", error: error.message });
  }
});

module.exports = router;
