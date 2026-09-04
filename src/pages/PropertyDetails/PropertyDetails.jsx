import "./PropertyDetails.css";
import { FaArrowLeft, FaWifi, FaSwimmingPool, FaParking, FaStar, FaHeart, FaShare, FaCheckCircle } from "react-icons/fa";
import { MdOutlineBedroomParent, MdOutlineFreeBreakfast } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ALL_PROPERTIES from "../../data/properties";

const amenityIcons = {
  "Private Pool": <FaSwimmingPool />,
  "Free WiFi": <FaWifi />,
  "Free Parking": <FaParking />,
  "Breakfast Included": <MdOutlineFreeBreakfast />,
  "Air Conditioning": "❄️",
  "BBQ Grill": "🔥",
  "Smart TV": "📺",
  "Fully Equipped Kitchen": "🍳",
  "Washing Machine": "🫧",
  "City View": "🏙️",
  "Spa & Wellness": "💆",
  "Restaurant On-Site": "🍽️",
  "Swimming Pool": <FaSwimmingPool />,
  "Room Service": "🛎️",
  "Gym": "🏋️",
  "Mountain View": "🏔️",
  "Bonfire Area": "🔥",
  "Hiking Trails": "🥾",
  "Hot Shower": "🚿",
  "Luxury Rooms": <MdOutlineBedroomParent />,
  "Ocean View": "🌊",
};

const reviewsByProperty = [
  { avatar: "R", name: "Rahul Sharma", date: "August 2026", text: "Amazing stay. Clean rooms, beautiful view and excellent hospitality. Will definitely come back!" },
  { avatar: "P", name: "Priya Menon", date: "July 2026", text: "One of the best vacation properties I have ever stayed in. Absolutely stunning!" },
  { avatar: "A", name: "Aryan Kapoor", date: "June 2026", text: "The host was incredibly responsive and the property exceeded all expectations." },
  { avatar: "S", name: "Sneha Iyer", date: "May 2026", text: "Perfect getaway! The view is unmatched. We're already planning our next visit." },
];

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);
  const [shareMsg, setShareMsg] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const property = ALL_PROPERTIES.find((p) => p.id === parseInt(id));

  if (!property) {
    return (
      <div className="property-not-found">
        <div style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: 64 }}>🏚️</div>
          <h1 style={{ marginTop: 16 }}>Property Not Found</h1>
          <p style={{ color: "#6b7280", marginTop: 8 }}>This property may have been removed or doesn't exist.</p>
          <button onClick={() => navigate("/")} style={{ marginTop: 24, padding: "12px 28px", background: "#2f3a2f", color: "white", border: "none", borderRadius: 12, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const serviceFee = 499;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: property.title, url }); } catch (_) {}
    } else {
      navigator.clipboard.writeText(url);
      setShareMsg("Link copied!");
      setTimeout(() => setShareMsg(""), 2000);
    }
  };

  return (
    <div className="property-page">
      {/* Image Lightbox */}
      {selectedImg && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setSelectedImg(null)}
        >
          <img src={selectedImg} alt="" style={{ maxWidth: "90vw", maxHeight: "90vh", borderRadius: 12, objectFit: "contain" }} />
          <button
            style={{ position: "absolute", top: 24, right: 24, background: "rgba(255,255,255,0.15)", border: "none", color: "white", borderRadius: "50%", width: 44, height: 44, fontSize: 22, cursor: "pointer" }}
            onClick={() => setSelectedImg(null)}
          >✕</button>
        </div>
      )}

      {/* Mini Nav */}
      <nav className="property-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>
        <span className="property-nav-logo" onClick={() => navigate("/")}>Homely</span>
        <div className="property-nav-actions">
          <button className="share-btn" onClick={handleShare}>
            <FaShare /> {shareMsg || "Share"}
          </button>
          <button
            className={`save-btn ${isFav ? "saved" : ""}`}
            onClick={() => setIsFav(!isFav)}
          >
            <FaHeart /> {isFav ? "Saved" : "Save"}
          </button>
        </div>
      </nav>

      <div className="property-inner">
        {/* Header */}
        <div className="property-header">
          <h1>{property.title}</h1>
          <div className="property-meta">
            <span className="meta-rating"><FaStar /> {property.rating}</span>
            <span className="meta-dot">·</span>
            <span className="meta-reviews">{property.reviews} reviews</span>
            <span className="meta-dot">·</span>
            <span className="meta-location">📍 {property.location}, India</span>
            <span className="meta-dot">·</span>
            <span className="meta-fav">⭐ Guest Favorite</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="property-gallery">
          <div className="gallery-main" onClick={() => setSelectedImg(property.images[0])} style={{ cursor: "zoom-in" }}>
            <img src={property.images[0]} alt={property.title} />
          </div>
          <div className="gallery-grid">
            {property.images.slice(1, 5).map((img, i) => (
              <div key={i} className="gallery-thumb" onClick={() => setSelectedImg(img)} style={{ cursor: "zoom-in" }}>
                <img src={img} alt="" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="property-content">
          <div className="property-info">
            {/* Host */}
            <div className="host-box">
              <div className="host-avatar">{property.host[0]}</div>
              <div>
                <h3>Hosted by {property.host}</h3>
                <p>Host since {property.hostSince} · Entire {property.category.slice(0, -1)} · Verified Host</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="highlights">
              {property.highlights.map((h, i) => (
                <div className="highlight-card" key={i}>{h.icon}<span>{h.label}</span></div>
              ))}
            </div>

            {/* About */}
            <div className="about">
              <h2>About this stay</h2>
              <p>{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="amenities">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {property.amenities.map((amenity, i) => (
                  <div className="amenity" key={i}>
                    <span>{amenityIcons[amenity] || <FaCheckCircle />}</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section">
              <h2><FaStar /> {property.rating} · {property.reviews} reviews</h2>
              <div className="reviews-grid">
                {reviewsByProperty.map((r, i) => (
                  <div className="review-card" key={i}>
                    <div className="reviewer-avatar">{r.avatar}</div>
                    <div>
                      <h4>{r.name}</h4>
                      <p className="review-date">{r.date}</p>
                      <p>{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="booking-card">
            <div className="booking-price">
              <span className="price-amount">{property.price}</span>
              <span className="price-night">/ night</span>
            </div>

            <div className="booking-rating">
              <FaStar /> {property.rating} · {property.reviews} reviews
            </div>

            <div className="booking-features">
              <div className="booking-feature">✓ Free Cancellation</div>
              <div className="booking-feature">✓ Instant Confirmation</div>
              <div className="booking-feature">✓ Secure Payments</div>
            </div>

            <div className="booking-price-breakdown">
              <div className="price-row">
                <span>{property.price} × 1 night</span>
                <span>{property.price}</span>
              </div>
              <div className="price-row">
                <span>Service fee</span>
                <span>₹{serviceFee}</span>
              </div>
              <div className="price-row total-row">
                <span>Total</span>
                <span>₹{(property.priceNum + serviceFee).toLocaleString()}</span>
              </div>
            </div>

            <button
              className="reserve-btn"
              onClick={() => navigate(`/booking/${id}`)}
            >
              Reserve Now
            </button>

            <p className="no-charge-note">You won't be charged yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;