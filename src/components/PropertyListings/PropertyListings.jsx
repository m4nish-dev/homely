import "./PropertyListings.css";
import {
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PropertyListings() {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [favorites, setFavorites] =
    useState([]);

  const [currentImages, setCurrentImages] =
    useState({});

  const properties = [
    {
      id: 1,
      title: "Luxury Villa",
      category: "Villas",
      location: "Goa",
      rating: 4.9,
      price: "₹5,999",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
        "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800",
      ],
    },

    {
      id: 2,
      title: "Modern Flat",
      category: "Flats",
      location: "Delhi",
      rating: 4.8,
      price: "₹3,499",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
      ],
    },

    {
      id: 3,
      title: "Beach Resort",
      category: "Resorts",
      location: "Kerala",
      rating: 4.7,
      price: "₹7,999",
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      ],
    },

    {
      id: 4,
      title: "Mountain Cabin",
      category: "Cabins",
      location: "Manali",
      rating: 4.9,
      price: "₹4,999",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
      ],
    },
  ];

  const filters = [
    "All",
    "Villas",
    "Flats",
    "Resorts",
    "Cabins",
  ];

  const filteredProperties =
    activeFilter === "All"
      ? properties
      : properties.filter(
          (property) =>
            property.category === activeFilter
        );

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter(
            (item) => item !== id
          )
        : [...prev, id]
    );
  };

  const nextImage = (
    propertyId,
    totalImages
  ) => {
    setCurrentImages((prev) => ({
      ...prev,
      [propertyId]:
        ((prev[propertyId] || 0) + 1) %
        totalImages,
    }));
  };

  const prevImage = (
    propertyId,
    totalImages
  ) => {
    setCurrentImages((prev) => ({
      ...prev,
      [propertyId]:
        ((prev[propertyId] || 0) -
          1 +
          totalImages) %
        totalImages,
    }));
  };

  return (
    <section className="listings">
      <div className="section-header">
        <h2>Popular Stays</h2>

        <p>
          Discover handpicked stays loved by
          travelers around the world.
        </p>
      </div>

      <div className="filters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`filter-btn ${
              activeFilter === filter
                ? "active-filter"
                : ""
            }`}
            onClick={() =>
              setActiveFilter(filter)
            }
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="listings-grid">
        {filteredProperties.map(
          (property) => (
            <div
              key={property.id}
              className="listing-card"
              onClick={() =>
                navigate(
                  `/property/${property.id}`
                )
              }
            >
              <div className="image-container">
                <img
                  src={
                    property.images[
                      currentImages[
                        property.id
                      ] || 0
                    ]
                  }
                  alt={property.title}
                />

                {property.isNew && (
                  <div className="new-badge">
                    New
                  </div>
                )}

                <div className="guest-badge">
                  Guest Favorite
                </div>

                <button
                  className="favorite-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(
                      property.id
                    );
                  }}
                >
                  <FaHeart
                    color={
                      favorites.includes(
                        property.id
                      )
                        ? "#ff385c"
                        : "#c7c7c7"
                    }
                  />
                </button>

                <button
                  className="carousel-btn left"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage(
                      property.id,
                      property.images.length
                    );
                  }}
                >
                  <FaChevronLeft />
                </button>

                <button
                  className="carousel-btn right"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage(
                      property.id,
                      property.images.length
                    );
                  }}
                >
                  <FaChevronRight />
                </button>

                <div className="carousel-dots">
                  {property.images.map(
                    (_, index) => (
                      <span
                        key={index}
                        className={
                          index ===
                          (currentImages[
                            property.id
                          ] || 0)
                            ? "dot active-dot"
                            : "dot"
                        }
                      />
                    )
                  )}
                </div>
              </div>

              <div className="listing-info">
                <div className="top-row">
                  <h3>{property.title}</h3>

                  <span className="rating">
                    ⭐ {property.rating}
                  </span>
                </div>

                <p>{property.location}</p>

                <span className="property-type">
                  {property.category}
                </span>

                <h4>
                  {property.price}
                  <span className="night-text">
                    {" "}
                    / night
                  </span>
                </h4>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default PropertyListings;