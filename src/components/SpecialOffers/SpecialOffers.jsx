import "./SpecialOffers.css";
import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaTag, FaClock } from "react-icons/fa";

const offers = [
  {
    id: 1,
    badge: "Flash Deal",
    title: "Last Minute Escapes",
    subtitle: "Book today for this weekend",
    discount: "30% OFF",
    bgColor: "linear-gradient(135deg, #d89b4a 0%, #b87333 100%)",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    expires: "Ends in 6 hrs",
  },
  {
    id: 2,
    badge: "Early Bird",
    title: "Plan Ahead, Save More",
    subtitle: "Book 30 days in advance",
    discount: "20% OFF",
    bgColor: "linear-gradient(135deg, #2f3a2f 0%, #4a5e4a 100%)",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
    expires: "Limited time",
  },
  {
    id: 3,
    badge: "Weekend Special",
    title: "Weekend Getaways",
    subtitle: "Fri – Sun stays, exclusive rates",
    discount: "₹1000 OFF",
    bgColor: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    expires: "This weekend only",
  },
];

function SpecialOffers() {
  const navigate = useNavigate();

  return (
    <section className="offers-section">
      <div className="offers-inner">
        <div className="offers-header">
          <div>
            <span className="offers-eyebrow">🏷️ Limited Time</span>
            <h2>Special Offers</h2>
            <p>Exclusive deals you won't find anywhere else — grab them before they're gone.</p>
          </div>
          <button className="offers-view-all" onClick={() => navigate("/search")}>
            View All Deals <FaArrowRight />
          </button>
        </div>

        <div className="offers-grid">
          {offers.map((offer) => (
            <div
              className="offer-card"
              key={offer.id}
              onClick={() => navigate(`/property/${offer.id}`)}
            >
              {/* Background image */}
              <div
                className="offer-bg"
                style={{ backgroundImage: `url(${offer.image})` }}
              />
              <div className="offer-overlay" style={{ background: offer.bgColor.replace("135deg", "to bottom").replace("linear-gradient(", "linear-gradient(").replace("100%)", "85%)")}} />

              {/* Content */}
              <div className="offer-content">
                <div className="offer-top">
                  <span className="offer-badge">
                    <FaTag /> {offer.badge}
                  </span>
                  <span className="offer-expires">
                    <FaClock /> {offer.expires}
                  </span>
                </div>

                <div className="offer-body">
                  <div className="offer-discount">{offer.discount}</div>
                  <h3>{offer.title}</h3>
                  <p>{offer.subtitle}</p>
                  <button className="offer-cta">
                    Grab Deal <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SpecialOffers;
