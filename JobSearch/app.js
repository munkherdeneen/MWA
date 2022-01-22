require("dotenv").config();
const express = require("express");
const app = express();

require("./api/data/dbconnection");

const routes = require("./api/routes");

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", function(req, res, next) {
    // Accepting http://localhost:4200 access
    // You can accept with * for all request but it should not be
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // If there is 3rd party package to solve CORS error
    next();
});

app.use("/api", routes);

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_START_SERVER + server.address().port);
});