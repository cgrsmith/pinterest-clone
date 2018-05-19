require("dotenv").config();
const express = require("express");
const app = express();
const parser = require("body-parser");

const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const commentRoutes = require("./routes/comments");

const PORT = process.env.PORT || 3001;

app.use(parser.json());

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);
app.use("/api/posts/:id/comments", commentRoutes);

//Error fallbacks
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    return res.status(err.status || 500).json({
        error : {
            message : err.message || "Oops, something went wrong."
        }
    });
});

app.listen(PORT, function() {
    console.log("Pinterest Clone running on PORT: " + PORT);
})