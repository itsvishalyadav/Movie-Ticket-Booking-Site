import TrailerBtn from "./TrailerBtn";
import BookTicketBtn from "./BookTicketBtn";
import styles from "./Trailer+Book-BTN.module.css";

export default function TrailerBookBtn({ trailer, onMoreInfo }) {
  return (
    <div className={styles.TrailerBookBtn}>
      <div className={styles["TrailerBookBtn__buttons"]}>
        <TrailerBtn trailer={trailer} />
        <BookTicketBtn />
      </div>
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onMoreInfo && onMoreInfo();
        }}
      >
        More Info...
      </a>
    </div>
  );
}
