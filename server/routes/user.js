const express = require("express");
const router = express.Router({mergeParams : true});
const jwt = require("jsonwebtoken");

const db = require("../models/index");

router
    .route("/signup")
    .post(async function(req, res, next) {
        try {
            console.log(req.body);
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

module.exports = router;