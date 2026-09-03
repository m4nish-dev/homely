import "./PropertyDetails.css";
import { FaArrowLeft, FaWifi, FaSwimmingPool, FaParking, FaStar, FaHeart, FaShare } from "react-icons/fa";
import { MdOutlineBedroomParent, MdOutlineFreeBreakfast } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFav, setIsFav] = useState(false);

  const properties = {
    1: {
      title: "Luxury Villa",
      location: "Goa, India",
      rating: 4.9,
      reviews: 128,
      price: "₹5,999",
      priceNum: 5999,
      host: "Priya Sharma",
      hostSince: "2019",
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      ],
    },
    2: {
      title: "Modern Flat",
      location: "Delhi, India",
      rating: 4.8,
      reviews: 94,
      price: "₹3,499",
      priceNum: 3499,
      host: "Arjun Mehta",
      hostSince: "2021",
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
      ],
    },
    3: {
      title: "Beach Resort",
      location: "Kerala, India",
      rating: 4.7,
      reviews: 213,
      price: "₹7,999",
      priceNum: 7999,
      host: "Ananya Nair",
      hostSince: "2018",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      ],
    },
    4: {
      title: "Mountain Cabin",
      location: "Manali, India",
      rating: 4.9,
      reviews: 76,
      price: "₹4,999",
      priceNum: 4999,
      host: "Vikram Singh",
      hostSince: "2020",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
      ],
    },
    5: {
      title: "Heritage Haveli",
      location: "Jaipur, India",
      rating: 4.8,
      reviews: 155,
      price: "₹6,499",
      priceNum: 6499,
      host: "Rajesh Kumar",
      hostSince: "2017",
      images: [
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
        "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      ],
    },
    6: {
      title: "Lake View Suite",
      location: "Udaipur, India",
      rating: 4.9,
      reviews: 89,
      price: "₹8,999",
      priceNum: 8999,
      host: "Meera Patel",
      hostSince: "2020",
      images: [
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
      ],
    },
  };

  const property = properties[id];
  if (!property) {
    return (
      <div className="property-not-found">
        <h1>Property Not Found</h1>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  const serviceFee = 499;

  return (
    <div className="property-page">
      {/* Mini Nav */}
      <nav className="property-nav">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft />
          Back
        </button>
        <span className="property-nav-logo" onClick={() => navigate("/")}>Homely</span>
        <div className="property-nav-actions">
          <button className="share-btn"><FaShare /> Share</button>
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
            <span className="meta-location">📍 {property.location}</span>
            <span className="meta-dot">·</span>
            <span className="meta-fav">⭐ Guest Favorite</span>
          </div>
        </div>

        {/* Gallery */}
        <div className="property-gallery">
          <div className="gallery-main">
            <img src={property.images[0]} alt={property.title} />
          </div>
          <div className="gallery-grid">
            {property.images.slice(1, 5).map((img, i) => (
              <div key={i} className="gallery-thumb">
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
                <p>Host since {property.hostSince} · Entire Villa · 3 Bedrooms · 2 Bathrooms · 6 Guests</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="highlights">
              <div className="highlight-card">🛏️<span>3 Bedrooms</span></div>
              <div className="highlight-card">👥<span>6 Guests</span></div>
              <div className="highlight-card">🛁<span>2 Bathrooms</span></div>
              <div className="highlight-card">🌊<span>Sea View</span></div>
            </div>

            {/* About */}
            <div className="about">
              <h2>About this stay</h2>
              <p>
                Experience luxury living with premium amenities, private pool, elegant interiors and breathtaking
                views. Perfect for families, couples and groups looking for a memorable vacation.
                Every detail is curated to give you an unforgettable stay.
              </p>
            </div>

            {/* Amenities */}
            <div className="amenities">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                <div className="amenity"><FaSwimmingPool /><span>Private Pool</span></div>
                <div className="amenity"><FaWifi /><span>Free WiFi</span></div>
                <div className="amenity"><FaParking /><span>Free Parking</span></div>
                <div className="amenity"><MdOutlineFreeBreakfast /><span>Breakfast Included</span></div>
                <div className="amenity"><MdOutlineBedroomParent /><span>Luxury Rooms</span></div>
              </div>
            </div>

            {/* Reviews */}
            <div className="reviews-section">
              <h2><FaStar /> {property.rating} · {property.reviews} reviews</h2>
              <div className="reviews-grid">
                <div className="review-card">
                  <div className="reviewer-avatar">R</div>
                  <div>
                    <h4>Rahul Sharma</h4>
                    <p className="review-date">August 2026</p>
                    <p>Amazing stay. Clean rooms, beautiful view and excellent hospitality. Will definitely come back!</p>
                  </div>
                </div>
                <div className="review-card">
                  <div className="reviewer-avatar">P</div>
                  <div>
                    <h4>Priya Menon</h4>
                    <p className="review-date">July 2026</p>
                    <p>One of the best vacation properties I have ever stayed in. Absolutely stunning!</p>
                  </div>
                </div>
                <div className="review-card">
                  <div className="reviewer-avatar">A</div>
                  <div>
                    <h4>Aryan Kapoor</h4>
                    <p className="review-date">June 2026</p>
                    <p>The host was incredibly responsive and the property exceeded all expectations.</p>
                  </div>
                </div>
                <div className="review-card">
                  <div className="reviewer-avatar">S</div>
                  <div>
                    <h4>Sneha Iyer</h4>
                    <p className="review-date">May 2026</p>
                    <p>Perfect getaway! The pool area was fantastic and the views are unmatched.</p>
                  </div>
                </div>
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