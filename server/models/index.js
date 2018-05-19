const mongoose = require("mongoose");

mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost/pin-clone", {
    keepAlive : true
});

module.exports.User = require("./user");
module.exports.Post = require("./post");
module.exports.Comment = require("./comment");