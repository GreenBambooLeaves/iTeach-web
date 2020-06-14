const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const dotenv = require('dotenv');

dotenv.config({
    path: './config.env'
});

const User = require("../models/user");
const Comment = require("../models/comment");
const Session = require("../models/session");

router.post("/add/:sessionId", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    
    try {
        let response = {
            status: "success"
        };

        const sessionId = req.params.sessionId;
        const userId = req.body.userId;
        const content = req.body.content;

        const comment = new Comment({
            sessionId,
            userId,
            content
        })

        response.comment = await comment.save();

        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
});

router.get("/current/:sessionId", passport.authenticate('jwt', {
    session: false
}), async (req, res) => {
    console.log("gx");
    try {
        let response = {
            status: "success"
        };

        const sessionId = req.params.sessionId;

        const session = await Session.findById(sessionId);
        response.session = session;

        const comments = await Comment
            .find({
                sessionId: sessionId
            })
            .sort({
                date: 1
            });


        let commentsForSend = [];
        let comment = {};
        for (let i = 0; i < comments.length; i++) {
            let userId = comments[i].userId;
            let user = await User.findById(userId);
            let name = user.name;
            let classification = user.classification;
            comment = {
                content: comments[i].content,
                name,
                classification
            };
            commentsForSend.push(comment);
        }
        response.comments = commentsForSend;
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: "failed"
        })
    }
});

module.exports = router;