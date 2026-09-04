import "./SearchResults.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaStar, FaArrowLeft, FaFilter } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import ALL_PROPERTIES from "../../data/properties";

function SearchResults() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const params = new URLSearchParams(currentLocation.search);
  const searchedLocation = params.get("location") || "";
  const searchedCategory = params.get("category") || "All";

  const [activeFilter, setActiveFilter] = useState(searchedCategory);
  const [sortBy, setSortBy] = useState("Recommended");
  const [favorites, setFavorites] = useState([]);

  // Sync filter if URL category param changes
  useEffect(() => {
    if (searchedCategory && searchedCategory !== "All") {
      setActiveFilter(searchedCategory);
    }
  }, [searchedCategory]);

  const filters = ["All", "Hotels", "Villas", "Flats", "Resorts", "Cabins"];

  let filteredProperties = searchedLocation
    ? ALL_PROPERTIES.filter((p) => p.location.toLowerCase().includes(searchedLocation.toLowerCase()))
    : ALL_PROPERTIES;

  if (activeFilter !== "All") {
    filteredProperties = filteredProperties.filter((p) => p.category === activeFilter);
  }

  const sorted = [...filteredProperties];
  if (sortBy === "Low") sorted.sort((a, b) => a.priceNum - b.priceNum);
  if (sortBy === "High") sorted.sort((a, b) => b.priceNum - a.priceNum);
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
              ) : activeFilter !== "All" ? (
                <><span className="search-location">{activeFilter}</span> across India</>
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
                    {property.price}
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
            <button onClick={() => { setActiveFilter("All"); navigate("/search"); }}>Explore All Stays</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;