import BigBTN from "./BigBTN";

export default function BookTicketBtn({ onBookTicket }) {
  return (
    <BigBTN
      TextForButton="➜ Book Ticket"
      onClick={onBookTicket}
    />
  );
}
