import './Genres.css';
import SmallBTN from "./SmallBTN";
export default function Genres({ genres }) {
  return (
    <div className="genres">
      {genres.map((genre, index) => (
        <SmallBTN key={index} TextForButton={genre} />
      ))}
    </div>
  );
}
