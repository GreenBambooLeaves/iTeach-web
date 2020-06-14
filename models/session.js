const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    name: { //课堂名
        type: String,
        required: true
    },
    remark: { //课堂备注
        type: String,
        required: true
    },
    masterId: { //主持人的Id
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    numOfStudent: {
        type: Number,
        default: 0
    },
    numOfQuestion: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    },
    time: { // 答题时间，以分钟为单位
        type: Number,
        required: true
    }
});

module.exports = Session = mongoose.model("sessions", SessionSchema);