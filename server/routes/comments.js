const express = require("express");
const router = express.Router({mergeParams : true});

const db = require("../models/index");

router
    .route("/")
    .get(async function(req, res, next) {
        try {
            return res.status(200).send({hi : req.params.id});
        } catch(err) {
            return next(err);
        }
    })

module.exports = router;