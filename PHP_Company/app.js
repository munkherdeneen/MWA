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

app.use("/api", routes);

// Starting server
const server = app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_START_SERVER + server.address().port);
})