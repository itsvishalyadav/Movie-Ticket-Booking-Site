const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    movie : {
        type : Schema.Types.ObjectId,
        ref : "movie"
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    comment : {
        type : String
    },
    rating : {
        type : Number
    },
})

let Review = new mongoose.model("Review" , reviewSchema);

module.exports = Review;