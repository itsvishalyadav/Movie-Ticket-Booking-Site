
import { Link, useParams } from "react-router-dom";
import BigBTN from "./BigBTN";

export default function BookTicketBtn() {
  const { title } = useParams();

  return (
    <Link to={`/movie/${title}/booking`} style={{ textDecoration: 'none' }}>
      <BigBTN TextForButton="➜ Book Ticket" />
    </Link>
  );
}