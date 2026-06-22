import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import PopularDestinations from "./components/PopularDestinations/PopularDestinations";
import PropertyListings from "./components/PropertyListings/PropertyListings";
import GuestFavorites from "./components/GuestFavorites/GuestFavorites";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Footer from "./components/Footer/Footer";

import PropertyDetails from "./pages/PropertyDetails/PropertyDetails.jsx";
function HomePage() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <HeroBanner />
      <PopularDestinations />
      <PropertyListings />
      <GuestFavorites />
      <WhyChoose />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/property/:id"
        element={<PropertyDetails />}
      />
    </Routes>
  );
}

export default App;