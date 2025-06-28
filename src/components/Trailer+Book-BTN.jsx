import TrailerBtn from "./TrailerBtn";
import BookTicketBtn from "./BookTicketBtn";

export default function TrailerBookBtn() {
  const divStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginTop: "20px",
  };

  return (
    <>
      <div style={divStyles}>
        <TrailerBtn />
        <BookTicketBtn />
        <a href="#">More Info...</a>
      </div>
    </>
  );
}
