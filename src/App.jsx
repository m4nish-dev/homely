import "./styles/global.css";

import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import PopularDestinations from "./components/PopularDestinations/PopularDestinations";
import PropertyListings from "./components/PropertyListings/PropertyListings";
import GuestFavorites from "./components/GuestFavorites/GuestFavorites";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Footer from "./components/Footer/Footer";
import HeroBanner from "./components/HeroBanner/HeroBanner";
function App() {
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

export default App;