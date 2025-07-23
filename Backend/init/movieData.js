// const API_KEY = "?api_key=9eec713ccd6e293c48c3085825d25d7e";
// const BASE_URL = "https://api.themoviedb.org/3";
// const MOVIE_BASE_URL = BASE_URL + "/movie";
// const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
// const POSTER_URL = "https://image.tmdb.org/t/p/w500";

// const POPULAR_URL = MOVIE_BASE_URL + "/popular" + API_KEY;
// const TOP_RATED_URL = MOVIE_BASE_URL + "/top_rated" + API_KEY;
// const NOW_PLAYING_URL = MOVIE_BASE_URL + "/now_playing" + API_KEY;
// const UPCOMING_URL = MOVIE_BASE_URL + "/upcoming" + API_KEY;
// const TRENDING_URL = BASE_URL + "/trending/movie/week" + API_KEY;
// const CREDITS_URL = (id) => `${MOVIE_BASE_URL}/${id}/credits${API_KEY}`;

// //contain movie id and movie url
// function getMoviesUrl(url) {
//   return fetch(url)
//     .then((response) => response.json())
//     .then((data) =>
//       data.results.map((movie) => ({
//         id: movie.id,
//         MOVIE_URL: MOVIE_BASE_URL + "/" + movie.id + API_KEY,
//       }))
//     );
// }

// //contain movie cast and crew info
// function getMovieCredits(id) {
//   return fetch(CREDITS_URL(id))
//     .then((response) => response.json())
//     .then((data) => {
//       const director = data.crew.find((m) => m.job === "Director");
//       const producers = data.crew.filter((m) => m.job === "Producer");
//       const topCast = data.cast.slice(0, 15).map((actor) => ({
//         id: actor.id,
//         realName: actor.original_name,
//         character: actor.character,
//         profile: actor.profile_path ? POSTER_URL + actor.profile_path : null,
//         popularity: actor.popularity,
//         creditId: actor.credit_id,
//         gender: actor.gender,
//       }));
//       return {
//         director: director
//           ? {
//               id: director.id,
//               name: director.name,
//               profile: director.profile_path
//                 ? POSTER_URL + director.profile_path
//                 : null,
//               department: director.department,
//               gender: director.gender,
//               creditId: director.credit_id,
//             }
//           : null,
//         producers: producers.map((p) => ({
//           id: p.id,
//           name: p.name,
//           profile: p.profile_path ? POSTER_URL + p.profile_path : null,
//           department: p.department,
//           gender: p.gender,
//           creditId: p.credit_id,
//         })),
//         cast: topCast,
//       };
//     });
// }
// function getTrailer(id) {
//   return fetch(`${MOVIE_BASE_URL}/${id}/videos${API_KEY}`)
//     .then((response) => response.json())
//     .then((data) => {
//       const trailerObj = (data.results || []).find(
//         (video) =>
//           video.type === "Trailer" &&
//           video.site === "YouTube" &&
//           video.official === true
//       );
//       if (trailerObj) {
//         return `https://www.youtube.com/embed/${trailerObj.key}?autoplay=1`;
//       }
//       return null;
//     });
// }

// //gives an array containing all info about the movie
// async function getMovieDetails(url) {
//   const response = await fetch(url);
//   const movie = await response.json();  
//   const credits = await getMovieCredits(movie.id);
//   const trailer = await getTrailer(movie.id);
//   return {
//     id: movie.id,
//     title: movie.title,
//     poster: POSTER_URL + movie.poster_path,
//     bgImage: BACKDROP_URL + movie.backdrop_path,
//     bgImagePhone: POSTER_URL + movie.poster_path,
//     trailer : trailer,
//     ratings: {
//       imdbRating: movie.vote_average,
//       rtRating: 84,
//       googleLikes: 81,
//     },
//     country: movie.origin_country,
//     releaseDate: movie.release_date,
//     budget: movie.budget,
//     plot: movie.overview,
//     popularity: movie.popularity,
//     format: ["3D", "IMAX"],
//     genres: movie.genres.map((g) => g.name),
//     length: movie.runtime ? `${movie.runtime} Mins` : "N/A",
//     languages: Array.from(
//       new Set([
//         ...movie.spoken_languages.map((l) => l.name),
//         "English",
//         "Hindi",
//       ])
//     ),
//     year: new Date(movie.release_date).getFullYear(),
//     movieTile: POSTER_URL + movie.poster_path,
//     movieFirstName: movie.title.split(":")[0],
//     movieLastName: movie.title.split(":")[1]
//       ? movie.title.split(":")[1].trim()
//       : "",
//     director: credits.director,
//     producers: credits.producers,
//     cast: credits.cast,
//   };
// }

// // Search movies by query
// async function searchMovies(query) {
//   // return `${BASE_URL}/search/movie${API_KEY}&query=${encodeURIComponent(query)}`;
//   if (!query) return [];
//   const res = await fetch(
//     `${BASE_URL}/search/movie${API_KEY}&query=${encodeURIComponent(query)}`
//   );
//   const data = await res.json();
//   return data.results || [];
// }

// let detailedPopularMovies = [];
// let detailedTopRated = [];
// let detailedNowPlaying = [];
// let detailedUpcoming = [];
// let detailedTrending = [];

// const fetchAllMovies = async () => {
//       try {
//         //movies for hero slider
//         const popularMoviesData = await getMoviesUrl(POPULAR_URL);
//         detailedPopularMovies = await Promise.all(
//           popularMoviesData.slice(0, 10).map((m) => getMovieDetails(m.MOVIE_URL))
//         );

//         const topRatedData = await getMoviesUrl(TOP_RATED_URL);
//         detailedTopRated = await Promise.all(
//           topRatedData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
//         );

//         const nowPlayingData = await getMoviesUrl(NOW_PLAYING_URL);
//         detailedNowPlaying = await Promise.all(
//           nowPlayingData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
//         );

//         const upcomingData = await getMoviesUrl(UPCOMING_URL);
//         detailedUpcoming = await Promise.all(
//           upcomingData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
//         );

//         const trendingData = await getMoviesUrl(TRENDING_URL);
//         detailedTrending = await Promise.all(
//           trendingData.slice(0, 15).map((m) => getMovieDetails(m.MOVIE_URL))
//         );

//       } catch (error) {
//         console.error("Error fetching movies:", error);
//       }
//     };

//     fetchAllMovies();


import axios from 'axios';

// Constants remain the same
const API_KEY = "?api_key=9eec713ccd6e293c48c3085825d25d7e";
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_BASE_URL = BASE_URL + "/movie";
const BACKDROP_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";

const POPULAR_URL = MOVIE_BASE_URL + "/popular" + API_KEY;
const TOP_RATED_URL = MOVIE_BASE_URL + "/top_rated" + API_KEY;
const NOW_PLAYING_URL = MOVIE_BASE_URL + "/now_playing" + API_KEY;
const UPCOMING_URL = MOVIE_BASE_URL + "/upcoming" + API_KEY;
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

        console.log("Fetching Popular Movies...");
        detailedPopularMovies = await fetchAndProcessList(POPULAR_URL, 10);
        console.log("Fetching Top Rated Movies...");
        detailedTopRated = await fetchAndProcessList(TOP_RATED_URL, 15);
        
        console.log("Fetching Now Playing Movies...");
        detailedNowPlaying = await fetchAndProcessList(NOW_PLAYING_URL, 15);

        console.log("Fetching Upcoming Movies...");
        detailedUpcoming = await fetchAndProcessList(UPCOMING_URL, 15);

        console.log("Fetching Trending Movies...");
        detailedTrending = await fetchAndProcessList(TRENDING_URL, 15);

        console.log("✅ All movie data fetched successfully!");
        // console.log(detailedPopularMovies); // You can log the result to check

    } catch (error) {
        console.error("❌ An error occurred during the fetch process:", error.message);
    }
};

// Run the main function
fetchAllMovies();

// detailedPopularMovies = detailedPopularMovies.map(movie => ({
//   ...movie,
//   type: "popular"
// }));

// detailedTopRated = detailedTopRated.map(movie => ({
//   ...movie,
//   type: "top rated"
// }));

// detailedNowPlaying = detailedNowPlaying.map(movie => ({
//   ...movie,
//   type: "now playing"
// }));

// detailedUpcoming = detailedUpcoming.map(movie => ({
//   ...movie,
//   type: "upcoming"
// }));

// detailedTrending = detailedTrending.map(movie => ({
//   ...movie,
//   type: "trending"
// }));


