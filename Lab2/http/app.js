const http = require("http");
const fs = require("fs");
const path = require("path");

let indexFileBuffer;
let statusCode = 200;

const serverAllRequest = function (req, res) {
    if (req.method == 'GET') {
        console.log("GET request received");
        switch (req.url) {
            case "/page1.html":
                res.setHeader("Content-type", "text/html");
                fs.readFile(path.join(__dirname, "public/page1.html"), function (err, buffer) {
                    if (err) {
                        indexFileBuffer = "File not Found";
                        statusCode = 404;
                    }
                    else {
                        indexFileBuffer = buffer;
                        statusCode = 200;
                    }
                    res.writeHead(statusCode);
                    res.end(indexFileBuffer);
                });
                break;
            case "/page2.html":
                res.setHeader("Content-type", "text/html");
                fs.readFile(path.join(__dirname, "public/page2.html"), function (err, buffer) {
                    if (err) {
                        indexFileBuffer = "File not Found";
                        statusCode = 404;
                    }
                    else {
                        indexFileBuffer = buffer;
                        statusCode = 200;
                    }
                    res.writeHead(statusCode);
                    res.end(indexFileBuffer);
                });
                break;
            case "/":
                res.setHeader("Content-type", "text/html");
                fs.readFile(path.join(__dirname, "public/index.html"), function (err, buffer) {
                    if (err) {
                        indexFileBuffer = "File not Found";
                        statusCode = 404;
                    }
                    else {
                        indexFileBuffer = buffer;
                        statusCode = 200;
                    }
                    res.writeHead(statusCode);
                    res.end(indexFileBuffer);
                });
                break;
            default:
                console.log("File not Found");
                indexFileBuffer = "File not Found";
                statusCode = 404;
                res.writeHead(statusCode);
                res.end(indexFileBuffer);
                break;
        }
    }
    else if (req.method == 'POST') {
        console.log("Json request received");
        res.setHeader("Content-type", "application/json");
        fs.readFile(path.join(__dirname, "public/json"), function (err, buffer) {
            if (err) {
                indexFileBuffer = "File not Found";
                statusCode = 404;
            }
            else {
                indexFileBuffer = buffer;
                statusCode = 200;
            }
            res.writeHead(200);
            res.end(indexFileBuffer);
        })
    }
}

const server = http.createServer(serverAllRequest);
fs.readFile(path.join(__dirname, "public/index.html"), function (err, buffer) {
    indexFileBuffer = buffer;

    server.listen(4343, function () {
        console.log("Server is up and running and listening port " + server.address().port);
    });
});