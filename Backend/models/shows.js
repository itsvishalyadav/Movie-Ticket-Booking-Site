const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
    movie : {
        type : Schema.Types.ObjectId,
        ref : "Movie"
    },
    theatre : {
        type : Schema.Types.ObjectId,
        ref : "Theatre"
    },
    screen : {
        type : Schema.Types.ObjectId,
        ref : "Screen"
    },
    startTime : {
        type : Number
    },
    bookedSeats : {
        type : [Number],
        default : []
    },
})

let Show = new mongoose.model("Show" , showSchema);

module.exports = Show;