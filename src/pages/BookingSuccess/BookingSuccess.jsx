import "./BookingSuccess.css";
import { FaCheckCircle } from "react-icons/fa";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const booking = location.state;

  // If user directly opens /booking-success
  if (!booking) {
    return (
      <div className="success-page">
        <div className="success-card">

          <h1>No Booking Found</h1>

          <p>
            Please make a booking first.
          </p>

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Booking Confirmed</h1>

        <p>
          Your stay has been successfully booked.
        </p>

        <div className="booking-details">

          <div className="detail-row">
            <span>Property</span>
            <strong>{booking.property}</strong>
          </div>

          <div className="detail-row">
            <span>Location</span>
            <strong>{booking.location}</strong>
          </div>

          <div className="detail-row">
            <span>Check In</span>
            <strong>{booking.checkIn}</strong>
          </div>

          <div className="detail-row">
            <span>Check Out</span>
            <strong>{booking.checkOut}</strong>
          </div>

          <div className="detail-row">
            <span>Guests</span>
            <strong>{booking.guests}</strong>
          </div>

          <div className="detail-row">
            <span>Total Paid</span>
            <strong>₹{booking.total}</strong>
          </div>

        </div>

        <div className="booking-id">
          Booking ID: <strong>{booking.bookingId}</strong>
        </div>

        <button
          className="home-btn"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>

      </div>

    </div>
  );
}

export default BookingSuccess;