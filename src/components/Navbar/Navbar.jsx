import "./Navbar.css";

import { FaHotel } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-left">
        <h2 className="logo">Homely</h2>
      </div>

      <div className="navbar-center">

        <div className="nav-item active">
          <FaHotel />
          <span>Hotels</span>
        </div>

        <div className="nav-item">
          <FaBuilding />
          <span>Flats</span>
        </div>

        <div className="nav-item">
          <FaHome />
          <span>Villas</span>
        </div>

      </div>

      <div className="navbar-right">

        <button className="host-btn">
          Become a Host
        </button>

        <div className="globe-icon">
          <FaGlobe />
        </div>

        <div className="menu-profile">
          <FaBars />
          <FaUserCircle />
        </div>

      </div>

    </nav>
  );
}

export default Navbar;