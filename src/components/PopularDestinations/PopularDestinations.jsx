import "./PopularDestinations.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function PopularDestinations() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const cities = [
    { name: "Mumbai", stays: "2,100+", image: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=400&q=80", emoji: "🌆" },
    { name: "Delhi", stays: "1,850+", image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80", emoji: "🏛️" },
    { name: "Goa", stays: "1,500+", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80", emoji: "🌴" },
    { name: "Bangalore", stays: "1,200+", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=400&q=80", emoji: "🌿" },
    { name: "Hyderabad", stays: "1,100+", image: "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=400&q=80", emoji: "🕌" },
    { name: "Jaipur", stays: "900+", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&q=80", emoji: "🏰" },
    { name: "Kolkata", stays: "1,050+", image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=400&q=80", emoji: "🎭" },
    { name: "Chennai", stays: "950+", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80", emoji: "🌊" },
    { name: "Pune", stays: "1,300+", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&q=80", emoji: "🌄" },
    { name: "Manali", stays: "700+", image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=400&q=80", emoji: "🏔️" },
    { name: "Udaipur", stays: "650+", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=400&q=80", emoji: "🛶" },
    { name: "Kerala", stays: "1,400+", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&q=80", emoji: "🌺" },
  ];

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 340, behavior: "smooth" });
    }
  };

  return (
    <section className="destinations">
      <div className="section-header">
        <h2>Popular Destinations</h2>
        <p>Explore trending cities loved by travelers across India.</p>
      </div>

      <div className="destinations-wrapper">
        <button className="dest-arrow left" onClick={() => scroll(-1)} aria-label="Scroll left">
          <FaChevronLeft />
        </button>

        <div className="destinations-scroll" ref={scrollRef}>
          {cities.map((city) => (
            <div
              key={city.name}
              className="city-card"
              onClick={() => navigate(`/search?location=${city.name}`)}
            >
              <div className="city-img-wrap">
                <img src={city.image} alt={city.name} loading="lazy" />
                <div className="city-overlay" />
                <div className="city-info">
                  <span className="city-name">{city.name}</span>
                  <p className="city-stays">{city.stays} stays</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="dest-arrow right" onClick={() => scroll(1)} aria-label="Scroll right">
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
}

export default PopularDestinations;