const mongoose = require("mongoose");
const User = require("./user");
const Post = require("./post");

const CommentSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        maxLength : 140
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
}, {
    timestamps : true
});

//If Comment is deleted, remove it from the User model and Post Model
CommentSchema.pre("remove", async function(next) {
    try {
        console.log(1)
        let user = await User.findById(this.user);
        user.comments.remove(this.id);
        await user.save();

        let post = await Post.findById(this.post);
        post.comments.remove(this.id);
        await post.save();

        return next();
    } catch(err) {
        return next(err);
    }

});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;