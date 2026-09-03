import "./Testimonials.css";
import { useState, useEffect } from "react";
import { FaStar, FaChevronLeft, FaChevronRight, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    avatar: "P",
    color: "#d89b4a",
    rating: 5,
    text: "Homely made our anniversary trip absolutely magical. The villa in Goa was stunning — exactly as shown, pristine clean, and the host was incredibly attentive. Will never book anywhere else!",
    property: "Luxury Villa, Goa",
    date: "August 2026",
  },
  {
    name: "Rahul Mehta",
    location: "Bangalore",
    avatar: "R",
    color: "#6366f1",
    rating: 5,
    text: "I travel for work every week and Homely has become my go-to. The corporate flats are always top-notch, and the booking process takes under 2 minutes. Customer support sorted a last-minute change instantly.",
    property: "Modern Flat, Delhi",
    date: "July 2026",
  },
  {
    name: "Sneha Iyer",
    location: "Chennai",
    avatar: "S",
    color: "#22c55e",
    rating: 5,
    text: "Booked the Udaipur lake view suite for our honeymoon — it was beyond words. The service fee was tiny and totally worth it. The view was out of a painting. Absolutely 5 stars, no question!",
    property: "Lake View Suite, Udaipur",
    date: "June 2026",
  },
  {
    name: "Aryan Kapoor",
    location: "Delhi",
    avatar: "A",
    color: "#ef4444",
    rating: 5,
    text: "Took a spontaneous trip to Manali — found a cozy mountain cabin on Homely at 11 PM, booked it instantly, and checked in the next morning. The process was seamless and the price was unbeatable.",
    property: "Mountain Cabin, Manali",
    date: "May 2026",
  },
  {
    name: "Meera Nair",
    location: "Kochi",
    avatar: "M",
    color: "#0ea5e9",
    rating: 5,
    text: "The Heritage Haveli in Jaipur felt like stepping into a royal era. Verified photos, accurate description, super responsive host. Homely's Best Price Guarantee saved us ₹800 compared to other sites!",
    property: "Heritage Haveli, Jaipur",
    date: "April 2026",
  },
];

function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  // Auto-play dynamic reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length);
    }, 5000); // 5 seconds per slide
    return () => clearInterval(timer);
  }, [current]); // Reset timer if user manually clicks

  const getCard = (offset) => {
    const idx = (current + offset + testimonials.length) % testimonials.length;
    return testimonials[idx];
  };

  return (
    <section className="testimonials">
      <div className="testi-inner">
        <div className="testi-header">
          <span className="testi-eyebrow">What Our Guests Say</span>
          <h2>Loved by Millions of Travelers</h2>
          <p>Real reviews from real guests. No filters, no fabrications.</p>
        </div>

        {/* Rating Overview */}
        <div className="testi-overview">
          <div className="testi-big-rating">
            <span className="testi-score">4.9</span>
            <div>
              <div className="testi-stars">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p>Based on 50,000+ reviews</p>
            </div>
          </div>

          <div className="testi-bars">
            {[
              { label: "5 Stars", pct: 92 },
              { label: "4 Stars", pct: 6 },
              { label: "3 Stars", pct: 2 },
            ].map((b) => (
              <div className="testi-bar-row" key={b.label}>
                <span>{b.label}</span>
                <div className="testi-bar-track">
                  <div className="testi-bar-fill" style={{ width: `${b.pct}%` }} />
                </div>
                <span>{b.pct}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Carousel */}
        <div className="testi-carousel">
          {/* Side cards (decorative) */}
          <div className="testi-card testi-card-side left" onClick={prev}>
            <FaQuoteLeft className="testi-quote" />
            <p>{getCard(-1).text.slice(0, 80)}…</p>
            <div className="testi-reviewer">
              <div className="testi-avatar" style={{ background: getCard(-1).color }}>
                {getCard(-1).avatar}
              </div>
              <div>
                <strong>{getCard(-1).name}</strong>
                <span>{getCard(-1).location}</span>
              </div>
            </div>
          </div>

          {/* Main card */}
          <div className="testi-card testi-card-main">
            <FaQuoteLeft className="testi-quote" />
            <div className="testi-stars main-stars">
              {[...Array(testimonials[current].rating)].map((_, i) => <FaStar key={i} />)}
            </div>
            <p className="testi-text">{testimonials[current].text}</p>
            <div className="testi-reviewer">
              <div className="testi-avatar large" style={{ background: testimonials[current].color }}>
                {testimonials[current].avatar}
              </div>
              <div>
                <strong>{testimonials[current].name}</strong>
                <span>{testimonials[current].location}</span>
                <span className="testi-property">{testimonials[current].property}</span>
              </div>
            </div>
            <div className="testi-date">{testimonials[current].date}</div>
          </div>

          {/* Side card right */}
          <div className="testi-card testi-card-side right" onClick={next}>
            <FaQuoteLeft className="testi-quote" />
            <p>{getCard(1).text.slice(0, 80)}…</p>
            <div className="testi-reviewer">
              <div className="testi-avatar" style={{ background: getCard(1).color }}>
                {getCard(1).avatar}
              </div>
              <div>
                <strong>{getCard(1).name}</strong>
                <span>{getCard(1).location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="testi-controls">
          <button className="testi-arrow" onClick={prev} aria-label="Previous">
            <FaChevronLeft />
          </button>
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === current ? "active" : ""}`}
                onClick={() => setCurrent(i)}
              >
                {i === current && (
                  <div key={current} className="testi-dot-progress" />
                )}
              </button>
            ))}
          </div>
          <button className="testi-arrow" onClick={next} aria-label="Next">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
