const mongoose = require("mongoose");

const Jobs = mongoose.model(process.env.DB_JOB_MODEL);

getAll = function (req, res) {
    console.log("Review controller getAll invoked");
    const jobId = req.params.jobId;
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_LIMIT;
    let maxCount = process.env.DEFAULT_FIND_MAX;

    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Request param jobId is not valid");
        res.status(400).json({ "message": "Job ID must be valid Id" });
        return;
    }

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset | Count must be digit");
        res.status(400).json({ "message": "Offset | Count must be digit" });
        return;
    }

    if (count > maxCount) {
        console.log("Limit count is exceeded it must be lower than 9");
        res.status(400).json({ "message": "Limit count is exceeded it must be lower than 9" });
        return;
    }

    Jobs.findById(jobId).select("review").skip(offset).limit(count).exec(function (err, job) {
        const response = {
            status: 201,
            message: job
        }

        if (err) {
            console.log("error occurred finding a job", err);
            response.status = 500;
            response.message = err;
        }
        if (!job) {
            console.log("Job not found");
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        res.status(response.status).json(response.message);
    });
};

getOne = function (req, res) {
    console.log("Review controller getOne invoked");
    const jobId = req.params.jobId;
    const reviewId = req.params.reviewId;

    if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(reviewId)) {
        console.log("Request param jobId | reviewId is not valid");
        res.status(400).json({ "message": "jobId | reviewId must be valid Id" });
        return;
    }

    Jobs.findById(jobId).select("review").exec(function (err, reviews) {
        const response = {
            status: 201,
            message: reviews
        }

        if (err) {
            console.log("error occurred finding a reviews", err);
            response.status = 500;
            response.message = err;
        }
        if (!reviews) {
            console.log("Reviews not found");
            response.status = 404;
            response.message = { "message": "Reviews not found" };
        }

        if (response.status == 201) {
            const review = reviews.review.id(reviewId);
            if (review == null) {
                response.message = { "message": "Review not found" };
            }
            else {
                response.message = review;
            }
        }

        res.status(response.status).json(response.message);
    });
};

addOne = function (req, res) {
    console.log("Review controller addOne invoked");
    const jobId = req.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Request param jobId is not valid");
        res.status(400).json({ "message": "jobId must be valid Id" });
        return;
    }

    Jobs.findById(jobId).exec(function (err, job) {
        const response = {
            status: 201,
            message: job
        }

        if (err) {
            console.log("error occurred finding a job", err);
            response.status = 500;
            response.message = err;
        }
        if (!job) {
            console.log("Job not found");
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        if (response.status == 201) {
            const newReview = {
                text: req.body.text,
                reviewer: req.body.reviewer,
                date: Date.now()
            }

            const reviews = job.review;
            reviews.push(newReview);
            job.save(function (err, review) {
                if (err) {
                    console.log("Error creating a new review for job", err);
                    response.status = 500;
                    response.message = err;
                }
            });

            res.status(response.status).json(response.message);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};

deleteOne = function (req, res) {
    console.log("Review controller deleteOne invoked");
    const jobId = req.params.jobId;
    const reviewId = req.params.reviewId;

    if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(reviewId)) {
        console.log("Request param jobId | reviewId is not valid");
        res.status(400).json({ "message": "jobId | reviewId must be valid Id" });
        return;
    }

    Jobs.findById(jobId).select("review").exec(function (err, reviews) {
        const response = {
            status: 201,
            message: reviews
        }

        if (err) {
            console.log("error occurred finding a reviews", err);
            response.status = 500;
            response.message = err;
        }
        if (!reviews) {
            console.log("Reviews not found");
            response.status = 404;
            response.message = { "message": "Reviews not found" };
        }

        if (response.status == 201) {
            const review = reviews.review.id(reviewId);
            response.status = 204;
            response.message = { "message": "review deleted" };

            if (!review) {
                console.log("Review not found " + reviewId);
                response.status = 404;
                response.message = "Review not found " + reviewId;
            }
            else {
                review.remove();
                reviews.save(function (err) {
                    if (err) {
                        console.log("Error occurred while deleting review", err);
                        response.status = 404;
                        response.message = "Error occurred while deleting review", err;
                    }

                    res.status(response.status).json(response.message);
                });
            }
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};

fullupdateOne = function(req, res) {
    console.log("Review controller fullupdateOne invoked");
    const jobId = req.params.jobId;
    const reviewId = req.params.reviewId;

    if (!mongoose.isValidObjectId(jobId) || !mongoose.isValidObjectId(reviewId)) {
        console.log("Request param jobId | reviewId is not valid");
        res.status(400).json({ "message": "jobId | reviewId must be valid Id" });
        return;
    }

    Jobs.findById(jobId).exec(function (err, job) {
        const response = {
            status: 201,
            message: job
        }

        if (err) {
            console.log("error occurred finding a job", err);
            response.status = 500;
            response.message = err;
        }
        if (!job) {
            console.log("Job not found");
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        if (response.status == 201) {
            const updatingReview = {
                text: req.body.text,
                reviewer: req.body.reviewer,
                date: Date.now()
            }

            const review = job.review.id(reviewId);
            review.set(updatingReview);
            job.save(function (err) {
                if (err) {
                    console.log("Error updating a review for job", err);
                    response.status = 500;
                    response.message = err;
                }
            });

            res.status(response.status).json(response.message);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullupdateOne
}


// function _jobFound(req) {
//     const jobId = req.params.jobId;
//     let result = true;

//     if (!mongoose.isValidObjectId(jobId)) {
//         console.log("Request param jobId | reviewId is not valid");
//         res.status(400).json({ "message": "jobId | reviewId must be valid Id" });
//         result = false;
//     }

//     Jobs.findById(jobId).exec(function (err, job) {
//         if (err) {
//             console.log("error occurred finding a job", err);
//             result = false;
//         }
//         if (!job) {
//             console.log("Job not found");
//             result = false;
//         }

//         result = true;
//     });

//     return result;
// }