// let fib = require("./fibanocci");
const child_process = require("child_process");

console.log("1: Start process");
const newProcess = child_process.spawn("node", ["fibanocci42.js"], {stdio: "inherit"});

const newProcess1 = child_process.spawn("node", ["fibanocci15.js"], {stdio: "inherit"});

console.log("4: End process");