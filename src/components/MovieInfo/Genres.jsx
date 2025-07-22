import styles from './Genres.module.css';
import SmallBTN from "../Buttons/SmallBTN";
export default function Genres({ genres }) {
  return (
    <div className={styles.genres}>
      {genres.map((genre, index) => (
        <SmallBTN key={index} TextForButton={genre} />
      ))}
    </div>
  );
}
