import "./SearchResults.css";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaStar, FaArrowLeft, FaFilter } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

function SearchResults() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const params = new URLSearchParams(currentLocation.search);
  const searchedLocation = params.get("location") || "";

  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [favorites, setFavorites] = useState([]);

  const properties = [
    { id: 1, title: "Luxury Villa", category: "Villas", location: "Goa", rating: 4.9, reviews: 128, price: 5999, image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80" },
    { id: 2, title: "Modern Flat", category: "Flats", location: "Delhi", rating: 4.8, reviews: 94, price: 3499, image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80" },
    { id: 3, title: "Beach Resort", category: "Resorts", location: "Kerala", rating: 4.7, reviews: 213, price: 7999, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80" },
    { id: 4, title: "Mountain Cabin", category: "Cabins", location: "Manali", rating: 4.9, reviews: 76, price: 4999, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80" },
    { id: 5, title: "Heritage Haveli", category: "Villas", location: "Jaipur", rating: 4.8, reviews: 155, price: 6499, image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80" },
    { id: 6, title: "Lake View Suite", category: "Resorts", location: "Udaipur", rating: 4.9, reviews: 89, price: 8999, image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80" },
  ];

  const filters = ["All", "Villas", "Flats", "Resorts", "Cabins"];

  let filteredProperties = searchedLocation
    ? properties.filter((p) => p.location.toLowerCase().includes(searchedLocation.toLowerCase()))
    : properties;

  if (activeFilter !== "All") {
    filteredProperties = filteredProperties.filter((p) => p.category === activeFilter);
  }

  const sorted = [...filteredProperties];
  if (sortBy === "Low") sorted.sort((a, b) => a.price - b.price);
  if (sortBy === "High") sorted.sort((a, b) => b.price - a.price);
  if (sortBy === "Rating") sorted.sort((a, b) => b.rating - a.rating);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="search-page">
      {/* Mini Navbar */}
      <nav className="search-nav">
        <button className="search-back-btn" onClick={() => navigate("/")}>
          <FaArrowLeft />
          <span className="search-logo">Homely</span>
        </button>
        <div className="search-nav-right">
          <Link to="/" className="search-nav-link">Home</Link>
        </div>
      </nav>

      <div className="search-content">
        {/* Header */}
        <div className="search-header">
          <div>
            <h1>
              {searchedLocation ? (
                <><span className="search-location">{searchedLocation}</span> stays</>
              ) : (
                "All Stays"
              )}
            </h1>
            <p>{sorted.length} properties found</p>
          </div>

          <div className="search-controls">
            <div className="sort-wrap">
              <FaFilter />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Recommended">Recommended</option>
                <option value="Low">Price: Low → High</option>
                <option value="High">Price: High → Low</option>
                <option value="Rating">Top Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="sr-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`sr-filter-btn ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {sorted.length > 0 ? (
          <div className="results-grid">
            {sorted.map((property) => (
              <div
                className="result-card"
                key={property.id}
                onClick={() => navigate(`/property/${property.id}`)}
              >
                <div className="result-img-wrap">
                  <img src={property.image} alt={property.title} loading="lazy" />
                  <button
                    className="result-fav-btn"
                    onClick={(e) => toggleFavorite(property.id, e)}
                  >
                    <FaHeart color={favorites.includes(property.id) ? "#ff385c" : "rgba(255,255,255,0.85)"} />
                  </button>
                  <div className="result-category-badge">{property.category}</div>
                </div>

                <div className="result-info">
                  <div className="result-top">
                    <h3 className="result-location">{property.location}</h3>
                    <span className="result-rating">
                      <FaStar /> {property.rating}
                    </span>
                  </div>
                  <p className="result-subtitle">{property.title}</p>
                  <p className="result-subtitle">{property.reviews} reviews</p>
                  <h4 className="result-price">
                    ₹{property.price.toLocaleString()}
                    <span> night</span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-emoji">🔍</div>
            <h2>No properties found</h2>
            <p>Try adjusting your search or explore a different destination.</p>
            <button onClick={() => navigate("/")}>Explore All Stays</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;