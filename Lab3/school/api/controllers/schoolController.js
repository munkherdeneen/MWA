const schoolData = require("../data/school.json");

const getAll = function(req, res) {
    console.log("GetAll invoked");
    res.status(200).send(schoolData);
};

const getOne = function(req, res) {
    console.log("GetOne invoked");
    const studentId = parseInt(req.params.studentId, 10);
    const student = schoolData[studentId-1];
    res.status(200).send(student);
};

module.exports = {
    getAll,
    getOne
}