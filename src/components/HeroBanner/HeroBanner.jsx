import "./HeroBanner.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80",
    label: "Luxury Escapes",
    title: "Find Your Perfect Stay",
    subtitle: "Discover premium hotels, villas and resorts across India.",
  },
  {
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80",
    label: "Beach Retreats",
    title: "Wake Up to the Ocean",
    subtitle: "Handpicked beachside stays for unforgettable memories.",
  },
  {
    image: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=1600&q=80",
    label: "Mountain Hideaways",
    title: "Escape to the Mountains",
    subtitle: "Cozy cabins and scenic retreats in the heart of nature.",
  },
];

function HeroBanner({ isScrolled }) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((index + slides.length) % slides.length);
      setAnimating(false);
    }, 350);
  };

  // Auto-slide every 6s
  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 6000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="hero-banner-wrapper">
      {/* The SearchBar overlays the Hero */}
      <div className={`hero-search-container ${isScrolled ? "scrolled" : ""}`}>
        <SearchBar isScrolled={isScrolled} />
      </div>

      <div className="hero-banner">
        {/* Background slides */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={`hero-slide ${i === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        
        {/* Darker gradient overlay at top for navbar/search readability */}
        <div className="hero-overlay" />

        {/* Content */}
        <div className={`hero-content ${animating ? "hero-content-exit" : "hero-content-enter"}`}>
          <span className="hero-label">{slide.label}</span>
          <h1>{slide.title}</h1>
          <p>{slide.subtitle}</p>

          <div className="hero-actions">
            <button className="hero-btn primary" onClick={() => navigate("/search")}>
              Explore Stays
            </button>
            <button className="hero-btn secondary" onClick={() => navigate("/search")}>
              View All Destinations
            </button>
          </div>
        </div>

        {/* Arrows */}
        <button className="hero-arrow left" onClick={() => goTo(current - 1)}>
          <FaChevronLeft />
        </button>
        <button className="hero-arrow right" onClick={() => goTo(current + 1)}>
          <FaChevronRight />
        </button>

        {/* Dots */}
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;