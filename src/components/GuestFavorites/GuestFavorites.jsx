import "./GuestFavorites.css";
import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowRight } from "react-icons/fa";

function GuestFavorites() {
  const navigate = useNavigate();

  const favorites = [
    {
      id: 1,
      name: "The Grand Palace",
      location: "Mumbai",
      rating: 4.9,
      reviews: 312,
      price: "₹8,499",
      tag: "🏆 Traveler Choice",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Goa",
      rating: 4.8,
      reviews: 245,
      price: "₹6,999",
      tag: "🌊 Beachfront",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    },
    {
      id: 3,
      name: "Mountain Escape",
      location: "Manali",
      rating: 4.7,
      reviews: 178,
      price: "₹5,499",
      tag: "🏔️ Scenic View",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
    },
    {
      id: 4,
      name: "Heritage Palace",
      location: "Jaipur",
      rating: 4.9,
      reviews: 420,
      price: "₹9,999",
      tag: "🏆 Traveler Choice",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
    },
    {
      id: 5,
      name: "Lakeview Retreat",
      location: "Udaipur",
      rating: 4.8,
      reviews: 215,
      price: "₹7,299",
      tag: "🛶 Lakeside",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    },
    {
      id: 6,
      name: "Urban Oasis Flat",
      location: "Delhi",
      rating: 4.7,
      reviews: 156,
      price: "₹4,899",
      tag: "🏙️ City Center",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    },
    {
      id: 7,
      name: "Forest Cabin",
      location: "Coorg",
      rating: 4.9,
      reviews: 198,
      price: "₹5,999",
      tag: "🌲 Nature Stay",
      image: "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=800&q=80",
    },
    {
      id: 8,
      name: "Cliffside Villa",
      location: "Vizag",
      rating: 4.8,
      reviews: 275,
      price: "₹8,999",
      tag: "🌅 Premium",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    },
  ];

  return (
    <section className="favorites">
      <div className="favorites-header">
        <div>
          <h2>Top Rated Properties</h2>
          <p>Loved by thousands of travelers across India.</p>
        </div>
        <button className="view-all-btn" onClick={() => navigate("/search")}>
          View All <FaArrowRight />
        </button>
      </div>
      <div className="favorites-marquee-container">
        <div className="favorites-marquee-track">
          {[...favorites, ...favorites, ...favorites].map((hotel, index) => (
            <div
              className="favorite-card"
              key={`${hotel.id}-${index}`}
              onClick={() => navigate(`/property/${hotel.id}`)}
            >
              <div className="fav-image-wrap">
                <img src={hotel.image} alt={hotel.name} loading="lazy" />
                <div className="fav-overlay" />
                <div className="fav-tag">{hotel.tag}</div>
              </div>

              <div className="fav-info">
                <div className="fav-top">
                  <h3>{hotel.name}</h3>
                  <span className="fav-rating">
                    <FaStar /> {hotel.rating}
                  </span>
                </div>
                <p className="fav-location">📍 {hotel.location}</p>
                <div className="fav-bottom">
                  <span className="fav-reviews">{hotel.reviews} reviews</span>
                  <span className="fav-price">
                    {hotel.price}<span className="fav-night"> /night</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default GuestFavorites;