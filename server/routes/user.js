const express = require("express");
const router = express.Router({mergeParams : true});
const jwt = require("jsonwebtoken");

const db = require("../models/index");

const {loginRequired, ensureCorrectUser } = require("../middleware/auth");

//routed to api/user

router
    .route("/signup")
    .post(async function(req, res, next) {
        try {
            //Create User
            let user = await db.User.create(req.body);
            //Create web token
            let token = jwt.sign({
                id : user.id,
                username : user.username,
                profileImage : user.profileImage,
                profileText : user.profileText 
            }, process.env.SECRET_KEY);

            return res.status(200).json({
                id : user.id,
                username : user.username,
                profileImage : user.profileImage,
                profileText : user.profileText,
                token : token
            });

        } catch(err) {
            if (err.code === 11000) {
                err.message = "Sorry, that username and/or email is taken";
            }
            return next({
                status: 400,
                message : err.message
            })
        }
    });

router
    .route("/signin")
    .post(async function(req, res, next) {
        try {
            let user = await db.User.findOne({
                email : req.body.email
            });
            if (await user.comparePassword(req.body.password)) {
                let token = jwt.sign({
                    id : user.id,
                    username : user.username,
                    profileImage : user.profileImage,
                    profileText : user.profileText 
                }, process.env.SECRET_KEY);
                return res.status(200).json({
                    id : user.id,
                    username : user.username,
                    profileImage : user.profileImage,
                    profileText : user.profileText,
                    token : token
                });
            } else {
                return next({
                    status : 400,
                    message : "Invalid email/password"
                });
            }

        } catch(err) {
            return next({
                status : 400,
                //message : "Invalid email/password"
            });
        }
    });

router
    .route("/:id")
    .get(async function(req, res, next) {
        try {
            let user = await db.User.findById(req.params.id)
                .populate({
                    path : "posts",
                    select : "title createdAt image",
                    options : {
                        sort : {createdAt : "desc"},
                        limit : 10,
                    }
                })
                // .populate("comments", {
                //     text : true,
                //     post : true
                // });
            return res.status(200).json(user);
        } catch(err) {
            return next(err);
        }
    })
    .put(ensureCorrectUser, async function(req, res, next) {
        try {
            let updatedUser = await db.User.findByIdAndUpdate(req.params.id, {
                profileText : req.body.profileText,
                profileImage : req.body.profileImage
            }, {
                new : true
            });

            return res.status(200).json(updatedUser);
        } catch(err) {
            return next(err);
        }
    })

module.exports = router;