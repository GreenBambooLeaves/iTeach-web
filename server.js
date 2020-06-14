const dotenv = require('dotenv');
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const passport = require("passport");

dotenv.config({
    path: './config.env'
});

const users = require("./routes/userRouter");
const questions = require("./routes/questionRouter");
const sessions = require("./routes/sessionRouter");
const answers = require("./routes/answerRouter");
const statistics = require("./routes/statisticRouter");
const comments = require("./routes/commentRouter");

mongoose.connect(process.env.DATABASE_LOCAL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('Database connection successful'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Authorization');
    next();
});

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + './client/index.js');
});
app.use("/api/users", users);
app.use("/api/questions", questions);
app.use("/api/sessions", sessions);
app.use("/api/answers", answers);
app.use("/api/statistics", statistics);
app.use("/api/comments", comments);

app.use(passport.initialize());
require("./config/passport")(passport);

const port = process.env.PORT || 52433;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})