import "./Booking.css";
import { useState } from "react";
import {
  useParams,
  useNavigate,
} from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const properties = {
    1: {
      title: "Luxury Villa",
      location: "Goa",
      price: 5999,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
    },

    2: {
      title: "Modern Flat",
      location: "Delhi",
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
    },

    3: {
      title: "Beach Resort",
      location: "Kerala",
      price: 7999,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
    },

    4: {
      title: "Mountain Cabin",
      location: "Manali",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    },
  };

  const property = properties[id];

  if (!property) {
    return (
      <div className="booking-page">
        <h1>Property Not Found</h1>

        <button
          className="book-btn"
          onClick={() => navigate("/")}
        >
          Back To Home
        </button>
      </div>
    );
  }

  const serviceFee = 499;
  const total = property.price + serviceFee;

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      alert(
        "Please select both Check-in and Check-out dates."
      );
      return;
    }

    const bookingId =
      "HM" +
      Math.floor(
        100000 + Math.random() * 900000
      );

    navigate("/booking-success", {
      state: {
        property: property.title,
        location: property.location,
        checkIn,
        checkOut,
        guests,
        total,
        bookingId,
      },
    });
  };

  return (
    <div className="booking-page">

      <button
        className="booking-back-btn"
        onClick={() =>
          navigate(`/property/${id}`)
        }
      >
        <FaArrowLeft />
        Back
      </button>

      <h1>Confirm & Book</h1>

      <div className="booking-layout">

        <div className="booking-form">

          <div className="property-summary">

            <img
              src={property.image}
              alt={property.title}
            />

            <div>

              <h3>{property.title}</h3>

              <p>{property.location}</p>

              <span className="booking-tag">
                Guest Favorite
              </span>

            </div>

          </div>

          <div className="input-group">

            <label>Check In</label>

            <input
              type="date"
              value={checkIn}
              onChange={(e) =>
                setCheckIn(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Check Out</label>

            <input
              type="date"
              value={checkOut}
              onChange={(e) =>
                setCheckOut(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Guests</label>

            <div className="guest-counter">

              <button
                onClick={() =>
                  guests > 1 &&
                  setGuests(guests - 1)
                }
              >
                −
              </button>

              <span>{guests}</span>

              <button
                onClick={() =>
                  setGuests(guests + 1)
                }
              >
                +
              </button>

            </div>

          </div>

        </div>

        <div className="price-card">

          <h2>Price Details</h2>

          <div className="price-row">
            <span>Stay Price</span>
            <span>₹{property.price}</span>
          </div>

          <div className="price-row">
            <span>Service Fee</span>
            <span>₹{serviceFee}</span>
          </div>

          <hr />

          <div className="price-row total">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <div className="booking-id-preview">
            Booking ID will be generated automatically
          </div>

          <button
            className="book-btn"
            onClick={handleBooking}
          >
            Book Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default Booking;