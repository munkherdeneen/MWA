const mongoose = require("mongoose");
const Student = mongoose.model(process.env.DB_COMPANY_MODEL);

const getAll = function(req, res) {
    console.log("GetAll invoked");
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_LIMIT;
    let maxCount = process.env.DEFAULT_FIND_MAX;

    console.log(req.query);
    // set offset by user given value if there is
    if(req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    // set count by user given value if there is
    if(req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    // Checking user provided format it's compartable
    if(isNaN(offset) || isNaN(count)) {
        console.log("Offset or Count must be digit");
        res.status(400).json({"message":"Offset or Count must be digit"});
        return;
    }

    // Checking limit number is exceeded
    if(count > maxCount) {
        console.log("count is greater than limit.");
        res.status(400).json({"message":"Cannot exceed count limit of "+ process.env.DEFAULT_FIND_MAX});
        return;
    }

    Student.find().skip(offset).limit(count).exec(function(err, students) {
        console.log("Found students", students);
        res.status(200).json(students);
    });
};

const getOne = function(req, res) {
    console.log("GetOne invoked");
    const studentId = req.params.studentId;

    if(!mongoose.isValidObjectId(studentId)) {
        console.log("Reques params studentId is not valid");
        res.status(500).json({"message":"studentId must be a valid ID"});
        return;
    }

    Student.findById(studentId).exec(function(err, student) {
        const response = {
            status: 200,
            message: student
        }

        if(err) {
            console.log("Error occurred during find a student");
            response.status = 500;
            response.message = err;
        }
        else if(!student) {
            console.log("Student not found");
            response.status = 404;
            response.message = {"message":"studentId not found"};
        }

        console.log("Student found", response.message);
        res.status(response.status).json(response.message);
    });
};

module.exports = {
    getAll,
    getOne
}