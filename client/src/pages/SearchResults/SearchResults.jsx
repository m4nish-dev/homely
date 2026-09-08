import "./SearchResults.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaStar, FaArrowLeft, FaFilter, FaSearch, FaHeart } from "react-icons/fa";
import propertyService from "../../api/propertyService";

function SearchResults() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const params = new URLSearchParams(currentLocation.search);
  const searchedLocation = params.get("location") || "";
  const searchedCategory = params.get("category") || "All";

  const [activeFilter, setActiveFilter] = useState(searchedCategory);
  const [sortBy, setSortBy] = useState("Recommended");
  const [favorites, setFavorites] = useState([]);
  
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync filter if URL category param changes
  useEffect(() => {
    if (searchedCategory && searchedCategory !== "All") {
      setActiveFilter(searchedCategory);
    }
  }, [searchedCategory]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await propertyService.getAll({
          location: searchedLocation,
          category: activeFilter === "All" ? "" : activeFilter,
          sortBy
        });
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Failed to fetch properties", err);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [searchedLocation, activeFilter, sortBy]);

  const filters = ["All", "Hotels", "Villas", "Flats", "Resorts", "Cabins"];

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
            <p>{properties.length} properties found</p>
          </div>

          <div className="search-controls">
            <div className="sort-wrap">
              <FaFilter />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="Recommended">Recommended</option>
                <option value="priceAsc">Price: Low → High</option>
                <option value="priceDesc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
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

        {/* Dynamic Data Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "100px 20px" }}>
             <h2>Loading properties...</h2>
          </div>
        ) : properties.length > 0 ? (
          <div className="results-grid">
            {properties.map((property) => (
              <div
                className="result-card"
                key={property._id}
                onClick={() => navigate(`/property/${property._id}`)}
              >
                <div className="result-img-wrap">
                  <img src={property.images && property.images.length > 0 ? property.images[0].url : ""} alt={property.title} loading="lazy" />
                  <button
                    className="result-fav-btn"
                    onClick={(e) => toggleFavorite(property._id, e)}
                  >
                    <FaHeart color={favorites.includes(property._id) ? "#ff385c" : "rgba(255,255,255,0.85)"} />
                  </button>
                  <div className="result-category-badge">{property.category}</div>
                </div>

                <div className="result-info">
                  <div className="result-top">
                    <h3 className="result-location">{property.location?.city || property.location}</h3>
                    <span className="result-rating">
                      <FaStar /> {property.rating || "New"}
                    </span>
                  </div>
                  <p className="result-subtitle">{property.title}</p>
                  <p className="result-subtitle">{property.reviewCount || 0} reviews</p>
                  <h4 className="result-price">
                    ₹{property.price?.toLocaleString()}
                    <span> night</span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-emoji"><FaSearch style={{ color: "#d89b4a" }} /></div>
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