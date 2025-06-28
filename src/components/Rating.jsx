import imdbLogo from "../assets/imdb.svg";
import rtLogo from "../assets/Rotten_Tomatoes.svg";
import heartLogo from "../assets/red-heart-icon.svg";
export default function Rating({ ratings }) {
  let styles = {
    fontSize: "20px",
    fontWeight: "900",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "20px",
    gap:"5px"
  };
  return (
    <div style={styles}>
      <div style={styles}>
        <img height="30px" src={imdbLogo} alt="imdb" />
        <span> : {ratings.imdbRating}/10</span>
      </div>
      <div style={styles}>
        <img height="30px" src={rtLogo} alt="rotten tomatoes" />
        <span> : {ratings.rtRating}%</span>
      </div>
      <div style={styles}>
        <img height="30px" src={heartLogo} alt="google users" />
        <span> : {ratings.googleLikes}% Liked it</span>
      </div>
    </div>
  );
}
