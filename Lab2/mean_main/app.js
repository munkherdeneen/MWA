require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function() {
    console.log(process.env.MSG_START_SERVER + server.address().port);
});