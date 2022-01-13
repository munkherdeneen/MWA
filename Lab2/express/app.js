require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./routes");

const app = express();

//Logging every request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_START_SERVER + process.env.PORT);
});