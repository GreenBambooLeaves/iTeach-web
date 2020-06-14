// for sessions
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
const Statistic = require("../models/statistic");

// router.get('/test', (req, res) => {
//     res.json({
//         msg: 'session'
//     })
// });

// $route POST api/sessions/add
// @des add session
// @access private

router.post("/add", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    console.log(req.body);
    try {
        let numOfQuestion = req.body.questions.length;
        let session = new Session({
            name: req.body.session.name,
            remark: req.body.session.remark,
            masterId: req.body.session.masterId,
            time: req.body.session.time,
            numOfQuestion
        });

        session = await session.save();
        let sessionId = session._id;
         console.log(req.body.questions.length);

        let quesion = {};
        let quesions = [];
        for (let i = 0; i < numOfQuestion; i++) {
            quesion = new Question({
                content: req.body.questions[i].content,
                classification: req.body.questions[i].classification,
                number: req.body.questions[i].number,
                answer: req.body.questions[i].answer,
                option: req.body.questions[i].option,
                sessionId
            })

            quesion = await quesion.save();
            quesions.push(quesion);
        }

        let response = {
            status: "success",
            session,
            quesions
        }
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "failed"
        })
    }
})

// $route GET api/sessions/:id
// @des search by id
// @access private

router.get("/student/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let session = await Session.findOne({
            _id: req.params.id
        });

        let sessionId;
        if (session) {
            sessionId = session._id;
        }


        let questions = await Question.find({
                "sessionId": sessionId
            })
            .sort({
                "number": 1
            })
            .select({
                'answer': 0
            });

        let response = {
            status: "success",
            session,
            questions
        }
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
});

router.get("/join/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let session = await Session.findOneAndUpdate({
            _id: req.params.id
        }, {
            $inc: {
                numOfStudent: 1
            }
        });

        let sessionId;
        if (session) {
            sessionId = session._id;
        }


        let questions = await Question.find({
                "sessionId": sessionId
            })
            .sort({
                "number": 1
            }).select({
                answer: 0
            });

        let response = {
            status: "success",
            session,
            questions
        }
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
})

router.post("/submit/:id", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    try {
        let session = await Session.findOne({
            _id: req.params.id
        });

        let sessionId;
        if (session) {
            sessionId = session._id;
        }
        console.log(req.body);
        let statistics = [];

        let userId = req.body.userId;
        let numOfAnswer = req.body.answers.length;
        let answers = req.body.answers
        // console.log(answers);
        
        let answer;
        let numOfTrue = 0;
        for (let i = 0; i < numOfAnswer; i++) {
            let content = answers[i].content;
            
            let questionId = answers[i].questionId;

            let question = await Question.findById(questionId);

            let trueAnswer = question.answer;
            let trueorfalse = true;


            if (trueAnswer.length !== content.length) {
                trueorfalse = false;
            } else {
                for (let j = 0; j < trueAnswer.length; j++) {
                    if (!content.includes(trueAnswer[j])) {
                        console.log(trueAnswer[j]);
                        console.log(content);
                        trueorfalse = false;
                        break;
                    }
                }
            }
            if (trueorfalse === true) {
                numOfTrue += 1;
            }
            const answer = new Answer({
                userId,
                questionId,
                content,
                sessionId,
                trueorfalse
            });

            answer.save();

            let statistic = {
                questionId,
                trueorfalse
            };
            statistics.push(statistic);
        }

        let trueRate = numOfTrue / numOfAnswer;
        let response = {
            status: "success",
            statistics,
            trueRate
        }
        res.status(200).json(response);

        let thisStatistic = new Statistic({
            sessionId,
            userId,
            trueRate
        })
        thisStatistic.save();

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
})


// $route POST api/sessions/edit
// @des edit session
// @access private

router.post("/edit/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const quesion = {
        name: req.body.name,
        remark: req.body.remark,
        masterId: req.body.masterId,
        time: req.body.time
    };

    Question.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: quesion
        }, ).then(quesion => res.status(200).json(quesion))
        .catch(err => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

// $route POST api/sessions/delete
// @des delete session
// @access private

router.delete("/delete/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Session.findOneAndRemove({
            _id: req.params.id
        })
        .then(session => res.status(200).json(session))
        .catch(err => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

module.exports = router;