import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
        <div className="hero-tabs">
            <button className="active-tab">Hotels</button>
            <button>Flats</button>
            <button>Villas</button>
            <button>Resorts</button>
        </div>

      <h1>
        Find Your Perfect Stay
      </h1>

      <p>
        Hotels, Villas and Luxury Apartments
      </p>

      <div className="search-box">

        <div className="search-item">
          <label>Where</label>
          <input
            type="text"
            placeholder="Search destinations"
          />
        </div>

        <div className="search-item">
          <label>Check In</label>
          <input type="date" />
        </div>

        <div className="search-item">
          <label>Check Out</label>
          <input type="date" />
        </div>

        <div className="search-item">
          <label>Guests</label>
          <input
            type="number"
            placeholder="2"
          />
        </div>

        <button className="search-btn">
          Search
        </button>

      </div>

    </section>
  );
}

export default Hero;