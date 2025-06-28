import SmallBTN from "./SmallBTN";

export default function BookTicketBtn() {
  const styles = {
    borderRadius: "10px",
    height: "56px",
    padding: "20px 50px",
    backgroundColor: "#f9ab00",
    fontSize: "20px",
    fontWeight: "700",
    cursor: "pointer",
  };
  return <SmallBTN otherStyles={styles} TextForButton="➜ Book Ticket" />;
}
