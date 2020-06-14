// for answers
const express = require("express");
const router = express.Router();

const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const Answer = require("../models/answer");

// router.get('/test', (req, res) => {
//     res.json({
//         msg: 'question'
//     })
// });

// $route POST api/answers/add
// @des add answer
// @access private

router.post("/add", passport.authenticate('jwt', {
    answer: false
}), (req, res) => {
    const answer = new Answer({
        userId: req.body.userId,
        questionId: req.body.questionId,
        content: req.body.content,
        sessionId: req.body.sessionId,
        trueorflase: req.body.trueorflase,
        number: req.body.number
    })

    answer.save()
        .then(answer => res.status(200).json(answer))
        .catch(err => res.status(400).json({
            status: "failed"
        }))
})

// $route GET api/answers/:id
// @des search by id
// @access private

router.get("/:id", passport.authenticate('jwt', {
    answer: false
}), (req, res) => {

    Answer.findOne({
            _id: req.params.id
        })
        .then(answer => {
            if (!answer) {
                return res.status(404).json({
                    status: "failed"
                });
            }
            res.json(answer);
        })
        .catch(res => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

// $route POST api/answers/edit
// @des edit answer
// @access private

router.post("/edit/:id", passport.authenticate('jwt', {
    answer: false
}), (req, res) => {
    const answer = {
        userId: req.body.userId,
        questionId: req.body.questionId,
        content: req.body.content,
        classId: req.body.classId,
        trueorflase: req.body.trueorflase,
        number: req.body.number
    };

    Answer.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: answer
        }, ).then(answer => res.status(200).json(answer))
        .catch(err => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

// $route POST api/answers/delete
// @des delete answer
// @access private

router.delete("/delete/:id", passport.authenticate('jwt', {
    answer: false
}), (req, res) => {
    Answer.findOneAndRemove({
            _id: req.params.id
        })
        .then(answer => res.status(200).json(answer))
        .catch(err => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

module.exports = router;