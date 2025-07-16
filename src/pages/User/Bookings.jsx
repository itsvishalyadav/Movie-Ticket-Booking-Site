import {useEffect , useState} from "react"
import { useUser } from "../../contexts/userContext"
import Header from "../../components/Layout/Header";
import "./Bookings.css"
function formatShowDate(unix) {
  const d = new Date(unix * 1000);
  const day = d.toLocaleDateString("en-US", { weekday: "short" });
  const monthDay = d.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
  return `${day}, ${monthDay}`;
}
function formatTime(unix) {
  const date = new Date(unix * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';
  
  hours = hours % 12;
  if (hours === 0) hours = 12;
  
  return `${hours}.${minutes} ${ampm}`;
}
export default function Bookings(){
    const {user , loading} = useUser();
    const [bookings , setBookings] = useState([]);
    const [cancel , setCancel] = useState(false);
    const [cancelSeats , setCancelSeats] = useState([]);
    useEffect(() => {
        if(loading) return;
        const func = async () => {
            const data = await fetch(`http://localhost:8080/api/bookings/${user._id}`);
            const bookingData = await data.json();
            setBookings(bookingData);
        }
        func();
    } , [user])

    const handleCancel = (e) => {
        setCancel(!cancel);
        setCancelSeats(bookings[e.target.id].seats);
    }

    return(
       <>
        <div className={`booking-div ${cancel ? "bgBlur" : ""}`}>
            <Header></Header>
            <div className="booking-container">
                {bookings.map((booking , index) => (
                    <div className="booking-item">
                        <p>Movie : {booking.show.movie}</p>
                        <p>Theatre : {booking.show.theatre.name}</p>
                        <p>Location : {booking.show.theatre.location}</p>
                        <p>Start Time : {formatShowDate(booking.show.startTime)} , {formatTime(booking.show.startTime)}</p>
                        <p>Seats : </p>
                        <div className="booking-seat-container">
                            {booking.seats.map(seat => <div className="booking-seat">{seat}</div>)}
                        </div>
                        {booking.show.startTime - Math.floor(Date.now() / 1000) > 3600 && <button className="cancel-button" id = {`${index}`} onClick={handleCancel}>Cancel Seat</button>}
                        <p>Booking Time : {formatShowDate(booking.time)} , {formatTime(booking.time)}</p>
                    </div>
                ))}
            </div>
        </div>
        {cancel && <div className="cancel-seat-outer-div">
            <div className="cancel-seat-div">
                <p>Select seats to be cancelled : </p>
                <div className="booking-seat-container">
                    {cancelSeats.map(seat => <div className="booking-seat">{seat}</div>)}
                </div>
                <button className="cancel-button">Cancel Seat</button>
            </div>
            <div className="close-button" onClick = {() => {
                setCancel(false);
                setCancelSeats([]);
            }}>X</div>
        </div>}
        </>
    )
}