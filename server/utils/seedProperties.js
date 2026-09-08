import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';
import User from '../models/User.js';
import Property from '../models/Property.js';
import connectDB from '../config/db.js';

dotenv.config();

const descriptions = {
  Villas: "Indulge in the finest luxury at this sprawling villa, complete with a private pool, lush garden, and elegant interiors. Ideal for families, couples, and groups seeking a world-class retreat.",
  Flats: "A sleek, fully-furnished modern flat in the heart of the city. Perfect for business travellers and urban explorers who want comfort without compromise.",
  Resorts: "Wake up to breathtaking views at this premium resort. Enjoy curated amenities, spa services, and locally-inspired cuisine — every detail is designed to relax and refresh.",
  Cabins: "Escape into nature at this enchanting cabin hideaway. Surrounded by trees and mountain air, it's the perfect antidote to city life — cosy, quiet, and unforgettable.",
  Hotels: "Experience world-class hospitality in our premium hotels. Enjoy luxurious rooms, daily housekeeping, 24/7 room service, and stunning city views right from your window.",
};

const amenitiesByCategory = {
  Villas: ["Private Pool", "Free WiFi", "Free Parking", "Breakfast Included", "Air Conditioning", "BBQ Grill"],
  Flats: ["Free WiFi", "Smart TV", "Fully Equipped Kitchen", "Washing Machine", "Air Conditioning", "City View"],
  Resorts: ["Spa & Wellness", "Restaurant On-Site", "Swimming Pool", "Free WiFi", "Room Service", "Gym"],
  Cabins: ["Mountain View", "Bonfire Area", "Free Parking", "Free WiFi", "Hiking Trails", "Hot Shower"],
  Hotels: ["Free WiFi", "Room Service", "Daily Housekeeping", "Restaurant On-Site", "Gym", "Air Conditioning"],
};

const highlightsByCategory = {
  Villas: [{ icon: "bed", label: "3 Bedrooms" }, { icon: "users", label: "6 Guests" }, { icon: "bath", label: "2 Bathrooms" }, { icon: "pool", label: "Private Pool" }],
  Flats: [{ icon: "bed", label: "1 Bedroom" }, { icon: "users", label: "2 Guests" }, { icon: "bath", label: "1 Bathroom" }, { icon: "city", label: "City View" }],
  Resorts: [{ icon: "bed", label: "Suite Room" }, { icon: "users", label: "4 Guests" }, { icon: "bath", label: "2 Bathrooms" }, { icon: "ocean", label: "Ocean View" }],
  Cabins: [{ icon: "bed", label: "2 Bedrooms" }, { icon: "users", label: "4 Guests" }, { icon: "bath", label: "1 Bathroom" }, { icon: "mountain", label: "Mountain View" }],
  Hotels: [{ icon: "bed", label: "Premium Room" }, { icon: "users", label: "2 Guests" }, { icon: "bath", label: "1 Bathroom" }, { icon: "service", label: "24/7 Service" }],
};

const imageBank = [
  ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80","https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=80","https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80","https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80","https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80","https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80","https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80","https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1200&q=80","https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80","https://images.unsplash.com/photo-1524613032530-449a5d94c285?w=1200&q=80","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80","https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80","https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80","https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80","https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80","https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80","https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80","https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80","https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80","https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80"],
  ["https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=1200&q=80","https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80","https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80","https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?w=1200&q=80"]
];

const titles = ["Luxury Stay", "Modern Retreat", "Cozy Getaway", "Heritage Escape", "Panoramic View", "Nature Nest", "Grand Escape", "Serene Hideaway"];
const locations = ["Mumbai", "Delhi", "Goa", "Bangalore", "Hyderabad", "Jaipur", "Kerala", "Manali"];
const categories = ["Hotels", "Villas", "Flats", "Resorts", "Cabins"];
const prices = [3999, 4499, 4999, 5499, 5999, 6499, 6999, 7499, 7999, 8499, 8999, 3499];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const seedData = async () => {
  try {
    // Await DB connection
    await connectDB();

    rl.question('⚠️  Are you sure you want to delete ALL existing properties and seed new ones? (y/n): ', async (answer) => {
      if (answer.toLowerCase() !== 'y') {
        console.log('Seeding aborted.');
        process.exit(0);
      }

      console.log('Clearing existing properties...');
      await Property.deleteMany();

      console.log('Setting up default Host user...');
      let hostUser = await User.findOne({ email: 'host@homely.com' });
      
      if (!hostUser) {
        hostUser = await User.create({
          name: 'Homely Host',
          email: 'host@homely.com',
          password: 'Host@123',
          role: 'host',
          isVerified: true
        });
        console.log('Default host user created (host@homely.com).');
      } else {
        console.log('Default host user already exists.');
      }

      console.log('Generating 40 realistic properties...');
      const newProperties = [];
      let idCounter = 1;

      for (const category of categories) {
        for (let i = 0; i < 8; i++) {
          // Use realistic images from frontend bank
          const imgs = imageBank[(idCounter - 1) % imageBank.length].map(url => ({ url, publicId: null }));
          const priceNum = prices[(idCounter - 1) % prices.length];
          
          // Parse highlights string to deduce numerical facts for DB schema
          const guestHighlight = highlightsByCategory[category].find(h => h.label.includes('Guests'));
          const maxGuests = guestHighlight ? parseInt(guestHighlight.label.split(' ')[0]) : 2;

          const bedroomsHighlight = highlightsByCategory[category].find(h => h.label.includes('Bedroom'));
          const bedrooms = bedroomsHighlight ? parseInt(bedroomsHighlight.label.split(' ')[0]) : 1;

          const bathroomsHighlight = highlightsByCategory[category].find(h => h.label.includes('Bathroom'));
          const bathrooms = bathroomsHighlight ? parseInt(bathroomsHighlight.label.split(' ')[0]) : 1;

          newProperties.push({
            title: `${titles[i]} ${category.slice(0, -1)}`,
            category,
            location: {
              city: locations[i],
              country: 'India',
              address: `${titles[i]} Street, ${locations[i]}`
            },
            description: descriptions[category],
            price: priceNum,
            currency: 'INR',
            images: imgs,
            amenities: amenitiesByCategory[category],
            highlights: highlightsByCategory[category],
            host: hostUser._id,
            maxGuests,
            bedrooms,
            bathrooms,
            // Calculate a semi-random realistic rating between 4.0 and 5.0
            rating: parseFloat((4 + Math.sin(idCounter) * 0.45 + 0.55).toFixed(1)),
            reviewCount: 20 + ((idCounter * 37 + 13) % 290),
            isNewlyListed: i < 2,
            isFeatured: Math.random() > 0.8, // Randomly feature ~20% of properties
            isActive: true
          });
          idCounter++;
        }
      }

      await Property.insertMany(newProperties);
      console.log('✅ Successfully seeded 40 dynamic properties into the database!');

      rl.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedData();
