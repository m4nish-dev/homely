import "./PopularDestinations.css";

function PopularDestinations() {
  const cities = [
    {
      name: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=200",
    },
    {
      name: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=200",
    },
    {
      name: "New Delhi",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200",
    },
    {
      name: "Hyderabad",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?w=200",
    },
    {
      name: "Pune",
      image:
        "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=200",
    },
    {
      name: "Kolkata",
      image:
        "https://images.unsplash.com/photo-1558431382-27e303142255?w=200",
    },
    {
      name: "Chennai",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200",
    },
    {
      name: "Gurgaon",
      image:
        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=200",
    },
    {
      name: "Goa",
      image:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200",
    },
    {
      name: "Indore",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=200",
    },
    {
      name: "Coimbatore",
      image:
        "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=200",
    },
    {
      name: "Jaipur",
      image:
        "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=200",
    },
  ];

  return (
    <section className="destinations">
      <h2>Popular destinations</h2>

      <div className="destinations-grid">
        {cities.map((city, index) => (
          <div className="city-item" key={index}>
            <img src={city.image} alt={city.name} />
            <span>{city.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PopularDestinations;