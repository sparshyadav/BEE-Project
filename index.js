const express = require("express");
const tasks = require("./MOCK_DATA.json");
const path = require("path");
const fs = require("fs");

const app = express();

const filePath = path.join(__dirname, "MOCK_DATA.json");

app.get("/", (req, res) => {
    return res.send("Hi, This is Home Page of Task Manager");
});

app.get("/tasks", (req, res) => {
    const html = `
        <ul>
            ${tasks.map((task) => `<li>${task.task}</li>`).join(`<br>`)}
        </ul>
    `
    return res.send(html);
});

app.post("/tasks", (req, res) => {
    const newTask = req.body.task;

    tasks.push({ id: tasks.length + 1, task: newTask });

    fs.appendFile(filePath,)

    return res.send("Task added successfully");
});

app.listen(7000, () => { console.log("Server Started") });

