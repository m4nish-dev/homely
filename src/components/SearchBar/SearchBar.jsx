import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    console.log("Location:", location);
    console.log("Check In:", checkIn);
    console.log("Check Out:", checkOut);
    console.log("Guests:", guests);
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar">

        <div className="search-section">
          <label>Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="divider"></div>

        <div className="search-section">
          <label>Check In</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>

        <div className="divider"></div>

        <div className="search-section">
          <label>Check Out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <div className="divider"></div>

        <div className="search-section">
          <label>Guests</label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <button
          className="search-icon"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>

      </div>
    </div>
  );
}

export default SearchBar;