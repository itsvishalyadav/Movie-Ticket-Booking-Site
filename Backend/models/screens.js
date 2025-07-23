const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenSchema = new Schema({
    audi : {
        type : Number
    },
    capacity : {
        type : Number,
        default : 100
    },
    // SeatMatrix : {

    // }
})

let Screen = new mongoose.model("Screen" , screenSchema);

module.exports = Screen;