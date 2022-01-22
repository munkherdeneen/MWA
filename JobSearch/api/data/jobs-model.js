const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
});

const reviewSchema = mongoose.Schema({
    date: Date,
    text: String,
    reviewer: String
});

const jobsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    description: String,
    experience: String,
    postDate: {
        type: Date,
        required: true
    },
    skills: [String],
    location: locationSchema,
    review: [reviewSchema]
});

mongoose.model(process.env.DB_JOB_MODEL, jobsSchema, "jobs")