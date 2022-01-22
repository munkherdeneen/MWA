const mongoose = require("mongoose");

const Jobs = mongoose.model(process.env.DB_JOB_MODEL);

const _runGeoQuery = function (req, res) {
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    const distance = parseFloat(process.env.GEO_SEARCH_MIN_DIST);

    if (req.res.dist) {
        distance = parseInt(req.res.dist);
    }

    //Geo Json point
    const point = { type: "Point", coordinates: [lng, lat] }; // Mongo [long, lat]
    const query = {
        "location.coordinates": {
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST, 10),
            }
        }
    };

    Jobs.find(query).exec(function (err, jobs) {
        console.log("Found jobs");
        res.status(200).json(jobs);
    });
};

getAll = function (req, res) {
    console.log("Jobs controller getAll invoked");
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_LIMIT;
    let maxCount = process.env.DEFAULT_FIND_MAX;

    if (req.query && req.query.lat && req.query.lng) {
        _runGeoQuery(req, res);
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

    Jobs.find().skip(offset).limit(count).exec(function (err, jobs) {
        console.log("Found jobs", jobs);
        res.status(200).json(jobs);
    });
};

getOne = function (req, res) {
    console.log("getOne jobs controller invoked");
    const jobId = req.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Request param jobId is not valid");
        res.status(400).json({ "message": "Job ID must be valid Id" });
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

        res.status(response.status).json(response.message);
    });
};

addOne = function (req, res) {
    console.log("addOne jobs controlled invoked");
    const newJob = {
        title: req.body.title,
        salary: req.body.salary,
        description: req.body.description,
        experience: req.body.experience,
        postDate: Date.now(),
        skills: req.body.skills,
        location: req.body.location,
        review: []
    }

    Jobs.create(newJob, function (err, job) {
        if (err) {
            console.log("Error creating a new job post", err);
            res.status(500).json(err);
            return;
        }

        res.status(200).json(job);
    });
};

deleteOne = function (req, res) {
    console.log("deleteOne jobs controller invoked");
    const jobId = req.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Request param jobId is not valid");
        res.status(400).json({ "message": "Job ID must be valid Id" });
        return;
    }

    Jobs.findByIdAndDelete(jobId).exec(function (err, job) {
        const response = {
            status: 201,
            message: "Job deleted"
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

const _updateOne = function(req, res, updateJobCallback) {
    console.log("updateOne jobs controller invoked");
    const jobId = req.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Request param jobId is not valid");
        res.status(400).json({ "message": "Job ID must be valid Id" });
        return;
    }

    Jobs.findById(jobId).exec(function (err, job) {
        const response = {
            status: 204,
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
        
        if (response.status != 204) {
            res.status(response.status).json(response.message);
        }
        else {
            updateJobCallback(req, res, job, response);
        }
    });
};

const _saveOneJob = function(res, job, response) {
    job.save(function(err, job) {
        const response = {
            status: 201,
            message: job
        }
        if (err) {
            console.log("Error finding job", err);
            response.status = 500;
            response.message = err;
        } else if (!job) {
            console.log("Job not found");
            response.status = 404;
            response.message = { "message": "Job not found" };
        }

        res.status(response.status).json(response.message);
    });
};

const _fullUpdateOne = function (req, res, job, response) {
    job.title = req.body.title;
    job.salary = req.body.salary;
    job.description = req.body.description;
    job.experience = req.body.experience;
    job.postDate = Date.now();
    job.skills = req.body.skills;
    job.location = req.body.location;
    job.review = req.body.review;

    _saveOneJob(res, job, response);
}

const _partialUpdateOne = function (req, res, job, response) {
    if(req.body.title) {
        job.title = req.body.title;
    }
    if(req.body.salary) {
        job.salary = req.body.salary;
    }
    if(req.body.description) {
        job.description = req.body.description;
    }
    if(req.body.experience) {
        job.experience = req.body.experience;
    }
    if(req.body.postDate) {
        job.postDate = Date.now();
    }
    if(req.body.skills) {
        job.skills = req.body.skills;
    }
    if(req.body.location) {
        job.location = req.body.location;
    }
    if(req.body.review) {
        job.review = req.body.review;
    }
    
    _saveOneJob(res, job, response);
};

const fullUpdateOne = function (req, res) {
    console.log("Full update job controller invoked");
    _updateOne(req, res, _fullUpdateOne);
};

const partialUpdateOne = function(req, res) {
    console.log("Partial update job controller invoked");
    _updateOne(req, res, _partialUpdateOne);
};

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    fullUpdateOne,
    partialUpdateOne
}