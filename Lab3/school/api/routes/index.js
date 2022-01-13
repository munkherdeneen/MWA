const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController");

router.route("/students")
    .get(schoolController.getAll)
    ;

router.route("/students/:studentId")
    .get(schoolController.getOne)
    ;

module.exports = router;