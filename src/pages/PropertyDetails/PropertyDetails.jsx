import "./PropertyDetails.css";

import {
  FaArrowLeft,
  FaWifi,
  FaSwimmingPool,
  FaParking,
  FaStar,
} from "react-icons/fa";

import {
  MdOutlineBedroomParent,
  MdOutlineFreeBreakfast,
} from "react-icons/md";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const properties = {
    1: {
      title: "Luxury Villa",
      location: "Goa",
      rating: 4.9,
      price: "₹5,999",

      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      ],
    },

    2: {
      title: "Modern Flat",
      location: "Delhi",
      rating: 4.8,
      price: "₹3,499",

      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
      ],
    },

    3: {
      title: "Beach Resort",
      location: "Kerala",
      rating: 4.7,
      price: "₹7,999",

      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200",
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200",
      ],
    },

    4: {
      title: "Mountain Cabin",
      location: "Manali",
      rating: 4.9,
      price: "₹4,999",

      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200",
      ],
    },
  };

  const property = properties[id];

  if (!property) {
    return <h1>Property Not Found</h1>;
  }

  return (
    <div className="property-page">

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
        Back to Home
      </button>

      <div className="property-header">
        <h1>{property.title}</h1>

        <div className="property-meta">
          <FaStar />
          <span>{property.rating}</span>
          <span>•</span>
          <span>{property.location}</span>
          <span>• Guest Favorite</span>
        </div>
      </div>

      <div className="property-gallery">

        <div className="gallery-left">
          <img
            src={property.images[0]}
            alt={property.title}
          />
        </div>

        <div className="gallery-right">

          <img
            src={property.images[1]}
            alt=""
          />

          <img
            src={property.images[2]}
            alt=""
          />

          <img
            src={property.images[3]}
            alt=""
          />

          <img
            src={property.images[4]}
            alt=""
          />

        </div>

      </div>

      <div className="property-content">

        <div className="property-info">

          <div className="host-box">
            <h3>Hosted by Homely Premium Host</h3>

            <p>
              Entire Villa • 3 Bedrooms •
              2 Bathrooms • 6 Guests
            </p>
          </div>

          <div className="highlights">

            <div className="highlight-card">
              🛏️ 3 Bedrooms
            </div>

            <div className="highlight-card">
              👥 6 Guests
            </div>

            <div className="highlight-card">
              🛁 2 Bathrooms
            </div>

            <div className="highlight-card">
              🌊 Sea View
            </div>

          </div>

          <div className="about">

            <h2>About this stay</h2>

            <p>
              Experience luxury living with
              premium amenities, private pool,
              elegant interiors and breathtaking
              views. Perfect for families,
              couples and groups looking for
              a memorable vacation.
            </p>

          </div>

          <div className="amenities">

            <h2>What this place offers</h2>

            <div className="amenities-grid">

              <div className="amenity">
                <FaSwimmingPool />
                <span>Private Pool</span>
              </div>

              <div className="amenity">
                <FaWifi />
                <span>Free WiFi</span>
              </div>

              <div className="amenity">
                <FaParking />
                <span>Free Parking</span>
              </div>

              <div className="amenity">
                <MdOutlineFreeBreakfast />
                <span>Breakfast Included</span>
              </div>

              <div className="amenity">
                <MdOutlineBedroomParent />
                <span>Luxury Rooms</span>
              </div>

            </div>

          </div>

          <div className="reviews">

            <h2>Guest Reviews</h2>

            <div className="review-card">
              <h4>Rahul ⭐⭐⭐⭐⭐</h4>

              <p>
                Amazing stay. Clean rooms,
                beautiful view and excellent
                hospitality.
              </p>
            </div>

            <div className="review-card">
              <h4>Priya ⭐⭐⭐⭐⭐</h4>

              <p>
                One of the best vacation
                properties I have stayed in.
              </p>
            </div>

          </div>

        </div>

        <div className="booking-card">

          <h2>
            {property.price}
            <span> / night</span>
          </h2>

          <div className="booking-features">
            <p>✓ Free Cancellation</p>
            <p>✓ Instant Confirmation</p>
            <p>✓ Secure Payments</p>
          </div>

          <button
            className="reserve-btn"
            onClick={() =>
              navigate(`/booking/${id}`)
            }
          >
            Reserve Now
          </button>

        </div>

      </div>

    </div>
  );
}

export default PropertyDetails;