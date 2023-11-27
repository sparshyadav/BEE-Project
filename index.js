const express = require("express");
const tasks = require("./MOCK_DATA.json");
const path = require("path");
const fs = require("fs");

const app = express();

const filePath = path.join(__dirname, "MOCK_DATA.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Hi, This is Home Page of Task Manager");
});

app.get("/tasks", (req, res) => {
  const html = `
        <ul>
            ${tasks.map((task) => `<li>${task.task}</li>`).join(`<br>`)}
        </ul>
    `;
  return res.send(html);
});

app.post("/tasks", (req, res) => {
  const newTask = { task: req.body.task };

  tasks.push({ id: tasks.length + 1, ...newTask });

  fs.writeFile(filePath, JSON.stringify(tasks), (err, data) => {
    return res.json({ status: "Pending" });
  });
});

app.patch("/task/:id", (req, res) => {
  var index = req.params.id;
  var newTask = req.body.task;

  data[index].task = newTask;

  fs.writeFile(filePath, JSON.stringify(tasks), (err, data) => {
    res.send({ sucess: true });
  });
});

app.listen(7000, () => {
  console.log("Server Started");
});
