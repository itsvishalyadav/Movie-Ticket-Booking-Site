const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    bgImage : {
        type : String
    },
    bgImagePhone : {
        type : String
    },
    cast : {
        type : [{
            character : {
                type : String
            },
            gender : {
                type : String
            },
            popularity : {
                type : Number
            },
            profile : {
                type : String
            },
            realName : {
                type : String
            }
        }]
    },
    country : {
        type : [String]
    },
    director : {
        type : {
            name : {
                type : String
            }
        }
    },
    format : {
        type : [String]
    },
    genres : {
        type : [String]
    },
    languages : {
        type : [String]
    },
    length : {
        type : String
    },
    movieFirstName : {
        type : String
    },
    movieLastName : {
        type : String
    },
    movieTile : {
        type : String
    },
    plot : {
        type : String
    },
    popularity : {
        type : Number
    },
    poster : {
        type : String
    },
    ratings : {
        type : {
            googleLikes : {
                type : Number
            },
            imdbRating : {
                type : Number
            },
            rtRating : {
                type : Number
            }
        }
    },
    releaseDate : {
        type : String
    },
    title : {
        type : String
    },
    trailer : {
        type : String
    },
    year : {
        type : Number
    }
})

let Movie = new mongoose.model("Movie" , movieSchema);

module.exports = Movie;