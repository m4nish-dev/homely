// Shared property data – used across PropertyListings, PropertyDetails, Booking, SearchResults
const hosts = [
  { name: "Priya Sharma", since: "2019" },
  { name: "Arjun Mehta", since: "2021" },
  { name: "Ananya Nair", since: "2018" },
  { name: "Vikram Singh", since: "2020" },
  { name: "Rajesh Kumar", since: "2017" },
  { name: "Meera Patel", since: "2020" },
  { name: "Rohan Gupta", since: "2022" },
  { name: "Sneha Iyer", since: "2019" },
];

const descriptions = {
  Villas:
    "Indulge in the finest luxury at this sprawling villa, complete with a private pool, lush garden, and elegant interiors. Ideal for families, couples, and groups seeking a world-class retreat.",
  Flats:
    "A sleek, fully-furnished modern flat in the heart of the city. Perfect for business travellers and urban explorers who want comfort without compromise.",
  Resorts:
    "Wake up to breathtaking views at this premium resort. Enjoy curated amenities, spa services, and locally-inspired cuisine — every detail is designed to relax and refresh.",
  Cabins:
    "Escape into nature at this enchanting cabin hideaway. Surrounded by trees and mountain air, it's the perfect antidote to city life — cosy, quiet, and unforgettable.",
};

const amenitiesByCategory = {
  Villas: ["Private Pool", "Free WiFi", "Free Parking", "Breakfast Included", "Air Conditioning", "BBQ Grill"],
  Flats: ["Free WiFi", "Smart TV", "Fully Equipped Kitchen", "Washing Machine", "Air Conditioning", "City View"],
  Resorts: ["Spa & Wellness", "Restaurant On-Site", "Swimming Pool", "Free WiFi", "Room Service", "Gym"],
  Cabins: ["Mountain View", "Bonfire Area", "Free Parking", "Free WiFi", "Hiking Trails", "Hot Shower"],
};

const highlightsByCategory = {
  Villas: [{ icon: "🛏️", label: "3 Bedrooms" }, { icon: "👥", label: "6 Guests" }, { icon: "🛁", label: "2 Bathrooms" }, { icon: "🏊", label: "Private Pool" }],
  Flats: [{ icon: "🛏️", label: "1 Bedroom" }, { icon: "👥", label: "2 Guests" }, { icon: "🛁", label: "1 Bathroom" }, { icon: "🏙️", label: "City View" }],
  Resorts: [{ icon: "🛏️", label: "Suite Room" }, { icon: "👥", label: "4 Guests" }, { icon: "🛁", label: "2 Bathrooms" }, { icon: "🌊", label: "Ocean View" }],
  Cabins: [{ icon: "🛏️", label: "2 Bedrooms" }, { icon: "👥", label: "4 Guests" }, { icon: "🛁", label: "1 Bathroom" }, { icon: "🏔️", label: "Mountain View" }],
};

const imageBank = [
  [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    "https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
  ],
  [
    "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=1200&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    "https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=1200&q=80",
  ],
];

const titles = ["Luxury Stay", "Modern Retreat", "Cozy Getaway", "Heritage Escape", "Panoramic View", "Nature Nest", "Grand Escape", "Serene Hideaway"];
const locations = ["Mumbai", "Delhi", "Goa", "Bangalore", "Hyderabad", "Jaipur", "Kerala", "Manali"];
const categories = ["Villas", "Flats", "Resorts", "Cabins"];
const prices = [3999, 4499, 4999, 5499, 5999, 6499, 6999, 7499, 7999, 8499, 8999, 3499];

export const ALL_PROPERTIES = [];

let id = 1;
for (const category of categories) {
  for (let i = 0; i < 8; i++) {
    const imgs = imageBank[(id - 1) % imageBank.length];
    const host = hosts[i % hosts.length];
    const priceNum = prices[(id - 1) % prices.length];
    ALL_PROPERTIES.push({
      id,
      title: `${titles[i]} ${category.slice(0, -1)}`,
      category,
      location: locations[i],
      rating: parseFloat((4 + Math.sin(id) * 0.45 + 0.55).toFixed(1)),
      reviews: 20 + ((id * 37 + 13) % 290),
      price: `₹${priceNum.toLocaleString()}`,
      priceNum,
      isNew: i < 2,
      images: imgs,
      image: imgs[0],
      host: host.name,
      hostSince: host.since,
      description: descriptions[category],
      amenities: amenitiesByCategory[category],
      highlights: highlightsByCategory[category],
    });
    id++;
  }
}

export default ALL_PROPERTIES;
