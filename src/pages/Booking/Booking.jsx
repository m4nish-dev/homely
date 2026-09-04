import "./Booking.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaShieldAlt, FaHome, FaMapMarkerAlt, FaCheck, FaLock } from "react-icons/fa";
import ALL_PROPERTIES from "../../data/properties";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const property = ALL_PROPERTIES.find((p) => p.id === parseInt(id));
  const today = new Date().toISOString().split("T")[0];

  if (!property) {
    return (
      <div className="booking-page">
        <div className="booking-not-found" style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 64, color: "#d89b4a", marginBottom: 16 }}><FaHome /></div>
          <h1>Property Not Found</h1>
          <p style={{ color: "#6b7280", margin: "8px 0 24px" }}>This property doesn't exist or was removed.</p>
          <button onClick={() => navigate("/")} style={{ padding: "12px 28px", background: "#2f3a2f", color: "white", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>
            Back To Home
          </button>
        </div>
      </div>
    );
  }

  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000))
      : 1;

  const serviceFee = 499;
  const total = property.priceNum * nights + serviceFee;

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!email.trim()) e.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email address.";
    if (!checkIn) e.checkIn = "Select check-in date.";
    if (!checkOut) e.checkOut = "Select check-out date.";
    else if (checkOut <= checkIn) e.checkOut = "Check-out must be after check-in.";
    return e;
  };

  const handleBooking = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }

    const bookingId = "HM" + Math.floor(100000 + Math.random() * 900000);
    navigate("/booking-success", {
      state: { property: property.title, location: `${property.location}, India`, checkIn, checkOut, guests, total, bookingId, name, email },
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
        <h1>Confirm &amp; Book</h1>

        <div className="booking-layout">
          {/* Form */}
          <div className="booking-form">
            {/* Property Summary */}
            <div className="property-summary">
              <img src={property.image} alt={property.title} />
              <div className="property-summary-info">
                <h3>{property.title}</h3>
                <p className="summary-location"><FaMapMarkerAlt /> {property.location}, India</p>
                <div className="summary-rating">
                  <FaStar /> {property.rating} · {property.reviews} reviews
                </div>
                <span className="booking-tag"><FaStar color="#d89b4a" /> Guest Favorite</span>
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
                <button type="button" onClick={() => guests > 1 && setGuests(guests - 1)}>−</button>
                <span>{guests}</span>
                <button type="button" onClick={() => setGuests(guests + 1)}>+</button>
              </div>
            </div>

            <div className="booking-policies">
              <div className="policy-item"><FaCheck color="#22c55e" /> Free cancellation before check-in</div>
              <div className="policy-item"><FaCheck color="#22c55e" /> Instant booking confirmation</div>
              <div className="policy-item"><FaCheck color="#22c55e" /> Secure and encrypted payment</div>
            </div>
          </div>

          {/* Price Card */}
          <div className="price-card">
            <h2>Price Details</h2>

            <div className="price-detail-row">
              <span>₹{property.priceNum.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span>
              <span>₹{(property.priceNum * nights).toLocaleString()}</span>
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
              <div className="trust-badge"><FaLock color="#6b7280" /> Secure Payment</div>
              <div className="trust-badge"><FaCheck color="#22c55e" /> Verified Property</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;