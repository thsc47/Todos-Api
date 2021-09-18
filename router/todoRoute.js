const { Router } = require("express");
const router = Router();

const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
  try {
    const allTasks = await Todo.find();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ msg: "Error on find all Todos", error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newTask = await Todo.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: "Error on create a new Todo", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedTask = await Todo.findOneAndUpdate({ _id: `${id}` }, body, {
      new: true,
    });
    res.status(200).json({ msg: `The ${id} was updated` });
  } catch (error) {
    res.status(500).json({ msg: "Error on update the record", error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete(id);
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ msg: "Error on delete a document", error });
  }
});

module.exports = router;
