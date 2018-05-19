const express = require("express");
const router = express.Router({mergeParams : true});


router
    .route("/")
    .get(async function(req, res, next) {
        try {
            return res.status(200).send({hi : "hi"});
        } catch(err) {
            return next(err);
        }
    })

module.exports = router;