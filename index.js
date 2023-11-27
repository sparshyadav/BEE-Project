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

app.patch("/tasks/:id", (req, res) => {
    var index = req.params.id - 1;
    var newTask = req.body.task;

    tasks[index].task = newTask;

    fs.writeFile(filePath, JSON.stringify(tasks), (err, data) => {
        res.send({ sucess: "Content Changed" });
    });
});

app.delete("/tasks/:id", (req, res)=>{
    var index=req.params.id-1;
    
    const newTasks=tasks.splice(index, 1);

    fs.writeFile(filePath, JSON.stringify(newTasks), (err, data)=>{
        res.send({sucess: "Content Deleted"});
    });
});

app.listen(7000, () => {
    console.log("Server Started");
});
