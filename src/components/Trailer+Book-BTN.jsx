import TrailerBtn from "./TrailerBtn";
import BookTicketBtn from "./BookTicketBtn";
import "./Trailer+Book-BTN.css";

export default function TrailerBookBtn() {
  return (
    <>
      <div className="TrailerBookBtn">
        <div className="TrailerBookBtn__buttons">
          <TrailerBtn />
          <BookTicketBtn />
        </div>
        <a href="#">More Info...</a>
      </div>
    </>
  );
}
