import "./GuestFavorites.css";

function GuestFavorites() {
  const favorites = [
    {
      id: 1,
      name: "The Grand Palace",
      location: "Mumbai",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    },
    {
      id: 2,
      name: "Ocean View Resort",
      location: "Goa",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    },
    {
      id: 3,
      name: "Mountain Escape",
      location: "Manali",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
  ];

  return (
    <section className="favorites">

      <div className="section-header">
        <h2>Top Rated Properties</h2>

        <p>
          Loved by thousands of travelers across India.
        </p>
      </div>

      <div className="favorites-grid">
        {favorites.map((hotel) => (
          <div
            className="favorite-card"
            key={hotel.id}
          >
            <div className="image-wrapper">

              <img
                src={hotel.image}
                alt={hotel.name}
              />

              <div className="traveler-badge">
                🏆 Traveler Choice
              </div>

            </div>

            <div className="favorite-info">

              <div className="favorite-top">
                <h3>{hotel.name}</h3>

                <span className="rating">
                  ⭐ {hotel.rating}
                </span>
              </div>

              <p>{hotel.location}</p>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GuestFavorites;