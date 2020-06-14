const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    userId: { //回答者ID
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    questionId: { //问题ID
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    content: { //回答内容
        type: [String],
        required: true,
    },
    sessionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Session'
    },
    trueorfalse: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Answer = mongoose.model("answers", AnswerSchema);