const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationCode : {
        type : Number,
        required : true
    },
    role : {
        type : String,
        default : "user"
    }
    //passportlocalmongoose automatically add username and password
    //to the userschema
});

userSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User" , userSchema);