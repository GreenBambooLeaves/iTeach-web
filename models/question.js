const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const QuestionSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    option: { //问题选项
        type: [String]
    },
    answer: {
        type: [String],
        required: true
    },
    classification: { //问题类型
        type: String,
        required: true,
        enum: ['one-choice', 'multi-choice', 'filling'],
        default: 'one-choice'
    },
    number: { //课堂内问题的序号
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    }
});

module.exports = Question = mongoose.model("questions", QuestionSchema);