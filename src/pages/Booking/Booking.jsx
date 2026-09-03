import "./Booking.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaShieldAlt } from "react-icons/fa";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const properties = {
    1: { title: "Luxury Villa", location: "Goa, India", rating: 4.9, reviews: 128, price: 5999, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
    2: { title: "Modern Flat", location: "Delhi, India", rating: 4.8, reviews: 94, price: 3499, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" },
    3: { title: "Beach Resort", location: "Kerala, India", rating: 4.7, reviews: 213, price: 7999, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" },
    4: { title: "Mountain Cabin", location: "Manali, India", rating: 4.9, reviews: 76, price: 4999, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
    5: { title: "Heritage Haveli", location: "Jaipur, India", rating: 4.8, reviews: 155, price: 6499, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80" },
    6: { title: "Lake View Suite", location: "Udaipur, India", rating: 4.9, reviews: 89, price: 8999, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80" },
  };

  const property = properties[id];
  const today = new Date().toISOString().split("T")[0];

  if (!property) {
    return (
      <div className="booking-page">
        <div className="booking-not-found">
          <h1>Property Not Found</h1>
          <button onClick={() => navigate("/")}>Back To Home</button>
        </div>
      </div>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
      : 1;

  const serviceFee = 499;
  const total = property.price * nights + serviceFee;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    if (!checkIn) e.checkIn = "Select check-in date.";
    if (!checkOut) e.checkOut = "Select check-out date.";
    return e;
  };

  const handleBooking = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    const bookingId = "HM" + Math.floor(100000 + Math.random() * 900000);
    navigate("/booking-success", {
      state: { property: property.title, location: property.location, checkIn, checkOut, guests, total, bookingId, name, email },
    });
  };

  return (
    <div className="booking-page">
      {/* Mini Nav */}
      <nav className="booking-nav">
        <button className="booking-back-btn" onClick={() => navigate(`/property/${id}`)}>
          <FaArrowLeft />
          Back
        </button>
        <span className="booking-logo" onClick={() => navigate("/")}>Homely</span>
        <div className="booking-secure">
          <FaShieldAlt /> Secure Checkout
        </div>
      </nav>

      <div className="booking-inner">
        <h1>Confirm & Book</h1>

        <div className="booking-layout">
          {/* Form */}
          <div className="booking-form">
            {/* Property Summary */}
            <div className="property-summary">
              <img src={property.image} alt={property.title} />
              <div className="property-summary-info">
                <h3>{property.title}</h3>
                <p className="summary-location">📍 {property.location}</p>
                <div className="summary-rating">
                  <FaStar /> {property.rating} · {property.reviews} reviews
                </div>
                <span className="booking-tag">⭐ Guest Favorite</span>
              </div>
            </div>

            <div className="form-section-title">Your Details</div>

            <div className="booking-row">
              <div className={`input-group ${errors.name ? "has-error" : ""}`}>
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: "" })); }}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              <div className={`input-group ${errors.email ? "has-error" : ""}`}>
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: "" })); }}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
            </div>

            <div className="form-section-title">Stay Details</div>

            <div className="booking-row">
              <div className={`input-group ${errors.checkIn ? "has-error" : ""}`}>
                <label>Check In</label>
                <input
                  type="date"
                  value={checkIn}
                  min={today}
                  onChange={(e) => { setCheckIn(e.target.value); setErrors((prev) => ({ ...prev, checkIn: "" })); }}
                />
                {errors.checkIn && <span className="field-error">{errors.checkIn}</span>}
              </div>
              <div className={`input-group ${errors.checkOut ? "has-error" : ""}`}>
                <label>Check Out</label>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || today}
                  onChange={(e) => { setCheckOut(e.target.value); setErrors((prev) => ({ ...prev, checkOut: "" })); }}
                />
                {errors.checkOut && <span className="field-error">{errors.checkOut}</span>}
              </div>
            </div>

            <div className="input-group">
              <label>Guests</label>
              <div className="guest-counter">
                <button onClick={() => guests > 1 && setGuests(guests - 1)}>−</button>
                <span>{guests}</span>
                <button onClick={() => setGuests(guests + 1)}>+</button>
              </div>
            </div>

            <div className="booking-policies">
              <div className="policy-item">✓ Free cancellation before check-in</div>
              <div className="policy-item">✓ Instant booking confirmation</div>
              <div className="policy-item">✓ Secure and encrypted payment</div>
            </div>
          </div>

          {/* Price Card */}
          <div className="price-card">
            <h2>Price Details</h2>

            <div className="price-detail-row">
              <span>₹{property.price.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span>
              <span>₹{(property.price * nights).toLocaleString()}</span>
            </div>

            <div className="price-detail-row">
              <span>Service fee</span>
              <span>₹{serviceFee}</span>
            </div>

            <div className="price-total-row">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>

            <button className="book-btn" onClick={handleBooking}>
              Book Now
            </button>

            <p className="booking-note">You'll be charged ₹{total.toLocaleString()} after confirming.</p>

            <div className="trust-badges">
              <div className="trust-badge">🔒 Secure Payment</div>
              <div className="trust-badge">✓ Verified Property</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;