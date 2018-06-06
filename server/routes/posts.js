const express = require("express");
const router = express.Router({mergeParams : true});

const db = require("../models");

//Routed to api/posts

router
    .route("/")
    //get all recent posts
    .get(async function(req, res, next) {
        try {
            let posts = await db.Post.find()
                .select("title image createdAt")
                .sort({createdAt : "desc"})
                .populate("user", {
                    username : true
                })
                .limit(20);

            return res.status(200).json(posts);
        } catch(err) {
            return next(err);
        }
    })
    .post(async function(req, res, next) {
        try {
            let post = await db.Post.create({
                image : req.body.image,
                title : req.body.title,
                description : req.body.description,
                user : req.body.user
            });

            let foundUser = await db.User.findById(req.body.user);
            foundUser.posts.push(post._id);
            await foundUser.save();

            let foundPost = await db.Post.findById(post._id)
                .populate("user", {
                    username : true,
                    profileImage : true
            });

            return res.status(200).json(foundPost);

        } catch(err) {
            return next(err);
        }
    })

router
    .route("/:id")
    .get(async function(req, res, next) {
        try {
            let post = await db.Post.findById(req.params.id)
                .populate("user", {
                    username : true,
                    profileImage : true
                })
            // Comment population moved to seperate route
            //     .populate({
            //         path : "comments",
            //         select : "user text",
            //         populate : {
            //             path : "user",
            //             select : "username"
            //         }
            // });
            return res.status(200).json(post);
        } catch(err) {
            return next(err);
        }
    })
    .put(async function(req, res, next) {
        try {
            let updatedPost = await db.Post.findByIdAndUpdate(req.params.id, {
                image : req.body.image,
                title : req.body.title,
                description : req.body.description
            }, {
                new : true
            });

            return res.status(200).json(updatedPost);
        } catch(err) {
            return next(err);
        }
    })
    .delete(async function(req, res, next) {
        try {
            let deletedPost = await db.Post.findByIdAndRemove(req.params.id);
            return res.status(200).json({});
        } catch(err) {
            return next(err);
        }
    })

module.exports = router;