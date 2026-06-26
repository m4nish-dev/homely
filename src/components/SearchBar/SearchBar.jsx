import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar({ isScrolled }) {
  const navigate = useNavigate();

  const [location, setLocation] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [adults, setAdults] =
    useState(1);

  const [children, setChildren] =
    useState(0);

  const [showLocationPopup, setShowLocationPopup] =
    useState(false);

  const [showGuestPopup, setShowGuestPopup] =
    useState(false);

  const locationRef = useRef(null);
  const guestRef = useRef(null);

  const locations = [
    "Goa",
    "Delhi",
    "Mumbai",
    "Bangalore",
  ];

  const totalGuests = adults + children;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        locationRef.current &&
        !locationRef.current.contains(e.target)
      ) {
        setShowLocationPopup(false);
      }

      if (
        guestRef.current &&
        !guestRef.current.contains(e.target)
      ) {
        setShowGuestPopup(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSearch = () => {
    const searchParams =
      new URLSearchParams();

    if (location) {
      searchParams.set("location", location);
    }

    if (checkIn) {
      searchParams.set("checkIn", checkIn);
    }

    if (checkOut) {
      searchParams.set("checkOut", checkOut);
    }

    searchParams.set("guests", totalGuests);

    navigate(
      `/search?${searchParams.toString()}`
    );
  };

  return (
    <div
      className={`searchbar-wrapper ${
        isScrolled
          ? "searchbar-wrapper-scrolled"
          : ""
      }`}
    >
      <div
        className={`searchbar ${
          isScrolled ? "searchbar-small" : ""
        }`}
      >
        {isScrolled ? (
          <div className="compact-search">
            <span>{location || "Anywhere"}</span>

            <div className="compact-divider"></div>

            <span>
              {checkIn && checkOut
                ? `${checkIn} - ${checkOut}`
                : "Any Week"}
            </span>

            <div className="compact-divider"></div>

            <span>
              {totalGuests > 0
                ? `${totalGuests} Guest${
                    totalGuests > 1 ? "s" : ""
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
        ) : (
          <>
            <div
              className="search-section location-section"
              ref={locationRef}
            >
              <label>Where</label>

              <input
                type="text"
                placeholder="Search destinations"
                value={location}
                readOnly
                onClick={() => {
                  setShowLocationPopup(
                    !showLocationPopup
                  );
                  setShowGuestPopup(false);
                }}
              />

              {showLocationPopup && (
                <div className="location-popup">
                  <h4>
                    Popular Destinations
                  </h4>

                  {locations.map((place) => (
                    <div
                      key={place}
                      className="location-option"
                      onClick={() => {
                        setLocation(place);
                        setShowLocationPopup(false);
                      }}
                    >
                      {place}
                    </div>
                  ))}
                </div>
              )}
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

            <div
              className="search-section guest-section"
              ref={guestRef}
            >
              <label>Guests</label>

              <input
                type="text"
                readOnly
                value={`${totalGuests} Guest${
                  totalGuests > 1 ? "s" : ""
                }`}
                onClick={() => {
                  setShowGuestPopup(
                    !showGuestPopup
                  );
                  setShowLocationPopup(false);
                }}
              />

              {showGuestPopup && (
                <div className="guest-popup">
                  <div className="guest-row">
                    <div>
                      <h4>Adults</h4>
                      <p>
                        Ages 13 or above
                      </p>
                    </div>

                    <div className="guest-controls">
                      <button
                        onClick={() =>
                          adults > 1 &&
                          setAdults(adults - 1)
                        }
                      >
                        −
                      </button>

                      <span>{adults}</span>

                      <button
                        onClick={() =>
                          setAdults(adults + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="guest-row">
                    <div>
                      <h4>Children</h4>
                      <p>Ages 2–12</p>
                    </div>

                    <div className="guest-controls">
                      <button
                        onClick={() =>
                          children > 0 &&
                          setChildren(
                            children - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{children}</span>

                      <button
                        onClick={() =>
                          setChildren(
                            children + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
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