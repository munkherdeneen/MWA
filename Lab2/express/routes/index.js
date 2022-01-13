const express = require("express");

const router = express.Router();

router.route("/json")
    .get(function(req, res) {
        console.log("Json GET received");
        res.status(200).send({"Json GET": true});
    })
    .post(function(req, res) {
        console.log("Json POST received");
        res.status(200).send({"Json POST": true});
})

module.exports = router;