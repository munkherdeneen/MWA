const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    gpa: {
        type: Number,
        required: true
    }
});

// Applying rules to the schema
mongoose.model(process.env.DB_COMPANY_MODEL, studentSchema, "students")