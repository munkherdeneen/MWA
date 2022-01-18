const mongoose = require("mongoose");
const Company = mongoose.model(process.env.DB_COMPANY_MODEL);

getAll = function(req, res) {
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

    Company.find().skip(offset).limit(count).exec(function(err, companies) {
        console.log("Found companies", companies);
        res.status(200).json(companies);
    });
};

getOne = function(req, res) {
    console.log("GetOne invoked");
    const companyId = req.params.companyId;

    if(!mongoose.isValidObjectId(companyId)) {
        console.log("Reques params companyId is not valid");
        res.status(500).json({"message":"CompanyId must be a valid ID"});
        return;
    }

    Company.findById(companyId).exec(function(err, company) {
        const response = {
            status: 200,
            message: company
        }

        if(err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        }
        else if(!company) {
            console.log("Company not found");
            response.status = 404;
            response.message = {"message":"CompanyId not found"};
        }

        console.log("Company found", response.message);
        res.status(response.status).json(response.message);
    });
}

addOne = function(req, res) {
    console.log("AddOne invoked");
    console.log(req.body);

    const newCompany = {
        name: req.body.name,
        rank: req.body.rank,
        industry: req.body.industry,
        keyPeople: req.body.keyPeople
    }

    Company.create(newCompany, function(err, company) {
        const response = {
            status: 200,
            message: company
        };

        if(err) {
            console.log("Error occurred creating new company", err);
            response.status = 500;
            response.message = err;
        }
        res.status(response.status).json(company);
    });
};

deleteOne = function(req, res) {
    console.log("deleteOne invoked");
    const companyId = req.params.companyId;

    if(!mongoose.isValidObjectId(companyId)) {
        console.log("CompanyId must be a valid Id");
        res.status(500).json({"message":"CompanyId must be a valid Id"});
        return;
    }

    Company.findByIdAndDelete(companyId).exec(function(err, deletedCompany) {
        const response = {
            status: 204,
            message: deletedCompany
        }
        
        if(err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        } 
        else if(!deletedCompany) {
            console.log("Company not found");
            response.status = 404;
            response.message = {"message":"Company not found"};
        }

        res.status(response.status).json(response.message);
    });
}

updateOne = function(req, res) {
    console.log("UpdateOne invoked");
    const companyId = req.params.companyId;

    if(!mongoose.isValidObjectId(companyId)) {
        console.log("CompanyId must be a valid Id");
        res.status(500).json({"message":"CompanyId must be a valid Id"});
        return;
    }

    const updatingCompany = {
        name: req.body.name,
        rank: req.body.rank,
        industry: req.body.industry,
        keyPeople: req.body.keyPeople
    }
    
    Company.findByIdAndUpdate(companyId, updatingCompany).exec(function(err, updatedCompany) {
        const response = {
            status: 200,
            message: updatingCompany
        }

        if(err) {
            console.log("Error occurred during find a company");
            response.status = 500;
            response.message = err;
        } 
        else if(!updatedCompany) {
            console.log("Company not found");
            response.status = 404;
            response.message = {"message":"Company not found"};
        }

        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    updateOne
}