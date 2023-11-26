const express = require("express");
const tasks = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

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
})

app.listen(7000, () => { console.log("Server Started") });

