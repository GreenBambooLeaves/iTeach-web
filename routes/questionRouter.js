// for questions
const express = require("express");
const router = express.Router();

const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const Question = require("../models/question");

// router.get('/test', (req, res) => {
//     res.json({
//         msg: 'question'
//     })
// });

// $route POST api/questions/add
// @des add question
// @access private

router.post("/add", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const quesion = new Question({
        content: req.body.content,
        answer: req.body.answer,
        classification: req.body.classification
    })

    quesion.save()
        .then(quesion => res.json(quesion))
        .catch(err => res.json({
            status: "failed"
        }))
})

// $route GET api/questions/:id
// @des search by id
// @access private

router.get("/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {

    Question.findOne({
            _id: req.params.id
        })
        .then(quesion => {
            if (!quesion) {
                return res.status(404).json({
                    status: "failed"
                });
            }
            res.json(quesion);
        })
        .catch(res => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

// $route POST api/questions/edit
// @des edit question
// @access private

router.post("/edit/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    const quesion = {
        content: req.body.content,
        answer: req.body.answer,
        classification: req.body.classification
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

// $route POST api/questions/delete
// @des delete question
// @access private

router.delete("/delete/:id", passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    Question.findOneAndRemove({
            _id: req.params.id
        })
        .then(quesion => res.status(200).json(quesion))
        .catch(err => {
            console.log(err);
            res.status(404).json({
                status: "failed"
            });
        })
})

module.exports = router;