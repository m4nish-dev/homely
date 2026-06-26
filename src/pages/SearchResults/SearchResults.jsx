import "./SearchResults.css";
import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function SearchResults() {
  const navigate = useNavigate();

  const currentLocation =
    useLocation();

  const params = new URLSearchParams(
    currentLocation.search
  );

  const searchedLocation =
    params.get("location") || "";

  const [activeFilter, setActiveFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("Recommended");

  const properties = [
    {
      id: 1,
      title: "Luxury Villa",
      category: "Villas",
      location: "Goa",
      rating: 4.9,
      price: 5999,
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },

    {
      id: 2,
      title: "Modern Flat",
      category: "Flats",
      location: "Delhi",
      rating: 4.8,
      price: 3499,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },

    {
      id: 3,
      title: "Beach Resort",
      category: "Resorts",
      location: "Kerala",
      rating: 4.7,
      price: 7999,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    },

    {
      id: 4,
      title: "Mountain Cabin",
      category: "Cabins",
      location: "Manali",
      rating: 4.9,
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
  ];

  let filteredProperties =
    searchedLocation
      ? properties.filter(
          (property) =>
            property.location
              .toLowerCase()
              .includes(
                searchedLocation.toLowerCase()
              )
        )
      : properties;

  if (activeFilter !== "All") {
    filteredProperties =
      filteredProperties.filter(
        (property) =>
          property.category ===
          activeFilter
      );
  }

  if (sortBy === "Low") {
    filteredProperties.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sortBy === "High") {
    filteredProperties.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sortBy === "Rating") {
    filteredProperties.sort(
      (a, b) => b.rating - a.rating
    );
  }

  const filters = [
    "All",
    "Villas",
    "Flats",
    "Resorts",
    "Cabins",
  ];

  return (
    <div className="search-page">

      <div className="search-header">

        <h1>
          {searchedLocation || "All Locations"} •{" "}
          {filteredProperties.length}
          {" "}stays found
        </h1>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
        >
          <option value="Recommended">
            Recommended
          </option>

          <option value="Low">
            Price Low → High
          </option>

          <option value="High">
            Price High → Low
          </option>

          <option value="Rating">
            Top Rated
          </option>

        </select>

      </div>

      <div className="filters">

        {filters.map((filter) => (
          <button
            key={filter}
            className={
              activeFilter === filter
                ? "active-filter"
                : ""
            }
            onClick={() =>
              setActiveFilter(filter)
            }
          >
            {filter}
          </button>
        ))}

      </div>

      <div className="results-grid">

        {filteredProperties.length >
        0 ? (
          filteredProperties.map(
            (property) => (
              <div
                className="result-card"
                key={property.id}
                onClick={() =>
                  navigate(
                    `/property/${property.id}`
                  )
                }
              >
                <img
                  src={property.image}
                  alt={property.title}
                />

                <div className="result-info">

                  <div className="top-row">

                    <h3>
                      {property.title}
                    </h3>

                    <span>
                      ⭐ {property.rating}
                    </span>

                  </div>

                  <p>
                    {property.location}
                  </p>

                  <h4>
                    ₹{property.price}

                    <span>
                      {" "}
                      / night
                    </span>

                  </h4>

                </div>

              </div>
            )
          )
        ) : (
          <h2>
            No properties found
          </h2>
        )}

      </div>

    </div>
  );
}

export default SearchResults;