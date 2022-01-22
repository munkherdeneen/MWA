const express = require("express");
const router = express.Router();

const jobsController = require("../controllers/jobs.controller")

const reviewController = require("../controllers/review.controller");

router.route("/jobs")
    .get(jobsController.getAll)
    .post(jobsController.addOne)
    ;

router.route("/jobs/:jobId")
    .get(jobsController.getOne)
    .delete(jobsController.deleteOne)
    .put(jobsController.fullUpdateOne)
    .patch(jobsController.partialUpdateOne)
    ;

router.route("/jobs/:jobId/reviews")
    .get(reviewController.getAll)
    .post(reviewController.addOne)
    ;

router.route("/jobs/:jobId/reviews/:reviewId")
    .get(reviewController.getOne)
    .delete(reviewController.deleteOne)
    .put(reviewController.fullupdateOne)
    ;

module.exports = router;