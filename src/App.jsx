import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import SearchBar from "./components/SearchBar/SearchBar";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import PopularDestinations from "./components/PopularDestinations/PopularDestinations";
import PropertyListings from "./components/PropertyListings/PropertyListings";
import GuestFavorites from "./components/GuestFavorites/GuestFavorites";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Footer from "./components/Footer/Footer";

import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import SearchResults from "./pages/SearchResults/SearchResults";
import Booking from "./pages/Booking/Booking";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function HomePage() {
  const [showLogin, setShowLogin] =
    useState(false);

  const [showRegister, setShowRegister] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 110);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <>
      <div
        className={`top-header ${
          isScrolled ? "header-scrolled" : ""
        }`}
      >
        <Navbar
          setShowLogin={setShowLogin}
          isScrolled={isScrolled}
        />

        <SearchBar isScrolled={isScrolled} />
      </div>

      <HeroBanner />
      <PopularDestinations />
      <PropertyListings />
      <GuestFavorites />
      <WhyChoose />
      <Footer />

      {showLogin && (
        <Login
          onClose={() =>
            setShowLogin(false)
          }
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() =>
            setShowRegister(false)
          }
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/search"
        element={<SearchResults />}
      />

      <Route
        path="/property/:id"
        element={<PropertyDetails />}
      />

      <Route
        path="/booking/:id"
        element={<Booking />}
      />

      <Route
        path="/booking-success"
        element={<BookingSuccess />}
      />
    </Routes>
  );
}

export default App;