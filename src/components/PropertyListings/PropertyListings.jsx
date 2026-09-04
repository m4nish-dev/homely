import "./PropertyListings.css";
import { FaHeart, FaChevronLeft, FaChevronRight, FaStar, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ALL_PROPERTIES from "../../data/properties";

function PropertyListings() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [currentImages, setCurrentImages] = useState({});

  const properties = ALL_PROPERTIES;
  const filters = ["All", "Hotels", "Villas", "Flats", "Resorts", "Cabins"];

  const filteredProperties =
    activeFilter === "All"
      ? properties
      : properties.filter((p) => p.category === activeFilter);

  // Auto-play all image carousels
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImages((prev) => {
        const nextState = { ...prev };
        filteredProperties.forEach((property) => {
          const current = nextState[property.id] || 0;
          nextState[property.id] = (current + 1) % property.images.length;
        });
        return nextState;
      });
    }, 2500);
    return () => clearInterval(timer);
  }, [filteredProperties]);

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
              <p className="subtitle date-added">{property.reviews} reviews</p>
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