import "./PopularDestinations.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PopularDestinations() {
  const navigate = useNavigate();

  const cities = [
    { name: "Mumbai", stays: "2,100+", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=1000&q=80", emoji: "🌆" },
    { name: "Delhi", stays: "1,850+", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&q=80", emoji: "🏛️" },
    { name: "Goa", stays: "1,500+", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80", emoji: "🌴" },
    { name: "Bangalore", stays: "1,200+", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=800&q=80", emoji: "🌿" },
    { name: "Hyderabad", stays: "1,100+", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=800&q=80", emoji: "🕌" },
    { name: "Jaipur", stays: "900+", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1000&q=80", emoji: "🏰" },
  ];

  return (
    <section className="destinations" id="destinations">
      <div className="section-header">
        <h2>Popular Destinations</h2>
        <p>Explore trending cities loved by travelers across India.</p>
      </div>

      <div className="bento-grid">
        {cities.map((city, index) => (
          <div
            key={city.name}
            className={`bento-item bento-item-${index}`}
            onClick={() => navigate(`/search?location=${city.name}`)}
          >
            <img src={city.image} alt={city.name} loading="lazy" />
            <div className="bento-overlay" />
            <div className="bento-info">
              <span className="bento-name">{city.name}</span>
              <p className="bento-stays">{city.stays} stays</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;