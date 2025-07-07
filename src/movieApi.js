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
const CREDITS_URL = (id) => `${MOVIE_BASE_URL}/${id}/credits${API_KEY}`;

//contain movie id and movie url
function getMoviesUrl(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) =>
      data.results.map((movie) => ({
        id: movie.id,
        MOVIE_URL: MOVIE_BASE_URL + "/" + movie.id + API_KEY,
      }))
    );
}

//contain movie cast and crew info
function getMovieCredits(id) {
  return fetch(CREDITS_URL(id))
    .then((response) => response.json())
    .then((data) => {
      const director = data.crew.find((m) => m.job === "Director");
      const producers = data.crew.filter((m) => m.job === "Producer");
      const topCast = data.cast.slice(0, 15).map((actor) => ({
        id: actor.id,
        realName: actor.original_name,
        character: actor.character,
        profile: actor.profile_path ? POSTER_URL + actor.profile_path : null,
        popularity: actor.popularity,
        creditId: actor.credit_id,
        gender: actor.gender,
      }));
      return {
        director: director
          ? {
              id: director.id,
              name: director.name,
              profile: director.profile_path
                ? POSTER_URL + director.profile_path
                : null,
              department: director.department,
              gender: director.gender,
              creditId: director.credit_id,
            }
          : null,
        producers: producers.map((p) => ({
          id: p.id,
          name: p.name,
          profile: p.profile_path ? POSTER_URL + p.profile_path : null,
          department: p.department,
          gender: p.gender,
          creditId: p.credit_id,
        })),
        cast: topCast,
      };
    });
}

//gives an array containing all info about the movie
async function getMovieDetails(url) {
  const response = await fetch(url);
  const movie = await response.json();
  const credits = await getMovieCredits(movie.id);
  return {
    id: movie.id,
    title: movie.title,
    poster: POSTER_URL + movie.poster_path,
    bgImage: BACKDROP_URL + movie.backdrop_path,
    bgImagePhone: POSTER_URL + movie.poster_path,
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
      new Set([
        ...movie.spoken_languages.map((l) => l.name),
        "English",
        "Hindi",
      ])
    ),
    year: new Date(movie.release_date).getFullYear(),
    movieTile: POSTER_URL + movie.poster_path,
    movieFirstName: movie.title.split(":")[0],
    movieLastName: movie.title.split(":")[1]
      ? movie.title.split(":")[1].trim()
      : "",
    director: credits.director,
    producers: credits.producers,
    cast: credits.cast,
  };
}

// Search movies by query
async function searchMovies(query) {
  // return `${BASE_URL}/search/movie${API_KEY}&query=${encodeURIComponent(query)}`;
  if (!query) return [];
  const res = await fetch(
    `${BASE_URL}/search/movie${API_KEY}&query=${encodeURIComponent(query)}`
  );
  const data = await res.json();
  return data.results || [];
}

export { 
  POPULAR_URL, 
  TOP_RATED_URL, 
  NOW_PLAYING_URL, 
  UPCOMING_URL, 
  TRENDING_URL,
  getMoviesUrl, 
  getMovieDetails, 
  searchMovies 
};
