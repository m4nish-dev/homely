import { useState, useEffect } from "react";
import propertyService from "../../api/propertyService";
import { FaMapMarkerAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./NewlyAddedProperties.css";

function NewlyAddedProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
