const express = require("express");
const router = express.Router();
const multiplierController = require("../controllers/multiplier.controller");

router.route("/multiply/:number1")
    .get(multiplierController.multiplier)
    ;

module.exports = router;