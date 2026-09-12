import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import userService from "../../api/userService";
import Navbar from "../../components/Navbar/Navbar";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await userService.getFavorites();
      setFavorites(data.favorites);
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
    } catch (error) {
      console.error("Failed to remove favorite", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="favorites-page">
        <div className="favorites-header">
          <h1>Saved Properties</h1>
          <p>Your curated list of favorite stays.</p>
        </div>

        {loading ? (
          <div className="loading">Loading favorites...</div>
        ) : favorites.length === 0 ? (
          <div className="empty-state">
            <FaHeart size={48} color="#e5e7eb" />
            <h2>No saved properties yet</h2>
            <p>As you explore, click the heart icon to save your favorite properties here.</p>
            <button onClick={() => navigate("/")} className="explore-btn">Explore Stays</button>
          </div>
        ) : (
          <div className="favorites-grid">
            {favorites.map((property) => (
              <div 
                key={property._id} 
                className="favorite-card"
                onClick={() => navigate(`/property/${property._id}`)}
              >
                <div className="favorite-card-image">
                  <img src={property.images[0]?.url} alt={property.title} />
                  <div 
                    className="heart-icon active"
                    onClick={(e) => removeFavorite(e, property._id)}
                  >
                    <FaHeart />
                  </div>
                </div>
                <div className="favorite-card-content">
                  <div className="favorite-card-header">
                    <h3>{property.title}</h3>
                    <div className="rating">
                      <FaStar /> {property.rating}
                    </div>
                  </div>
                  <p className="location"><FaMapMarkerAlt /> {property.location.city}, {property.location.country}</p>
                  <p className="price"><strong>₹{property.price}</strong> / night</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Favorites;
