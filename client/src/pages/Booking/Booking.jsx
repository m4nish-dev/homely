import "./Booking.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar, FaShieldAlt, FaHome, FaMapMarkerAlt, FaCheck, FaLock } from "react-icons/fa";
import propertyService from "../../api/propertyService";
import bookingService from "../../api/bookingService";
import paymentService from "../../api/paymentService";
import { useAuth } from "../../context/AuthContext";

// Dynamic script loader utility for the Razorpay SDK
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await propertyService.getById(id);
        setProperty(data.property);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="booking-page">
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
          <h2>Preparing booking gateway...</h2>
        </div>
      </div>
    );
  }

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
  const total = property.price * nights + serviceFee;

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

  const handleBooking = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    
    if (!user) {
      alert("Please login or create an account to finalize your booking.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Inject the Razorpay Script into the DOM
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay payment gateway failed to load. Please check your connection.");
      }

      // 2. Initialize the Booking in MongoDB via a Session Transaction
      const bookingData = await bookingService.create({
        property: property._id,
        checkIn,
        checkOut,
        guests: { adults: guests, children: 0, infants: 0 },
        guestDetails: { name, email },
        specialRequests: ""
      });

      const backendBookingId = bookingData.booking._id;

      // 3. Request a secure Order Token from Razorpay via the Backend
      const orderData = await paymentService.createOrder(backendBookingId);

      // 4. Mount the Razorpay Checkout Modal UI
      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Homely",
        description: `Booking for ${property.title}`,
        order_id: orderData.orderId,
        handler: async function (response) {
          try {
            // 5. Pass the Razorpay signature back to the server for cryptographic validation
            await paymentService.verify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // 6. Signature cleared! Route user to success screen
            navigate("/booking-success", {
              state: { 
                property: property.title, 
                location: `${property.location?.city || property.location?.address}, India`, 
                checkIn, 
                checkOut, 
                guests, 
                total, 
                bookingId: backendBookingId, 
                name, 
                email 
              },
            });
          } catch (verifyError) {
            console.error("Payment Verification Failed", verifyError);
            alert("Payment was processed, but the cryptographic signature failed to verify. Please contact support.");
          }
        },
        prefill: { name, email },
        theme: { color: "#2f3a2f" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        alert("Payment Gateway Error: " + response.error.description);
      });
      
      rzp.open();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || err.message || "Failed to initialize the booking.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="booking-page">
      <nav className="booking-nav">
        <button className="booking-back-btn" onClick={() => navigate(`/property/${id}`)}>
          <FaArrowLeft /> Back
        </button>
        <span className="booking-logo" onClick={() => navigate("/")}>Homely</span>
        <div className="booking-secure"><FaShieldAlt /> Secure Checkout</div>
      </nav>

      <div className="booking-inner">
        <h1>Confirm &amp; Book</h1>

        <div className="booking-layout">
          {/* Form */}
          <div className="booking-form">
            <div className="property-summary">
              <img src={property.images && property.images.length > 0 ? property.images[0].url : ""} alt={property.title} />
              <div className="property-summary-info">
                <h3>{property.title}</h3>
                <p className="summary-location"><FaMapMarkerAlt /> {property.location?.city || property.location?.address}, India</p>
                <div className="summary-rating">
                  <FaStar /> {property.rating || "New"} · {property.reviewCount || 0} reviews
                </div>
                {property.isFeatured && <span className="booking-tag"><FaStar color="#d89b4a" /> Guest Favorite</span>}
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
                <button type="button" onClick={() => guests < (property.maxGuests || 10) && setGuests(guests + 1)}>+</button>
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
              <span>₹{property.price?.toLocaleString()} × {nights} night{nights > 1 ? "s" : ""}</span>
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

            <button className="book-btn" onClick={handleBooking} disabled={isProcessing}>
              {isProcessing ? "Processing Secure Payment..." : "Pay with Razorpay"}
            </button>

            <div style={{ background: "#eef2ff", padding: "12px", borderRadius: "8px", marginTop: "16px", border: "1px solid #c7d2fe", fontSize: "13px", color: "#4f46e5", textAlign: "left" }}>
              <strong>🧪 Test Mode Active:</strong> No real money will be charged.
              <br />Use Card: <b>4111 1111 1111 1111</b>
              <br />Expiry: Any future date (e.g., <b>12/28</b>)
              <br />CVV: Any 3 digits (e.g., <b>123</b>)
            </div>

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