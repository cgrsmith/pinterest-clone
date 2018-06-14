const express = require("express");
const router = express.Router({mergeParams : true});

const db = require("../models/index");
const {loginRequired, ensureCorrectUser } = require("../middleware/auth");
//Routed to api/posts/:id/comments

router
    .route("/")
    .get(async function (req, res, next) {
        try {
            let comments = await db.Comment.find({post : req.params.id})
                .sort({createdAt : "desc"})
                .populate("user", {
                    username : true,
                    profileImage : true
                })
                .limit(20);
            return res.status(200).json(comments);
        } catch(err) {
            return next(err);
        }
    })
    .post(loginRequired, async function(req, res, next) {
        try {
            let comment = await db.Comment.create({
                text : req.body.text,
                user : req.body.user,
                post : req.params.id
            });

            let foundUser = await db.User.findById(req.body.user);
            foundUser.comments.push(comment._id);
            await foundUser.save();

            let foundPost = await db.Post.findById(req.params.id);
            foundPost.comments.push(comment._id);
            await foundPost.save();

            return res.status(200).json(comment);
        } catch(err) {
            return next(err);
        }
    });

router
    .route("/:commentId")
    // Not sold on comment editing
    // .put(async function(req, res, next) {
    //     try {
    //         let updatedComment = await db.Comment.findByIdAndUpdate(req.params.commentId, {
    //             text : req.body.text
    //         }, {
    //             new : true
    //         });
    //         return res.status(200).json(updatedComment);
    //     } catch(err) {
    //         return next(err);
    //     }
    // })
    .delete(ensureCorrectUser, async function(req, res, next) {
        try {
            let deletedComment = await db.Comment.findByIdAndRemove(req.params.commentId);
            return res.status(200).json({});
        } catch(err) {
            return next(err);
        }
    });

module.exports = router;