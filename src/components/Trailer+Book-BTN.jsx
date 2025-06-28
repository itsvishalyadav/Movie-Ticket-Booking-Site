import SmallBTN from "./SmallBTN";

export default function TrailerBookBtn() {
  let styles = {
    borderRadius: "10px",
    height: "56px",
    padding: "20px 50px",
    backgroundColor: " #f9ab00",
    fontSize: "20px",
    fontWeight: "700",
  };
  let divStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "30px",
    marginTop:"20px"
  };
  return (
    <div style={divStyles}>
      <SmallBTN otherStyles={styles} TextForButton="▶ Watch Trailer" />
      <SmallBTN otherStyles={styles} TextForButton="➜ Book Ticket" />
      <a href="#">More Info...</a>
    </div>
  );
}
