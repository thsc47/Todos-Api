const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = Router();

const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      const validation = bcrypt.compareSync(password, user.password);
      if (validation) {
        res.json(user);
      } else {
        throw new Error("User or password incorret");
      }
    } else {
      throw new Error("User not Found");
    }
    res.json(user);
  } catch (error) {
    //console.log(error)
    res.status(400).json({ msg: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("username already exists!");
    }
    const salt = bcrypt.genSaltSync(12);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: passwordHash,
    });
    res.send(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error While Create user", error: error.message });
  }
});

module.exports = router;
