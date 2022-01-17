const express = require("express");

const router = express.Router();

const companiesController = require("../controllers/companies.controller");

const keyPeopleController = require("../controllers/keypeople.controller");

router.route("/companies")
    .get(companiesController.getAll)
    .post(companiesController.addOne)
    ;

router.route("/companies/:companyId")
    .get(companiesController.getOne)
    .delete(companiesController.deleteOne)
    .put(companiesController.updateOne)
    ;

router.route("/companies/:companyId/keypeople")
    .get(keyPeopleController.getAll)
    ;

router.route("/companies/:companyId/keypeople/:personId")
    .get(keyPeopleController.getOne)
    .delete(keyPeopleController.deleteOne)
    ;

module.exports = router;