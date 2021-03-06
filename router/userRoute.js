const { Router } = require("express");
const User = require("../models/User");
const Todo = require("../models/Todo");
const router = Router();

router.get("/user", async (req, res) => {
  try {
    const allUser = await User.find()
    res.json(allUser);
  } catch (error) {
    res
    .status(500)
    .json({ msg: "Error While Querying All Users", error: error.message });
  }
});

router.put("/user/:todo", async (req, res) => {
  const { todo } = req.params;
  const { id } = req.user
  console.log(req.user.id)
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { todos: todo } },
      { new: true }
    );
    res.send({ updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error While Create Todos", error: error.message });
  }
});

module.exports = router;
