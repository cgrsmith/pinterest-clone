const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    image : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true,
        maxLength : 100
    },
    description : {
        type : String,
        maxLength : 1000
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true
    },
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]
}, {
    timestamps : true
});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;