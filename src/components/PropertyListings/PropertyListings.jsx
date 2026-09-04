import "./PropertyListings.css";
import { FaHeart, FaChevronLeft, FaChevronRight, FaStar, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PropertyListings() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [currentImages, setCurrentImages] = useState({});

  const properties = [
    {
        "id": 1,
        "title": "Luxury Stay Villa",
        "category": "Villas",
        "location": "Mumbai",
        "rating": 4.9,
        "reviews": 278,
        "price": "₹5099",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
        ]
    },
    {
        "id": 2,
        "title": "Modern Retreat Villa",
        "category": "Villas",
        "location": "Delhi",
        "rating": 4.3,
        "reviews": 144,
        "price": "₹5499",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
        ]
    },
    {
        "id": 3,
        "title": "Cozy Getaway Villa",
        "category": "Villas",
        "location": "Goa",
        "rating": 4.2,
        "reviews": 263,
        "price": "₹3399",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 4,
        "title": "Heritage Escape Villa",
        "category": "Villas",
        "location": "Bangalore",
        "rating": 4.5,
        "reviews": 152,
        "price": "₹7699",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 5,
        "title": "Panoramic View Villa",
        "category": "Villas",
        "location": "Hyderabad",
        "rating": 4.1,
        "reviews": 103,
        "price": "₹3899",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
            "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=800&q=80"
        ]
    },
    {
        "id": 6,
        "title": "Nature Nest Villa",
        "category": "Villas",
        "location": "Jaipur",
        "rating": 4.2,
        "reviews": 118,
        "price": "₹5899",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 7,
        "title": "Luxury Stay Villa",
        "category": "Villas",
        "location": "Kerala",
        "rating": 4.9,
        "reviews": 83,
        "price": "₹4599",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
        ]
    },
    {
        "id": 8,
        "title": "Modern Retreat Villa",
        "category": "Villas",
        "location": "Manali",
        "rating": 4.3,
        "reviews": 256,
        "price": "₹6899",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 9,
        "title": "Luxury Stay Flat",
        "category": "Flats",
        "location": "Mumbai",
        "rating": 4.1,
        "reviews": 258,
        "price": "₹7199",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
        ]
    },
    {
        "id": 10,
        "title": "Modern Retreat Flat",
        "category": "Flats",
        "location": "Delhi",
        "rating": 4.8,
        "reviews": 250,
        "price": "₹6499",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
        ]
    },
    {
        "id": 11,
        "title": "Cozy Getaway Flat",
        "category": "Flats",
        "location": "Goa",
        "rating": 4.7,
        "reviews": 98,
        "price": "₹3999",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 12,
        "title": "Heritage Escape Flat",
        "category": "Flats",
        "location": "Bangalore",
        "rating": 4.9,
        "reviews": 117,
        "price": "₹6099",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 13,
        "title": "Panoramic View Flat",
        "category": "Flats",
        "location": "Hyderabad",
        "rating": 4.9,
        "reviews": 151,
        "price": "₹3599",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
            "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=800&q=80"
        ]
    },
    {
        "id": 14,
        "title": "Nature Nest Flat",
        "category": "Flats",
        "location": "Jaipur",
        "rating": 4.8,
        "reviews": 278,
        "price": "₹7299",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 15,
        "title": "Luxury Stay Flat",
        "category": "Flats",
        "location": "Kerala",
        "rating": 4.1,
        "reviews": 301,
        "price": "₹4999",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
        ]
    },
    {
        "id": 16,
        "title": "Modern Retreat Flat",
        "category": "Flats",
        "location": "Manali",
        "rating": 4.8,
        "reviews": 146,
        "price": "₹4699",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 17,
        "title": "Luxury Stay Resort",
        "category": "Resorts",
        "location": "Mumbai",
        "rating": 4.3,
        "reviews": 70,
        "price": "₹5199",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
        ]
    },
    {
        "id": 18,
        "title": "Modern Retreat Resort",
        "category": "Resorts",
        "location": "Delhi",
        "rating": 4.7,
        "reviews": 59,
        "price": "₹7799",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
        ]
    },
    {
        "id": 19,
        "title": "Cozy Getaway Resort",
        "category": "Resorts",
        "location": "Goa",
        "rating": 4.4,
        "reviews": 24,
        "price": "₹5199",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 20,
        "title": "Heritage Escape Resort",
        "category": "Resorts",
        "location": "Bangalore",
        "rating": 4.6,
        "reviews": 101,
        "price": "₹6299",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 21,
        "title": "Panoramic View Resort",
        "category": "Resorts",
        "location": "Hyderabad",
        "rating": 4.7,
        "reviews": 278,
        "price": "₹6399",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
            "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=800&q=80"
        ]
    },
    {
        "id": 22,
        "title": "Nature Nest Resort",
        "category": "Resorts",
        "location": "Jaipur",
        "rating": 4.5,
        "reviews": 183,
        "price": "₹4699",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 23,
        "title": "Luxury Stay Resort",
        "category": "Resorts",
        "location": "Kerala",
        "rating": 4.5,
        "reviews": 284,
        "price": "₹6999",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
        ]
    },
    {
        "id": 24,
        "title": "Modern Retreat Resort",
        "category": "Resorts",
        "location": "Manali",
        "rating": 4.2,
        "reviews": 116,
        "price": "₹4999",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 25,
        "title": "Luxury Stay Cabin",
        "category": "Cabins",
        "location": "Mumbai",
        "rating": 4.7,
        "reviews": 287,
        "price": "₹5999",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
            "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=800&q=80"
        ]
    },
    {
        "id": 26,
        "title": "Modern Retreat Cabin",
        "category": "Cabins",
        "location": "Delhi",
        "rating": 4.4,
        "reviews": 240,
        "price": "₹5199",
        "isNew": true,
        "images": [
            "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
            "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80"
        ]
    },
    {
        "id": 27,
        "title": "Cozy Getaway Cabin",
        "category": "Cabins",
        "location": "Goa",
        "rating": 4.7,
        "reviews": 219,
        "price": "₹6299",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 28,
        "title": "Heritage Escape Cabin",
        "category": "Cabins",
        "location": "Bangalore",
        "rating": 4.7,
        "reviews": 195,
        "price": "₹6799",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    },
    {
        "id": 29,
        "title": "Panoramic View Cabin",
        "category": "Cabins",
        "location": "Hyderabad",
        "rating": 4.8,
        "reviews": 222,
        "price": "₹3399",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
            "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=800&q=80"
        ]
    },
    {
        "id": 30,
        "title": "Nature Nest Cabin",
        "category": "Cabins",
        "location": "Jaipur",
        "rating": 5,
        "reviews": 102,
        "price": "₹7999",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
        ]
    },
    {
        "id": 31,
        "title": "Luxury Stay Cabin",
        "category": "Cabins",
        "location": "Kerala",
        "rating": 4.7,
        "reviews": 283,
        "price": "₹4699",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"
        ]
    },
    {
        "id": 32,
        "title": "Modern Retreat Cabin",
        "category": "Cabins",
        "location": "Manali",
        "rating": 4.4,
        "reviews": 207,
        "price": "₹6099",
        "isNew": false,
        "images": [
            "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80",
            "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
        ]
    }
];

  const filters = ["All", "Villas", "Flats", "Resorts", "Cabins"];

  const filteredProperties =
    activeFilter === "All"
      ? properties
      : properties.filter((p) => p.category === activeFilter);

  // Auto-play all image carousels automatically
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
    }, 2500); // Slide every 2.5 seconds for a faster, snappier feel

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