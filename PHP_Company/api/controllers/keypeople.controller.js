const mongoose = require("mongoose");
const Company = mongoose.model(process.env.DB_COMPANY_MODEL);

getAll = function (req, res) {
    console.log("GetAll KeyPeople invoked");
    const companyId = req.params.companyId;
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_LIMIT;
    let maxCount = process.env.DEFAULT_FIND_MAX;

    if (!mongoose.isValidObjectId(companyId)) {
        console.log("CompanyId must be a valid Id");
        res.status(500).json({ "message": "CompanyId must be a valid Id" });
        return;
    }

    console.log(req.query);
    // set offset by user given value if there is
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    // set count by user given value if there is
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    // Checking user provided format it's compartable
    if (isNaN(offset) || isNaN(count)) {
        console.log("Offset or Count must be digit");
        res.status(400).json({ "message": "Offset or Count must be digit" });
        return;
    }

    // Checking limit number is exceeded
    if (count > maxCount) {
        console.log("count is greater than limit.");
        res.status(400).json({ "message": "Cannot exceed count limit of " + process.env.DEFAULT_FIND_MAX });
        return;
    }

    Company.findById(companyId).skip(offset).limit(count).select("keyPeople").exec(function (err, company) {
        const response = {
            status: 200,
            message: company
        }

        if (err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        }
        else if (!company) {
            console.log("Company not found");
            response.status = 404;
            response.message = { "message": "Company not found" };
        }
        else {
            console.log("Found key People", company.keyPeople, " for company ", company);
            response.status = 200;
            response.message = company.keyPeople;
        }

        res.status(response.status).json(response.message);
    });
};

getOne = function (req, res) {
    console.log("GetOne invoked");
    const companyId = req.params.companyId;
    const personId = req.params.personId;

    if (!mongoose.isValidObjectId(companyId) || !mongoose.isValidObjectId(personId)) {
        console.log("CompanyId | PersonId must be a valid Id");
        res.status(500).json({ "message": "CompanyId | PersonId  must be a valid Id" });
        return;
    }

    Company.findById(companyId).select("keyPeople").exec(function (err, company) {
        const response = {
            status: 200,
            message: company
        }

        if (err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        }
        else if (!company) {
            console.log("Company not found");
            response.status = 404;
            response.message = { "message": "Company not found" };
        }
        else {
            const person = company.keyPeople.id(personId);
            if (!person) {
                console.log("Person not found");
                response.status = 404;
                response.message = { "message": "Person not found" };
            }
            else {
                console.log("Found key People", company.keyPeople.id(personId), " for company ", company);
                response.status = 200;
                response.message = person;
            }
        }
        res.status(response.status).json(response.message);
    });
};

const _deletePerson = function (res, company, personId) {
    const person = company.keyPeople.id(personId);
    if (!person) {
        res.status(404).json({ "message": "Person not found " + personId });
        return;
    }

    person.remove();
    company.save(function () {
        res.status(204).json({ "message": "person deleted" });
    });
};

deleteOne = function (req, res) {
    console.log("deleteOne keyPeople invoked");
    const companyId = req.params.companyId;
    const personId = req.params.personId;

    if (!mongoose.isValidObjectId(companyId) || !mongoose.isValidObjectId(personId)) {
        console.log("CompanyId || PersonId must be a valid Id");
        res.status(500).json({ "message": "CompanyId || PersonId must be a valid Id" });
        return;
    }

    Company.findById(companyId).exec(function (err, company) {
        const response = {
            status: 204,
            message: company
        }

        if (err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        }
        else if (!company) {
            console.log("Company not found");
            response.status = 404;
            response.message = { "message": "Company not found" };
        }

        if (response.status == 204) {
            _deletePerson(res, company, personId);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};

_addKeyPerson = function (req, res, company) {
    const people = company.keyPeople;
    const newPerson = {
        name: req.body.name,
        title: req.body.title
    }

    people.set(newPerson);
    company.save(function (err) {
        const response = {
            status: 201,
            message: req.body
        }

        if (err) {
            console.log("error occured while adding person", err);
            response.status = 500;
            response.message = err;
        }

        console.log(response.message);
        res.status(response.status).json(response.message);
    });
}

addOne = function (req, res) {
    console.log("AddOne invoked");
    const companyId = req.params.companyId;

    if (!mongoose.isValidObjectId(companyId)) {
        console.log("CompanyId must be a valid Id");
        res.status(500).json({ "message": "CompanyId must be a valid Id" });
        return;
    }

    Company.findById(companyId).exec(function (err, company) {
        const response = {
            status: 201,
            message: company.keyPeople
        };

        if (err) {
            console.log("error occurred during find a company");
            response.status = 500;
            response.message = err;
        }
        else if (!company) {
            console.log("Company not found", companyId);
            response.status = 404;
            response.message = { "message": "Company not found" };
        }

        if (response.status == 201) {
            _addKeyPerson(req, res, company);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
};

const _updatePerson = function (res, req, company) {
    const person = company.keyPeople.id(req.params.personId);

    const response = {
        status: 200,
        message: person
    }

    if (!person) {
        console.log("Person not found");
        response.status = 404;
        response.message = { "message": "Person not found" };
    }
    else {
        person.set(req.body);
        company.save(function (err) {
            if (err) {
                console.log("Error occurred during find a company");
                response.status = 500;
                response.message = err;
            }
        });
    }

    res.status(response.status).json(response.message);    
};

updateOne = function (req, res) {
    console.log("UpdateOne keypeople invoked");
    const companyId = req.params.companyId;
    const personId = req.params.personId;

    // if (isString(updatingPerson.name) || isString(updatingPerson.title)) {
    //     console.log("Person name or title must be a string");
    //     res.status(400).json({ "message": "Person name or title must be a string" });
    //     return;
    // }

    if (!mongoose.isValidObjectId(companyId) || !mongoose.isValidObjectId(personId)) {
        console.log("CompanyId | PersonId must be a valid Id");
        res.status(500).json({ "message": "CompanyId | PersonId must be a valid Id" });
        return;
    }

    Company.findById(companyId).exec(function (err, company) {
        const response = {
            status: 204,
            message: company
        }

        if (err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        }
        else if (!company) {
            console.log("Company not found");
            response.status = 404;
            response.message = { "message": "Company not found" };
        }

        if (response.status == 204) {
            _updatePerson(res, req, company);
        }
        else {
            res.status(response.status).json(response.message);
        }
    });
}

module.exports = {
    getAll,
    getOne,
    deleteOne,
    addOne,
    updateOne
}