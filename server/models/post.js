const mongoose = require("mongoose");
const User = require("./user");

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

//If Post is deleted, remove it from the User model 
PostSchema.pre("remove", async function(next) {
    try {
        let user = await User.findById(this.user);
        user.comments.remove(this.id);
        await user.save();
        return next();
        
    } catch(err) {
        return next(err);
    }

});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;