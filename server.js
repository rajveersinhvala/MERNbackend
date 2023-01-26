const express = require("express");
const mongoose = require("mongoose");
const cros = require("cors");
const Todo = require("./models/todo");

const app = express();

app.use(express.json());
app.use(cros());

mongoose.set("strictQuery", true);

mongoose
  .connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected To DB");
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

app.post("/todo/new", async (req, res) => {
  try {
    const todo = new Todo({
      text: req.body.text,
    });
    todo.save();
    res.json(todo);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

app.delete("/todo/delete/:id", async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

app.get("/todo/complete/:id", async (req, res) => {
  try {
    const result = await Todo.findById(req.params.id);
    result.complete = !result.complete;
    result.save();
    res.json(result);
  } catch (e) {
    res.send(e);
  }
});

app.listen(8000, () => {
  console.log("Server Stated");
});
