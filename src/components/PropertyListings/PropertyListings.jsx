import "./PropertyListings.css";

function PropertyListings() {
  const properties = [
    {
      id: 1,
      title: "Luxury Villa",
      location: "Goa",
      rating: 4.9,
      price: "₹5,999",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    },
    {
      id: 2,
      title: "Modern Flat",
      location: "Delhi",
      rating: 4.8,
      price: "₹3,499",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
    {
      id: 3,
      title: "Beach Resort",
      location: "Kerala",
      rating: 4.7,
      price: "₹7,999",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    },
    {
      id: 4,
      title: "Mountain Cabin",
      location: "Manali",
      rating: 4.9,
      price: "₹4,999",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    },
  ];

  return (
    <section className="listings">
      <h2>Popular Stays</h2>

      <div className="listings-grid">

        {properties.map((property) => (

          <div
            className="listing-card"
            key={property.id}
          >

            <img
              src={property.image}
              alt={property.title}
            />

            <div className="listing-info">

              <div className="top-row">
                <h3>{property.title}</h3>
                <span>⭐ {property.rating}</span>
              </div>

              <p>{property.location}</p>

              <h4>{property.price}/night</h4>

            </div>

          </div>

        ))}

      </div>
    </section>
  );
}

export default PropertyListings;