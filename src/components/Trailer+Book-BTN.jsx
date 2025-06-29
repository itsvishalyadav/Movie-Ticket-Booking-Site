import TrailerBtn from "./TrailerBtn";
import BookTicketBtn from "./BookTicketBtn";
import "./Trailer+Book-BTN.css";

export default function TrailerBookBtn() {

  return (
    <>
      <div className="TrailerBookBtn">
        <TrailerBtn />
        <BookTicketBtn />
        <a href="#">More Info...</a>
      </div>
    </>
  );
}
