const { Schema, model } = require("mongoose");

const TodoSchame = new Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Todo', TodoSchame);
