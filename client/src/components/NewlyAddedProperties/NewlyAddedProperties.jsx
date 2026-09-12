import { useState, useEffect } from "react";
import propertyService from "../../api/propertyService";
import userService from "../../api/userService";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { FaMapMarkerAlt, FaStar, FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./NewlyAddedProperties.css";

function NewlyAddedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const { user, setUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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
    const fetchNewProperties = async () => {
      try {
        const data = await propertyService.getAll({
          limit: 4,
          sortBy: "newest", // Sort by newest properties first
        });
        setProperties(data.properties || []);
      } catch (err) {
        console.error("Failed to fetch new properties", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNewProperties();
  }, []);

  const toggleFavorite = async (id, e) => {
    e.stopPropagation();
    if (!user) {
      toast.warning("Please log in to save properties to your wishlist");
      return;
    }

    const isAlreadyFav = favorites.includes(id);
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
      setFavorites((prev) =>
        isAlreadyFav ? [...prev, id] : prev.filter((favId) => favId !== id)
      );
    }
  };

  if (loading || properties.length === 0) return null;

  return (
    <div className="new-properties-section">
      <div className="new-properties-header">
        <div className="header-text">
          <span className="badge">Just Landed</span>
          <h2>Newly Added Properties</h2>
          <p>Be the first to stay in these stunning new homes.</p>
        </div>
        <button className="view-all-btn" onClick={() => navigate("/search")}>
          View All <FaArrowRight />
        </button>
      </div>

      <div className="new-properties-grid">
        {properties.map((property) => (
          <div
            key={property._id}
            className="new-property-card"
            onClick={() => navigate(`/property/${property._id}`)}
          >
            <div className="new-property-image">
              <img src={property.images?.[0]?.url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070"} alt={property.title} />
              <div className="new-badge">NEW</div>
              <button
                className={`new-property-fav-btn ${favorites.includes(property._id) ? "active" : ""}`}
                onClick={(e) => toggleFavorite(property._id, e)}
                aria-label="Save to wishlist"
                title={favorites.includes(property._id) ? "Remove from wishlist" : "Save to wishlist"}
              >
                <FaHeart color={favorites.includes(property._id) ? "#ff385c" : "rgba(255,255,255,0.9)"} />
              </button>
            </div>
            <div className="new-property-info">
              <div className="new-property-location">
                <FaMapMarkerAlt /> {property.location?.city}, India
              </div>
              <h3>{property.title}</h3>
              <div className="new-property-host" style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
                Added by {property.host?.name || 'Admin'}
              </div>
              <div className="new-property-footer">
                <span className="price">₹{property.price?.toLocaleString()} <span>/ night</span></span>
                <span className="rating"><FaStar /> New</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewlyAddedProperties;
