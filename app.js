const express = require("express");
const dbConnect = require("./config/db.config");
const Todo = require("./models/Todo");

dbConnect();

const app = express();

app.use(express.json());

app.get("/todos", async (req, res) => {
  try {
    const allTasks = await Todo.find();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ msg: "Error on find all Todos", error });
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTask = await Todo.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: "Error on create a new Todo", error });
  }
});

app.put("/todos/:id", async (req, res) => {
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

app.delete("/todos/:id", async (req, res) => {
    const {id} = req.params;
    const deletedTodo = await Todo.findOneAndDelete(id);
    res.status(204).json()
});

app.listen(5000, () => {
  console.log("Server Running at port 5000");
});
