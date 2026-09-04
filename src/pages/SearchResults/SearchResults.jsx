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
    {
        "id": 1,
        "title": "Luxury Stay Villa",
        "category": "Villas",
        "location": "Goa",
        "rating": 4.3,
        "reviews": 213,
        "price": 3199,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
    },
    {
        "id": 2,
        "title": "Modern Retreat Villa",
        "category": "Villas",
        "location": "Delhi",
        "rating": 4.1,
        "reviews": 41,
        "price": 3599,
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    },
    {
        "id": 3,
        "title": "Cozy Getaway Villa",
        "category": "Villas",
        "location": "Kerala",
        "rating": 4.3,
        "reviews": 247,
        "price": 6499,
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    },
    {
        "id": 4,
        "title": "Heritage Escape Villa",
        "category": "Villas",
        "location": "Manali",
        "rating": 4.7,
        "reviews": 293,
        "price": 3299,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    },
    {
        "id": 5,
        "title": "Panoramic View Villa",
        "category": "Villas",
        "location": "Jaipur",
        "rating": 4.5,
        "reviews": 218,
        "price": 5399,
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
    },
    {
        "id": 6,
        "title": "Nature Nest Villa",
        "category": "Villas",
        "location": "Udaipur",
        "rating": 4.4,
        "reviews": 57,
        "price": 4899,
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80"
    },
    {
        "id": 7,
        "title": "Luxury Stay Villa",
        "category": "Villas",
        "location": "Mumbai",
        "rating": 4.2,
        "reviews": 253,
        "price": 5499,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    },
    {
        "id": 8,
        "title": "Modern Retreat Villa",
        "category": "Villas",
        "location": "Coorg",
        "rating": 4,
        "reviews": 271,
        "price": 6299,
        "image": "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80"
    },
    {
        "id": 9,
        "title": "Luxury Stay Flat",
        "category": "Flats",
        "location": "Goa",
        "rating": 4.2,
        "reviews": 105,
        "price": 6099,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
    },
    {
        "id": 10,
        "title": "Modern Retreat Flat",
        "category": "Flats",
        "location": "Delhi",
        "rating": 4.5,
        "reviews": 167,
        "price": 6899,
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    },
    {
        "id": 11,
        "title": "Cozy Getaway Flat",
        "category": "Flats",
        "location": "Kerala",
        "rating": 4.1,
        "reviews": 243,
        "price": 7999,
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    },
    {
        "id": 12,
        "title": "Heritage Escape Flat",
        "category": "Flats",
        "location": "Manali",
        "rating": 4.4,
        "reviews": 141,
        "price": 3199,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    },
    {
        "id": 13,
        "title": "Panoramic View Flat",
        "category": "Flats",
        "location": "Jaipur",
        "rating": 4.6,
        "reviews": 149,
        "price": 4999,
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
    },
    {
        "id": 14,
        "title": "Nature Nest Flat",
        "category": "Flats",
        "location": "Udaipur",
        "rating": 4.6,
        "reviews": 23,
        "price": 7499,
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80"
    },
    {
        "id": 15,
        "title": "Luxury Stay Flat",
        "category": "Flats",
        "location": "Mumbai",
        "rating": 4.7,
        "reviews": 256,
        "price": 7399,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    },
    {
        "id": 16,
        "title": "Modern Retreat Flat",
        "category": "Flats",
        "location": "Coorg",
        "rating": 4.5,
        "reviews": 238,
        "price": 6599,
        "image": "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80"
    },
    {
        "id": 17,
        "title": "Luxury Stay Resort",
        "category": "Resorts",
        "location": "Goa",
        "rating": 4.3,
        "reviews": 292,
        "price": 5999,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
    },
    {
        "id": 18,
        "title": "Modern Retreat Resort",
        "category": "Resorts",
        "location": "Delhi",
        "rating": 4.7,
        "reviews": 59,
        "price": 4699,
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    },
    {
        "id": 19,
        "title": "Cozy Getaway Resort",
        "category": "Resorts",
        "location": "Kerala",
        "rating": 4.1,
        "reviews": 212,
        "price": 6999,
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    },
    {
        "id": 20,
        "title": "Heritage Escape Resort",
        "category": "Resorts",
        "location": "Manali",
        "rating": 4.2,
        "reviews": 188,
        "price": 5299,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    },
    {
        "id": 21,
        "title": "Panoramic View Resort",
        "category": "Resorts",
        "location": "Jaipur",
        "rating": 4.5,
        "reviews": 53,
        "price": 4599,
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
    },
    {
        "id": 22,
        "title": "Nature Nest Resort",
        "category": "Resorts",
        "location": "Udaipur",
        "rating": 4.6,
        "reviews": 175,
        "price": 3899,
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80"
    },
    {
        "id": 23,
        "title": "Luxury Stay Resort",
        "category": "Resorts",
        "location": "Mumbai",
        "rating": 4.9,
        "reviews": 205,
        "price": 6999,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    },
    {
        "id": 24,
        "title": "Modern Retreat Resort",
        "category": "Resorts",
        "location": "Coorg",
        "rating": 4.2,
        "reviews": 170,
        "price": 5299,
        "image": "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80"
    },
    {
        "id": 25,
        "title": "Luxury Stay Cabin",
        "category": "Cabins",
        "location": "Goa",
        "rating": 5,
        "reviews": 193,
        "price": 3499,
        "image": "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
    },
    {
        "id": 26,
        "title": "Modern Retreat Cabin",
        "category": "Cabins",
        "location": "Delhi",
        "rating": 4.6,
        "reviews": 44,
        "price": 5199,
        "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80"
    },
    {
        "id": 27,
        "title": "Cozy Getaway Cabin",
        "category": "Cabins",
        "location": "Kerala",
        "rating": 4.6,
        "reviews": 181,
        "price": 7299,
        "image": "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    },
    {
        "id": 28,
        "title": "Heritage Escape Cabin",
        "category": "Cabins",
        "location": "Manali",
        "rating": 4.2,
        "reviews": 231,
        "price": 5399,
        "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    },
    {
        "id": 29,
        "title": "Panoramic View Cabin",
        "category": "Cabins",
        "location": "Jaipur",
        "rating": 4.6,
        "reviews": 175,
        "price": 3899,
        "image": "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80"
    },
    {
        "id": 30,
        "title": "Nature Nest Cabin",
        "category": "Cabins",
        "location": "Udaipur",
        "rating": 4.4,
        "reviews": 104,
        "price": 7599,
        "image": "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80"
    },
    {
        "id": 31,
        "title": "Luxury Stay Cabin",
        "category": "Cabins",
        "location": "Mumbai",
        "rating": 4.4,
        "reviews": 59,
        "price": 6299,
        "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    },
    {
        "id": 32,
        "title": "Modern Retreat Cabin",
        "category": "Cabins",
        "location": "Coorg",
        "rating": 4.1,
        "reviews": 234,
        "price": 7099,
        "image": "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80"
    }
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