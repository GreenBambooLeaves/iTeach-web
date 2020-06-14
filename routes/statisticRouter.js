// for questions
const express = require("express");
const router = express.Router();

const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const Session = require("../models/session");
const Question = require("../models/question");
const Answer = require("../models/answer");
const User = require("../models/user");
const Statistic = require("../models/statistic");

// router.get('/test', (req, res) => {
//     res.json({
//         msg: 'question'
//     })
// });

// $route GET api/statistics/student
// @des search by id
// @access private

router.get("/student/:userId", passport.authenticate('jwt', {
    
    session: false
}), async (req, res) => {
    try {
        
        let response = {
            status: "success"
        };

        let userId = req.params.userId;
        let sessionSearch = await Answer
            .find({
                userId: userId
            }).select({
                sessionId: 1,
                _id: 0
            });
        let sessionsId = [];
        for (let i = 0; i < sessionSearch.length; i++) {
            if (!sessionsId.includes(sessionSearch[i].sessionId.toString())) {
                sessionsId.push(sessionSearch[i].sessionId.toString());
            }
        }

        let sessions = [];
        let session;
        let teacher;
        for (let i = 0; i < sessionsId.length; i++) {
            session = await Session.findById(sessionsId[i]).lean();
            teacher = await User.findById(session.masterId).lean();
            session.masterName = teacher.name;
            sessions.push(session);
        }

        response.sessions = sessions;
        // console.log(sessions);

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }

})

router.get("/student/:userId/:sessionId", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let response = {
            status: "success"
        };

        let userId = req.params.userId;
        let sessionId = req.params.sessionId;
        let questions = [];

        const session = await Session.findById(sessionId);
        questions = await Question.find({
            sessionId: sessionId
        }).sort({
            number: 1
        }).lean();

        let answer;
        for (let i = 0; i < questions.length; i++) {
            answer = await Answer.findOne({
                userId,
                questionId: questions[i]._id,
                sessionId: questions[i].sessionId
            });
            questions[i] = {
                content: questions[i].content,
                option: questions[i].option,
                trueAnswer: questions[i].answer,
                classification: questions[i].classification,
                number: questions[i].number,
                id: questions[i]._id
            }
            questions[i].answer = answer.content;
            questions[i].trueorfalse = answer.trueorfalse;
        }

        response.questions = questions;
        response.session = session;
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }

})

router.get("/teacher/:userId", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let response = {
            status: "success"
        };

        let userId = req.params.userId;
        let sessions = await Session.find({
            masterId: userId
        });
        response.sessions = sessions;
        // console.log(sessions);

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
})

router.get("/teacher/detail/:sessionId", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let response = {
            status: "success"
        };
        //let userId = req.body.userId;
        let sessionId = req.params.sessionId;
        const session = await Session.findById(sessionId);
        let questions = [];

        questions = await Question.find({
            sessionId: sessionId
        }).sort({
            number: 1
        }).lean();

        let allAnswers;
        for (let i = 0; i < questions.length; i++) {
            allAnswers = await Answer.find({
                questionId: questions[i]._id,
                sessionId: questions[i].sessionId
            });
            questions[i] = {
                content: questions[i].content,
                option: questions[i].option,
                trueAnswer: questions[i].answer,
                classification: questions[i].classification,
                number: questions[i].number,
                id: questions[i]._id
            }
            let trueAnswers = [];
            let falseAnswers = [];
            let studentName;
            for (let j = 0; j < allAnswers.length; j++) {
                studentName = await User.findById(allAnswers[j].userId)
                    .select({
                        name: 1
                    }).lean();
                studentName = studentName.name;
                if (allAnswers[j].trueorfalse === true) {
                    let studentAnswer = {
                        name: studentName
                    }
                    trueAnswers.push(studentAnswer);
                } else {
                    let studentAnswer = {
                        name: studentName,
                        answer: allAnswers[j].content
                    }
                    falseAnswers.push(studentAnswer);
                }
            }
            questions[i].trueAnswers = trueAnswers;
            questions[i].falseAnswers = falseAnswers;
            // console.log(allAnswers);
        }

        response.questions = questions;
        response.session = session;
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
});

router.get("/sort/:sessionId", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    console.log("1123");
    try {
        let response = {
            status: "success"
        };

        let sessionId = req.params.sessionId;
        let statistics = await Statistic.find({
            sessionId: sessionId
        }).sort({
            trueRate: -1
        });

        let statisticsForSend = [];
        let statisitc = {};
        let studentName;
        for (let i = 0; i < statistics.length; i++) {
            let userId = statistics[i].userId
            let student = await User.findById(userId);
            studentName = student.name;
            statisitc = {
                name: studentName,
                trueRate: statistics[i].trueRate
            };
            statisticsForSend.push(statisitc);
        }
        response.statistics = statisticsForSend;
        console.log(response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
});

module.exports = router;