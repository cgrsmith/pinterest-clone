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

//If password is modified/created, hash
UserSchema.pre("save", async function(next) {
    try {
        if(!this.isModified("password")) {
            return next;
        }
        this.password = await bcrypt.hash(this.password, 10);
    } catch(err) {
        return next(err);
    }
});

//Compare hashed passwords
UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        //implement bcrypt comparison
        return isMatch = await bcrypt.compare(candidatePassword, this.password);
    } catch(err) {
        return next(err);
    }
}


const User = mongoose.model("User", UserSchema);
module.exports = User;