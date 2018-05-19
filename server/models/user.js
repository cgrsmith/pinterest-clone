const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        maxLength : 100
    },
    username : {
        type : String,
        required : true,
        unique : true,
        maxLength : 100
    },
    profileText : {
        type : String,
        maxLength : 1000
    },
    password : {
        type : String,
        required : true
    },
    //off hosted images for time being
    profileImage : {
        type : String
    },
    posts : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }],
    comments : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]
},{
    timestamps : true
});

UserSchema.pre("save", async function(next) {
    try {
        //implement hash
    } catch(err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        //implement bcrypt comparison
        return isMatch = (candidatePassword === this.password);
    } catch(err) {
        return next(err);
    }
}


const User = mongoose.model("User", UserSchema);
module.exports = User;