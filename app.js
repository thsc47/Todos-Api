const express = require("express");
const dbConnect = require("./config/db.config");
const Todo = require("./models/Todo");

dbConnect();

const app = express();

app.use(express.json());

app.post("/new-task", async (req, res) => {
  try {
    const newTask = await Todo.create(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ msg: 'Error on create a new Todo', error });
  }
});
app.listen(5000, () => {
  console.log("Server Running at port 5000");
});
