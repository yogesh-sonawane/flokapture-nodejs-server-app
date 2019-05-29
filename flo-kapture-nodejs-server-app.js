const express = require("express");
var app = express();
app.get("/status", function (req, res) {
    res.send("Ok");
});
app.listen(3000, function () {
    console.log("floKapture Server Application is up and running now...");
});