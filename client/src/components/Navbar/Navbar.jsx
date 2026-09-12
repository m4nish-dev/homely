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
  FaSignOutAlt,
  FaHeart,
  FaSuitcase
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import userService from "../../api/userService";

function Navbar({ setShowLogin, isScrolled }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState("Hotels");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        {!user ? (
          <button className="host-btn" onClick={() => setShowLogin && setShowLogin(true)}>
            Become a Host
          </button>
        ) : user.role === "user" ? (
          <button className="host-btn" onClick={async () => {
            if (window.confirm("Do you want to upgrade your account to Host to start listing properties?")) {
              try {
                const data = await userService.becomeHost();
                window.location.reload(); // Quickest way to force context hydration of new role
              } catch (err) {
                alert("Failed to become host");
              }
            }
          }}>
            Become a Host
          </button>
        ) : (user.role === "host" || user.role === "admin") ? (
          <button className="host-btn" onClick={() => navigate("/host")}>
            Host Dashboard
          </button>
        ) : null}

        <div className="globe-icon" title="Change Language">
          <FaGlobe />
        </div>

        {user ? (
          <>
            <div 
              className="navbar-favorites-icon" 
              onClick={() => navigate("/favorites")}
              title="Saved Properties"
            >
              <FaHeart color="#4b5563" size={20} />
            </div>
            
            <div className="profile-menu-wrap" style={{ position: "relative" }}>
              <div
                className="user-avatar-btn"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                title={user.name}
              >
                {user.name?.[0]?.toUpperCase() || "U"}
              </div>
              {dropdownOpen && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-name">{user.name}</div>
                  <div className="profile-dropdown-email">{user.email}</div>
                  <hr style={{ margin: "8px 0", border: "none", borderTop: "1px solid #e5e7eb" }} />
                  {user.role === "admin" && (
                    <div
                      className="profile-dropdown-link"
                      onClick={() => { setDropdownOpen(false); navigate("/admin"); }}
                    >
                      <FaGlobe /> Admin Dashboard
                    </div>
                  )}
                  {(user.role === "host" || user.role === "admin") && (
                    <div
                      className="profile-dropdown-link"
                      onClick={() => { setDropdownOpen(false); navigate("/host"); }}
                    >
                      <FaHome /> Host Dashboard
                    </div>
                  )}
                  <div
                    className="profile-dropdown-link"
                    onClick={() => { setDropdownOpen(false); navigate("/my-bookings"); }}
                  >
                    <FaSuitcase /> My Bookings
                  </div>
                  <div
                    className="profile-dropdown-link"
                    onClick={() => { setDropdownOpen(false); navigate("/settings"); }}
                  >
                    <FaUserCircle /> Settings
                  </div>
                  <button
                    className="profile-dropdown-logout"
                    onClick={async () => { setDropdownOpen(false); await logout(); }}
                  >
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <div
            className="menu-profile"
            onClick={() => setShowLogin && setShowLogin(true)}
            title="Login / Register"
          >
            <FaBars />
            <FaUserCircle />
          </div>
        )}

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