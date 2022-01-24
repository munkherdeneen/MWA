require("dotenv").config();
const express = require("express");
const app = express();

// Making DB connection using Mongoose
require("./api/data/dbconnection");

const routes = require("./api/routes")

// Logging
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Set json format to express
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, DELETE");
    next();
});

app.use("/api", routes);

// Starting server
const server = app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_START_SERVER + server.address().port);
})