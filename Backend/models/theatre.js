const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const theatreSchema = new Schema({
    name : {
        type : String
    },
    city : {
        type : String
    },
    location : {
        type : String
    },
    screens : [{
        type : Schema.Types.ObjectId,
        ref : "Screen"
    }]
})

const Theatre = new mongoose.model("Theatre" , theatreSchema);

module.exports = Theatre;