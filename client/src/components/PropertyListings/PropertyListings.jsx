import "./PropertyListings.css";
import { FaHeart, FaChevronLeft, FaChevronRight, FaStar, FaArrowRight, FaHome, FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import propertyService from "../../api/propertyService";
import userService from "../../api/userService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

function PropertyListings() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [currentImages, setCurrentImages] = useState({});
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = ["All", "Hotels", "Villas", "Flats", "Resorts", "Cabins"];

  // Sync favorites with user's saved properties
  useEffect(() => {
    if (user && user.favorites) {
      const favIds = user.favorites.map((f) => (typeof f === "string" ? f : f._id));
      setFavorites(favIds);
    } else {
      setFavorites([]);
    }
  }, [user]);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const data = await propertyService.getAll({
          category: activeFilter === "All" ? "" : activeFilter,
          limit: 12,
          sortBy: "Recommended",
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
  }, [activeFilter]);

  // Auto-play image carousels
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImages((prev) => {
        const next = { ...prev };
        properties.forEach((p) => {
          const cur = next[p._id] || 0;
          next[p._id] = (cur + 1) % (p.images?.length || 1);
        });
        return next;
      });
    }, 2800);
    return () => clearInterval(timer);
  }, [properties]);

  const toggleFavorite = async (id, e) => {
    e.stopPropagation();
    if (!user) {
      toast.warning("Please log in to save properties to your wishlist");
      return;
    }

    const isAlreadyFav = favorites.includes(id);
    // Optimistic UI update
    setFavorites((prev) =>
      isAlreadyFav ? prev.filter((favId) => favId !== id) : [...prev, id]
    );

    try {
      if (isAlreadyFav) {
        await userService.removeFavorite(id);
        toast.info("Removed from saved stays");
      } else {
        await userService.addFavorite(id);
        toast.success("Saved to your wishlist!");
      }

      if (setUser) {
        setUser((prev) => {
          if (!prev) return prev;
          const currentFavs = (prev.favorites || []).map((f) =>
            typeof f === "string" ? f : f._id
          );
          const updated = isAlreadyFav
            ? currentFavs.filter((favId) => favId !== id)
            : [...currentFavs, id];
          return { ...prev, favorites: updated };
        });
      }
    } catch (err) {
      console.error("Failed to toggle favorite", err);
      toast.error("Failed to update favorites");
      // Revert optimistic update
      setFavorites((prev) =>
        isAlreadyFav ? [...prev, id] : prev.filter((favId) => favId !== id)
      );
    }
  };

  const nextImage = (id, total, e) => {
    e.stopPropagation();
    setCurrentImages((prev) => ({ ...prev, [id]: ((prev[id] || 0) + 1) % total }));
  };

  const prevImage = (id, total, e) => {
    e.stopPropagation();
    setCurrentImages((prev) => ({ ...prev, [id]: ((prev[id] || 0) - 1 + total) % total }));
  };

  return (
    <section className="listings">
      <div className="listings-header">
        <div>
          <span className="listings-eyebrow"><FaHome /> Handpicked For You</span>
          <h2>Popular Stays</h2>
          <p>Discover handpicked stays loved by travelers around India.</p>
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

      {loading ? (
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
          <p>Loading stays...</p>
        </div>
      ) : (
        <div className="listings-grid">
          {properties.map((property) => {
            const imgIdx = currentImages[property._id] || 0;
            const imgs = property.images || [];
            const imgUrl = imgs[imgIdx]?.url || imgs[0]?.url || "";
            return (
              <div
                key={property._id}
                className="listing-card"
                onClick={() => navigate(`/property/${property._id}`)}
              >
                <div className="image-container">
                  <img src={imgUrl} alt={property.title} loading="lazy" />

                  <div className="card-badges">
                    {property.isNewlyListed && <div className="new-badge">New</div>}
                    {property.isFeatured && (
                      <div className="guest-badge"><FaStar color="#d89b4a" style={{ marginRight: "4px" }} /> Guest Fave</div>
                    )}
                  </div>

                  <button
                    className={`favorite-btn ${favorites.includes(property._id) ? "active" : ""}`}
                    onClick={(e) => toggleFavorite(property._id, e)}
                    aria-label="Save to wishlist"
                    title={favorites.includes(property._id) ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <FaHeart color={favorites.includes(property._id) ? "#ff385c" : "rgba(255,255,255,0.9)"} />
                  </button>

                  {imgs.length > 1 && (
                    <>
                      <button className="carousel-btn left" onClick={(e) => prevImage(property._id, imgs.length, e)}><FaChevronLeft /></button>
                      <button className="carousel-btn right" onClick={(e) => nextImage(property._id, imgs.length, e)}><FaChevronRight /></button>
                      <div className="carousel-dots">
                        {imgs.map((_, idx) => (
                          <span key={idx} className={`dot ${idx === imgIdx ? "active-dot" : ""}`} />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <div className="listing-info">
                  <div className="top-row">
                    <h3 className="card-title">{property.location?.city || property.location}</h3>
                    <span className="rating"><FaStar /> {property.rating || "New"}</span>
                  </div>
                  <p className="subtitle">{property.title}</p>
                  <p className="subtitle date-added">{property.reviewCount || 0} reviews</p>
                  <h4 className="price">₹{property.price?.toLocaleString()}<span className="night-text"> night</span></h4>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && properties.length === 0 && (
        <div className="empty-state">
          <FaSearch style={{ fontSize: 32, color: "#d89b4a", marginBottom: 12 }} />
          <p>No properties found in this category.</p>
        </div>
      )}
    </section>
  );
}

export default PropertyListings;
