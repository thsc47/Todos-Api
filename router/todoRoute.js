const { Router } = require("express");
const router = Router();

const Todo = require("../models/Todo");

router.get("/todos", async (req, res) => {
  try {
    const allTasks = await Todo.find().populate('user');
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ msg: "Error on find all Todos", error });
  }
});

router.post("/todos", async (req, res) => {
  const payload = {...req.body,user: req.user.id};
  try {
    const newTask = await Todo.create(payload);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: "Error on create a new Todo", error });
  }
});

router.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const payload = {...req.body,user: req.user.id};
  try {
    const updatedTask = await Todo.findOneAndUpdate({ _id: `${id}` }, payload, {
      new: true,
    });
    res.status(200).json({ msg: `The ${id} was updated` });
  } catch (error) {
    res.status(500).json({ msg: "Error on update the record", error });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ msg: "Error on delete a document", error });
  }
});

module.exports = router;
