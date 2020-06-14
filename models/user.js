const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    classification: {
        type: String,
        required: true,
        enum: ['teacher', 'student'],
        default: 'student'
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model("users", UserSchema);