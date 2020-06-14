// for login and register
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

// register
// $route POST api/users/register
// @des response json
// @access public

router.post("/register", (req, res) => {
    console.log(req.body);

    User.findOne({
            email: req.body.email
        })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    status: "failed",
                    email: "Email has been used!"
                })
            } else {
                // generator a new user
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    classification: req.body.classification
                })

                // handle password
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;

                        newUser.password = hash;

                        newUser.save()
                            .then(user => res.json({
                                status: "success",
                                name: user.name,
                                email: user.email,
                                id: user._id
                            }))
                            .catch(err => console.log(err));
                    })
                })
            }
        })
});

// login
// $route POST api/users/login
// @des response token (jwt passport)
// @access public

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log(req.body);
    User.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    error: "The user doesn't exist!"
                });
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // jwt.sign("rule","secret","timeToLive","arrow function")
                        const rule = {
                            id: user._id,
                            name: user.name
                        };

                        // JWT token
                        const token = jwt.sign(rule, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                        });

                        res.status(200).json({
                            status: "success",
                            name: user.name,
                            id: user._id,
                            token: "Bearer " + token
                        })

                    } else {
                        return res.status(400).json({
                            status: "failed",
                            error: "Password is error"
                        });
                    }
                }).catch(
                    err => {
                        console.log(err);
                    }
                )
        })
})

// get data
// $route get api/users/current
// @des return current user
// @access private
router.get("/current", passport.authenticate("jwt", {
    session: false
}), (req, res) => {
    res.status(200).json({
        status: "success",
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        classification: req.user.classification
    });
})


module.exports = router;