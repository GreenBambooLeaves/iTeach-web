const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StatisticSchema = new Schema({
    sessionId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Session'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    trueRate: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Statistic = mongoose.model("statistics", StatisticSchema);