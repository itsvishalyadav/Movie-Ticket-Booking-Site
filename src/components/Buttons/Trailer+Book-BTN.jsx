import TrailerBtn from "./TrailerBtn";
import BookTicketBtn from "./BookTicketBtn";
import "./Trailer+Book-BTN.css";

export default function TrailerBookBtn({ onMoreInfo, onBookTicket }) {
  return (
    <div className="TrailerBookBtn">
      <div className="TrailerBookBtn__buttons">
        <TrailerBtn />
        <BookTicketBtn onBookTicket={onBookTicket} />
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
