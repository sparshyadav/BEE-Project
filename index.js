const express = require("express");
const tasks = require("./MOCK_DATA.json");
const path = require("path");
const fs = require("fs");

const app = express();

const filePath = path.join(__dirname, "MOCK_DATA.json");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// GET Request - Home Page
app.get("/", (req, res) => {
    return res.send("Hi, This is Home Page of Task Manager");
});

// GET Request - READ
app.get("/tasks", (req, res) => {
    const html = `
        <ul>
            ${tasks.map((task) => `<li>${task.task}</li>`).join(`<br>`)}
        </ul>
    `;
    return res.send(html);
});

// POST Request - CREATE
app.post("/tasks", (req, res) => {
    const newTask = { task: req.body.task };

    tasks.push({ id: tasks.length + 1, ...newTask });

    fs.writeFile(filePath, JSON.stringify(tasks), (err, data) => {
        if(err){
            return res.send("An Error Occured: ", err);
        }
        else{
            return res.send("New Task Added");
        }
    });
});

// PATCH Request - EDIT
app.patch("/tasks/:id", (req, res) => {
    var index = req.params.id - 1;
    var newTask = req.body.task;

    tasks[index].task = newTask;

    fs.writeFile(filePath, JSON.stringify(tasks), (err, data) => {
        if(err){
            return res.send("An Error Occured: ", err);
        }
        else{
            return res.send("Task Updated");
        }
    });
});

// DELETE Request - DELETE
app.delete("/tasks/:id", (req, res) => {
    var index = req.params.id;

    const newTasks = tasks.filter((task) => task.id !== parseInt(index));

    fs.writeFile(filePath, JSON.stringify(newTasks), (err, data) => {
        if(err){
            return res.send("An Error Occured: ", err);
        }
        else{
            return res.send("Task Deleted");
        }
    });
});

app.listen(7000, () => {
    console.log("Server Started");
});
