const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    show : {
        type : Schema.Types.ObjectId,
        ref : "Show"
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    seats : {
        type : [Number]
    },
    time : {
        type : Number
    },
    price : {
        type : Number
    }
})

let Booking = new mongoose.model("Booking" , bookingSchema);

module.exports = Booking;