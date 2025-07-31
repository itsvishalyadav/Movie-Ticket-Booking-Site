import TrailerBtn from "./TrailerBtn";
import BookTicketBtn from "./BookTicketBtn";
import styles from "./Trailer+Book-BTN.module.css";
import BigBTN from "./BigBTN";

export default function TrailerBookBtn({
  trailer,
  onMoreInfo,
  showBookButton,
}) {
  return (
    <div className={styles.TrailerBookBtn}>
      <div className={styles["TrailerBookBtn__buttons"]}>
        <TrailerBtn trailer={trailer} />
        {showBookButton ? <BookTicketBtn />:<BigBTN TextForButton={"Coming Soon..."}/>}
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
