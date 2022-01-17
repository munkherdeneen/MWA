const mongoose = require("mongoose");

const keyPeopleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: String
});

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rank: Number,
    industry: {
        type: String,
        required: true
    },
    keyPeople: [keyPeopleSchema]
});

// Applying rules to the schema
mongoose.model(process.env.DB_COMPANY_MODEL, companySchema, "companies")