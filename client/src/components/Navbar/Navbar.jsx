import "./Navbar.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHotel,
  FaBuilding,
  FaHome,
  FaGlobe,
  FaBars,
  FaUserCircle,
  FaTimes,
} from "react-icons/fa";

function Navbar({ setShowLogin, isScrolled }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("Hotels");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Hotels", icon: <FaHotel /> },
    { label: "Flats", icon: <FaBuilding /> },
    { label: "Villas", icon: <FaHome /> },
  ];

  const isHome = location.pathname === "/";

  return (
    <nav className={`navbar ${isHome && !isScrolled ? "navbar-transparent" : "navbar-scrolled"}`}>
      {/* Logo */}
      <div className="navbar-left" onClick={() => navigate("/")}>
        <h2 className="logo">Homely</h2>
      </div>

      {/* Center nav — only on home */}
      {isHome && (
        <div className="navbar-center">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`nav-item ${activeCategory === item.label ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(item.label);
                navigate(`/search?category=${item.label}`);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Right */}
      <div className="navbar-right">
        <button className="host-btn" onClick={() => setShowLogin && setShowLogin(true)}>
          Become a Host
        </button>

        <div className="globe-icon" title="Change Language">
          <FaGlobe />
        </div>

        <div
          className="menu-profile"
          onClick={() => setShowLogin && setShowLogin(true)}
          title="Login / Register"
        >
          <FaBars />
          <FaUserCircle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          {isHome && navItems.map((item) => (
            <div
              key={item.label}
              className={`mobile-nav-item ${activeCategory === item.label ? "active" : ""}`}
              onClick={() => {
                setActiveCategory(item.label);
                setMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
          <div
            className="mobile-nav-item"
            onClick={() => {
              setShowLogin && setShowLogin(true);
              setMobileMenuOpen(false);
            }}
          >
            <FaUserCircle />
            <span>Login / Register</span>
          </div>
          <div
            className="mobile-nav-item accent"
            onClick={() => {
              setShowLogin && setShowLogin(true);
              setMobileMenuOpen(false);
            }}
          >
            <FaHome />
            <span>Become a Host</span>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;