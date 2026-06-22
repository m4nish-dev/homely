import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";

function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  const handleSearch = () => {
    console.log("Location:", location);
    console.log("Check In:", checkIn);
    console.log("Check Out:", checkOut);
    console.log("Guests:", guests);
  };

  return (
    <div className="searchbar-wrapper">

      <div
        className={`searchbar ${
          isScrolled ? "searchbar-small" : ""
        }`}
      >

        {isScrolled ? (
          <>
            <div className="compact-search">

              <span>
                {location || "Anywhere"}
              </span>

              <div className="compact-divider"></div>

              <span>
                {checkIn
                  ? "Any Week"
                  : "Any Week"}
              </span>

              <div className="compact-divider"></div>

              <span>
                {guests
                  ? `${guests} Guest${
                      guests > 1 ? "s" : ""
                    }`
                  : "Add Guests"}
              </span>

              <button
                className="search-icon"
                onClick={handleSearch}
              >
                <FaSearch />
              </button>

            </div>
          </>
        ) : (
          <>
            <div className="search-section">
              <label>Where</label>
              <input
                type="text"
                placeholder="Search destinations"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
              />
            </div>

            <div className="divider"></div>

            <div className="search-section">
              <label>Check In</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) =>
                  setCheckIn(e.target.value)
                }
              />
            </div>

            <div className="divider"></div>

            <div className="search-section">
              <label>Check Out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) =>
                  setCheckOut(e.target.value)
                }
              />
            </div>

            <div className="divider"></div>

            <div className="search-section">
              <label>Guests</label>
              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value)
                }
              />
            </div>

            <button
              className="search-icon"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </>
        )}
      </div>

    </div>
  );
}

export default SearchBar;