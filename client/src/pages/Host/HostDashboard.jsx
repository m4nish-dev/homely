import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import propertyService from "../../api/propertyService";
import Navbar from "../../components/Navbar/Navbar";
import { FaHome, FaPlus, FaTrash, FaSpinner, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./HostDashboard.css";

function HostDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  
  // New Property Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("Hotels");
  const [maxGuests, setMaxGuests] = useState("4");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || (user.role !== "host" && user.role !== "admin")) {
      navigate("/");
      return;
    }

    const fetchProperties = async () => {
      try {
        const data = await propertyService.getMyProperties();
        setProperties(data.properties);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [user, navigate]);

  const handleFileChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("maxGuests", maxGuests);
    
    // We send location as a JSON string to match backend validators
    formData.append("location", JSON.stringify({
      city,
      address,
      country: "India",
      coordinates: { lat: 28.6139, lng: 77.2090 } // Dummy default coordinates
    }));

    // Dummy default amenities
    formData.append("amenities", JSON.stringify(["WiFi", "AC", "Kitchen", "Parking"]));

    images.forEach(img => formData.append("images", img));

    try {
      const data = await propertyService.createProperty(formData);
      setProperties([data.property, ...properties]);
      setIsAdding(false);
      
      // Reset form
      setTitle(""); setDescription(""); setPrice(""); setCity(""); setAddress(""); setImages([]);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create property. Do you have Cloudinary keys configured?");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;
    try {
      await propertyService.deleteProperty(id);
      setProperties(properties.filter(p => p._id !== id));
    } catch (err) {
      alert("Failed to delete property");
    }
  };

  if (!user || (user.role !== "host" && user.role !== "admin")) return null;

  return (
    <div className="host-page">
      <Navbar />
      <div className="host-container">
        
        <div className="host-header">
          <div>
            <h1>Host Dashboard</h1>
            <p>Manage your properties and listings here.</p>
          </div>
          <button className="add-property-btn" onClick={() => setIsAdding(!isAdding)}>
            {isAdding ? "Cancel" : <><FaPlus /> Add Listing</>}
          </button>
        </div>

        {isAdding && (
          <div className="add-property-form">
            <h2>Add New Property</h2>
            {error && <div className="form-error">{error}</div>}
            
            <form onSubmit={handleCreateProperty}>
              <div className="form-row">
                <div className="form-group">
                  <label>Title</label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} required placeholder="Cozy Villa in the Hills" />
                </div>
                <div className="form-group">
                  <label>Price per Night (₹)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} required min="100" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input type="text" value={city} onChange={e => setCity(e.target.value)} required placeholder="Manali" />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} required placeholder="123 Pine Road" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="Hotels">Hotels</option>
                    <option value="Flats">Flats</option>
                    <option value="Villas">Villas</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Max Guests</label>
                  <input type="number" value={maxGuests} onChange={e => setMaxGuests(e.target.value)} required min="1" max="20" />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea value={description} onChange={e => setDescription(e.target.value)} required rows="4"></textarea>
              </div>

              <div className="form-group">
                <label>Upload Images (Max 10)</label>
                <input type="file" multiple accept="image/*" onChange={handleFileChange} required />
              </div>

              <button type="submit" disabled={uploading} className="submit-listing-btn">
                {uploading ? <FaSpinner className="spin" /> : "Publish Listing"}
              </button>
            </form>
          </div>
        )}

        <div className="host-properties">
          {loading ? (
            <div className="host-loading">Loading your properties...</div>
          ) : properties.length === 0 ? (
            <div className="no-properties">
              <FaHome className="no-prop-icon" />
              <h3>No Properties Listed Yet</h3>
              <p>You haven't listed any properties. Click 'Add Listing' to start earning!</p>
            </div>
          ) : (
            <div className="properties-grid">
              {properties.map(p => (
                <div key={p._id} className="host-property-card">
                  <img src={p.images?.[0]?.url} alt={p.title} />
                  <div className="host-property-info">
                    <h4>{p.title}</h4>
                    <p className="location"><FaMapMarkerAlt /> {p.location?.city}</p>
                    <p className="price">₹{p.price.toLocaleString()} <span>/ night</span></p>
                    <div className="host-property-actions">
                      <span className={`status ${p.isActive ? "active" : "inactive"}`}>
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                      <button onClick={() => handleDelete(p._id)} className="delete-btn"><FaTrash /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HostDashboard;
