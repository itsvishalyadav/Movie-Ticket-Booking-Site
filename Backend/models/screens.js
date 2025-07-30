const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const screenSchema = new Schema({
    audi : {
        type : Number
    },
    seatTypes : [{
        name : String,
        price : Number
    }]
})

let Screen = new mongoose.model("Screen" , screenSchema);

module.exports = Screen;