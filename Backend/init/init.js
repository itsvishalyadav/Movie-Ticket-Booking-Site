const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const Theatre = require("../models/theatre.js");
const Screen = require("../models/screens.js");
const Show = require("../models/shows.js");
const User = require("../models/user.js");
const Movie = require("../models/movie.js");
const initData = require("./data.js");
const mongoUrl = process.env.MONGO_URL;
const axios = require("axios");
async function main(){
    await mongoose.connect(mongoUrl);
}
main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});
console.log(mongoUrl);


// Theatre.insertMany(initData.theatreData);
// const admin = async () => {
//   const user = await User.find({email : "piyushagrawal2293@gmail.com"});
//   user.role = "admin";
//   user.save();
// }

// admin();


// Show.insertMany(initData.showData); 


// Show.insertMany(initData.showData);

// let newScreen = new Screen({audi : 1 , capacity : 240});
// newScreen.save();

// Constants remain the same
const API_KEY = "?api_key=9eec713ccd6e293c48c3085825d25d7e";
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_BASE_URL = BASE_URL + "/movie";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";

const POPULAR_URL = MOVIE_BASE_URL + "/popular" + API_KEY;
const TOP_RATED_URL = MOVIE_BASE_URL + "/top_rated" + API_KEY;
const NOW_PLAYING_URL = MOVIE_BASE_URL + "/now_playing" + API_KEY;
const UPCOMING_URL = MOVIE_BASE_URL + "/upcoming" + API_KEY+"&page=4";
const TRENDING_URL = BASE_URL + "/trending/movie/week" + API_KEY;


// This function now uses axios
async function getMoviesUrl(url) {
  const response = await axios.get(url);
  return response.data.results.map((movie) => ({
    id: movie.id,
    MOVIE_URL: `${MOVIE_BASE_URL}/${movie.id}${API_KEY}`,
  }));
}

// This is the primary function, now using axios
async function getMovieDetailsOptimized(movieId) {
  const url = `${MOVIE_BASE_URL}/${movieId}${API_KEY}&append_to_response=credits,videos`;
  
  const response = await axios.get(url);
  const movie = response.data; // With axios, the response body is in the .data property

  // --- Process Credits ---
  const directorData = movie.credits.crew.find((m) => m.job === "Director");
  const director = directorData ? {
      id: directorData.id,
      name: directorData.name,
      profile: directorData.profile_path ? POSTER_URL + directorData.profile_path : null,
      department: directorData.department,
      gender: directorData.gender,
      creditId: directorData.credit_id,
    } : null;

  const producers = movie.credits.crew.filter((m) => m.job === "Producer").map((p) => ({
    id: p.id,
    name: p.name,
    profile: p.profile_path ? POSTER_URL + p.profile_path : null,
    department: p.department,
    gender: p.gender,
    creditId: p.credit_id,
  }));

  const cast = movie.credits.cast.slice(0, 15).map((actor) => ({
    id: actor.id,
    realName: actor.original_name,
    character: actor.character,
    profile: actor.profile_path ? POSTER_URL + actor.profile_path : null,
    popularity: actor.popularity,
    creditId: actor.credit_id,
    gender: actor.gender,
  }));
  
  // --- Process Trailer ---
  const trailerObj = (movie.videos.results || []).find(
    (video) => video.type === "Trailer" && video.site === "YouTube" && video.official === true
  );
  const trailer = trailerObj ? `https://www.youtube.com/watch?v=${trailerObj.key}` : null;
  
  // --- Construct Final Object ---
  return {
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path ? POSTER_URL + movie.poster_path : null,
    bgImage: movie.backdrop_path ? BACKDROP_URL + movie.backdrop_path : null,
    bgImagePhone: movie.poster_path ? POSTER_URL + movie.poster_path : null,
    trailer: trailer,
    ratings: {
      imdbRating: movie.vote_average,
      rtRating: 84,
      googleLikes: 81,
    },
    country: movie.origin_country,
    releaseDate: movie.release_date,
    budget: movie.budget,
    plot: movie.overview,
    popularity: movie.popularity,
    format: ["3D", "IMAX"],
    genres: movie.genres.map((g) => g.name),
    length: movie.runtime ? `${movie.runtime} Mins` : "N/A",
    languages: Array.from(
      new Set([...movie.spoken_languages.map((l) => l.name), "English", "Hindi"])
    ),
    year: movie.release_date ? new Date(movie.release_date).getFullYear() : null,
    movieTile: movie.poster_path ? POSTER_URL + movie.poster_path : null,
    movieFirstName: movie.title.split(":")[0],
    movieLastName: movie.title.split(":")[1] ? movie.title.split(":")[1].trim() : "",
    director: director,
    producers: producers,
    cast: cast,
  };
}

// Search function updated to use axios
async function searchMovies(query) {
  if (!query) return [];
  const url = `${BASE_URL}/search/movie${API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  return response.data.results || [];
}

// Global variables
let detailedPopularMovies = [];
let detailedTopRated = [];
let detailedNowPlaying = [];
let detailedUpcoming = [];
let detailedTrending = [];

// Main execution function, no changes needed here but it now relies on the axios functions
const fetchAllMovies = async () => {
    console.log("🚀 Starting to fetch all movie data using axios...");
    try {
        const fetchAndProcessList = async (url, limit) => {
            const moviesList = await getMoviesUrl(url);
            const detailedMovies = [];
            for (const movie of moviesList.slice(0, limit)) {
                const details = await getMovieDetailsOptimized(movie.id);
                detailedMovies.push(details);
                // A small delay to be safe with the API rate limits
                await new Promise(resolve => setTimeout(resolve, 50)); 
            }
            return detailedMovies;
        };

        // console.log("Fetching Popular Movies...");
        // detailedPopularMovies = await fetchAndProcessList(POPULAR_URL, 30);
        // console.log("Fetching Top Rated Movies...");
        // detailedTopRated = await fetchAndProcessList(TOP_RATED_URL, 30);
        
        // console.log("Fetching Now Playing Movies...");
        // detailedNowPlaying = await fetchAndProcessList(NOW_PLAYING_URL, 30);

        console.log("Fetching Upcoming Movies...");
        detailedUpcoming = await fetchAndProcessList(UPCOMING_URL, 30);

        // console.log("Fetching Trending Movies...");
        // detailedTrending = await fetchAndProcessList(TRENDING_URL, 30);

        // console.log("✅ All movie data fetched successfully!");
        // console.log(detailedPopularMovies); // You can log the result to check
        // for(let movie of detailedNowPlaying){
        //     if(await Movie.findOne({ title: movie.title, releaseDate: movie.releaseDate })){

        //     }
        //     else{
        //         await Movie.insertMany([movie]);
        //     }
        // }

        // for(let movie of detailedPopularMovies){
        //     if(await Movie.findOne({ title: movie.title, releaseDate: movie.releaseDate })){

        //     }
        //     else{
        //         await Movie.insertMany([movie]);
        //     }
        // }

        // for(let movie of detailedTopRated){
        //     if(await Movie.findOne({ title: movie.title, releaseDate: movie.releaseDate })){

        //     }
        //     else{
        //         await Movie.insertMany([movie]);
        //     }
        // }

        for(let movie of detailedUpcoming){
            if(await Movie.findOne({ title: movie.title, releaseDate: movie.releaseDate })){

            }
            else{
                await Movie.insertMany([movie]);
            }
        }

        // for(let movie of detailedTrending){
        //     if(await Movie.findOne({ title: movie.title, releaseDate: movie.releaseDate })){

        //     }
        //     else{
        //         await Movie.insertMany([movie]);
        //     }
        // }

       

    } catch (error) {
        console.error("❌ An error occurred during the fetch process:", error.message);
    }
};

// Run the main function
fetchAllMovies();


