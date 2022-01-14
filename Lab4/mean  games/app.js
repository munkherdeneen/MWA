require("dotenv").config();
const express = require("express");
const path = require("path");
const routes = require("./api/routes");

require("./api/data/dbconnection").open();

const app = express();

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(express.static(path.join(__dirname, "public")));

//to enable read json
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_START_SERVER + server.address().port);
});