import "./PopularDestinations.css";

function PopularDestinations() {
  const cities = [
    {
      name: "Mumbai",
      stays: "2,100+ stays",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=300",
    },
    {
      name: "Delhi",
      stays: "1,850+ stays",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=300",
    },
    {
      name: "Goa",
      stays: "1,500+ stays",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=300",
    },
    {
      name: "Bangalore",
      stays: "1,200+ stays",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=300",
    },
    {
      name: "Hyderabad",
      stays: "1,100+ stays",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=300",
    },
    {
      name: "Jaipur",
      stays: "900+ stays",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=300",
    },
    {
      name: "Kolkata",
      stays: "1,050+ stays",
      image:
        "https://images.unsplash.com/photo-1558431382-27e303142255?w=300",
    },
    {
      name: "Chennai",
      stays: "950+ stays",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=300",
    },
    {
      name: "Pune",
      stays: "1,300+ stays",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=300",
    },
    {
      name: "Manali",
      stays: "700+ stays",
      image:
        "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?w=300",
    },
    {
  name: "Udaipur",
  stays: "650+ stays",
  image:
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=300",

},
    {
      name: "Kerala",
      stays: "1,400+ stays",
      image:
        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=300",
    },
  ];

  return (
    <section className="destinations">
      <div className="section-header">
        <h2>Popular Destinations</h2>
        <p>Explore trending cities loved by travelers.</p>
      </div>

      <div className="destinations-container">
        <div className="destinations-grid">
          {cities.map((city, index) => (
            <div className="city-item" key={index}>
              <img src={city.image} alt={city.name} />

              <div className="city-content">
                <span>{city.name}</span>
                <p>{city.stays}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PopularDestinations;