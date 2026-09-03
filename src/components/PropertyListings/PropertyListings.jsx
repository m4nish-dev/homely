import "./PropertyListings.css";
import { FaHeart, FaChevronLeft, FaChevronRight, FaStar, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertyListings() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [currentImages, setCurrentImages] = useState({});

  const properties = [
    {
      id: 1, title: "Luxury Beachside Villa", category: "Villas", location: "Goa", rating: 4.9, reviews: 128, price: "₹5,999",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80",
      ],
    },
    {
      id: 2, title: "Modern Studio Flat", category: "Flats", location: "Delhi", rating: 4.8, reviews: 94, price: "₹3,499",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      ],
    },
    {
      id: 3, title: "Tropical Beach Resort", category: "Resorts", location: "Kerala", rating: 4.7, reviews: 213, price: "₹7,999",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      ],
    },
    {
      id: 4, title: "Cozy Mountain Cabin", category: "Cabins", location: "Manali", rating: 4.9, reviews: 76, price: "₹4,999",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      ],
    },
    {
      id: 5, title: "Royal Heritage Haveli", category: "Villas", location: "Jaipur", rating: 4.8, reviews: 155, price: "₹6,499",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=800&q=80",
      ],
    },
    {
      id: 6, title: "Lakeside Palace Suite", category: "Resorts", location: "Udaipur", rating: 4.9, reviews: 89, price: "₹8,999",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      ],
    },
    {
      id: 7, title: "Sky-High Penthouse", category: "Flats", location: "Mumbai", rating: 4.8, reviews: 61, price: "₹9,499",
      images: [
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
      ],
    },
    {
      id: 8, title: "Forest Treehouse Retreat", category: "Cabins", location: "Coorg", rating: 4.9, reviews: 44, price: "₹5,499",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      ],
    },
    {
      id: 9, title: "Cliffside Sea View Resort", category: "Resorts", location: "Vizag", rating: 4.7, reviews: 102, price: "₹6,999",
      images: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
        "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
      ],
    },
  ];

  const filters = ["All", "Villas", "Flats", "Resorts", "Cabins"];

  const filteredProperties =
    activeFilter === "All"
      ? properties
      : properties.filter((p) => p.category === activeFilter);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const nextImage = (propertyId, totalImages, e) => {
    e.stopPropagation();
    setCurrentImages((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (propertyId, totalImages, e) => {
    e.stopPropagation();
    setCurrentImages((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  return (
    <section className="listings">
      <div className="listings-header">
        <div>
          <span className="listings-eyebrow">🏡 Handpicked For You</span>
          <h2>Popular Stays</h2>
          <p>Discover handpicked stays loved by travelers around the world.</p>
        </div>
        <button className="listings-view-all" onClick={() => navigate("/search")}>
          View All <FaArrowRight />
        </button>
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${activeFilter === filter ? "active-filter" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="listings-grid">
        {filteredProperties.map((property) => (
          <div
            key={property.id}
            className="listing-card"
            onClick={() => navigate(`/property/${property.id}`)}
          >
            <div className="image-container">
              <img
                src={property.images[currentImages[property.id] || 0]}
                alt={property.title}
                loading="lazy"
              />

              <div className="card-badges">
                {property.isNew && <div className="new-badge">New</div>}
                <div className="guest-badge">⭐ Guest Fave</div>
              </div>

              <button
                className="favorite-btn"
                onClick={(e) => toggleFavorite(property.id, e)}
                aria-label="Save to wishlist"
              >
                <FaHeart
                  color={favorites.includes(property.id) ? "#ff385c" : "rgba(255,255,255,0.9)"}
                />
              </button>

              <button
                className="carousel-btn left"
                onClick={(e) => prevImage(property.id, property.images.length, e)}
              >
                <FaChevronLeft />
              </button>

              <button
                className="carousel-btn right"
                onClick={(e) => nextImage(property.id, property.images.length, e)}
              >
                <FaChevronRight />
              </button>

              <div className="carousel-dots">
                {property.images.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${index === (currentImages[property.id] || 0) ? "active-dot" : ""}`}
                  />
                ))}
              </div>
            </div>

            <div className="listing-info">
              <div className="top-row">
                <h3 className="card-title">{property.location}</h3>
                <span className="rating">
                  <FaStar /> {property.rating}
                </span>
              </div>
              <p className="subtitle">{property.title}</p>
              <p className="subtitle date-added">Added recently</p>
              <h4 className="price">
                {property.price}
                <span className="night-text"> night</span>
              </h4>
            </div>
          </div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="empty-state">
          <p>No properties found in this category.</p>
        </div>
      )}
    </section>
  );
}

export default PropertyListings;