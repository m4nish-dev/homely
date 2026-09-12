import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaMapMarkerAlt, FaCompass, FaSpinner } from "react-icons/fa";
import userService from "../../api/userService";
import { useToast } from "../../context/ToastContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await userService.getFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error("Failed to load favorites", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (e, propertyId) => {
    e.stopPropagation();
    try {
      await userService.removeFavorite(propertyId);
      setFavorites(favorites.filter((f) => f._id !== propertyId));
      toast.info("Removed from saved properties");
    } catch (error) {
      console.error("Failed to remove favorite", error);
      toast.error("Failed to remove property");
    }
  };

  return (
    <div className="favorites-wrapper">
      <Navbar />
      
      <main className="favorites-page">
        <header className="favorites-header">
          <div className="favorites-title-group">
            <h1>Saved Properties</h1>
            <p>Your curated wishlist of favorite homes, villas, and stays.</p>
          </div>
          {!loading && favorites.length > 0 && (
            <span className="favorites-count-badge">
              {favorites.length} {favorites.length === 1 ? 'Stay' : 'Stays'}
            </span>
          )}
        </header>

        {loading ? (
          <div className="favorites-loading">
            <FaSpinner className="spin" size={32} />
            <p>Loading your saved properties...</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="empty-state-wrapper">
            <div className="empty-state-card">
              <div className="empty-state-heart-circle">
                <FaHeart />
              </div>
              <h2>Your wishlist is empty</h2>
              <p>
                As you browse through Homely, click the heart icon on any property to save your favorite stays and plan your next journey here.
              </p>
              <button onClick={() => navigate("/")} className="explore-stays-btn">
                <FaCompass /> Explore Stays
              </button>
            </div>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((property) => (
              <div 
                key={property._id} 
                className="favorite-card"
                onClick={() => navigate(`/property/${property._id}`)}
              >
                <div className="favorite-card-image-box">
                  <img 
                    src={property.images?.[0]?.url || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"} 
                    alt={property.title} 
                    loading="lazy"
                  />
                  <button 
                    className="fav-heart-btn active"
                    title="Remove from wishlist"
                    onClick={(e) => removeFavorite(e, property._id)}
                    aria-label="Remove favorite"
                  >
                    <FaHeart />
                  </button>
                  {property.category && (
                    <span className="favorite-badge">{property.category}</span>
                  )}
                </div>

                <div className="favorite-card-body">
                  <div className="favorite-card-top-row">
                    <h3 title={property.title}>{property.title}</h3>
                    <div className="fav-rating">
                      <FaStar /> <span>{property.rating ? Number(property.rating).toFixed(1) : "New"}</span>
                    </div>
                  </div>

                  <p className="fav-location">
                    <FaMapMarkerAlt /> {property.location?.city || "India"}, {property.location?.country || "India"}
                  </p>

                  <div className="fav-pricing-row">
                    <span className="fav-price">
                      <strong>₹{Number(property.price || 0).toLocaleString('en-IN')}</strong>
                      <span className="fav-per-night"> / night</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Favorites;
