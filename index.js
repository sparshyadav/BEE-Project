const express = require("express");

const app = express();

app.get("/", (req, res) => {
    return res.send("Hi, This is Home Page");
});

app.listen(7000, () => { console.log("Server Started") });