import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import PopularDestinations from "./components/PopularDestinations/PopularDestinations";
import PropertyListings from "./components/PropertyListings/PropertyListings";
import NewlyAddedProperties from "./components/NewlyAddedProperties/NewlyAddedProperties";
import SpecialOffers from "./components/SpecialOffers/SpecialOffers";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import GuestFavorites from "./components/GuestFavorites/GuestFavorites";
import Testimonials from "./components/Testimonials/Testimonials";
import WhyChoose from "./components/WhyChoose/WhyChoose";
import Footer from "./components/Footer/Footer";

import PropertyDetails from "./pages/PropertyDetails/PropertyDetails";
import SearchResults from "./pages/SearchResults/SearchResults";
import Booking from "./pages/Booking/Booking";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import NotFound from "./pages/NotFound/NotFound";
import Favorites from "./pages/Favorites/Favorites";
import MyBookings from "./pages/MyBookings/MyBookings";
import Settings from "./pages/Settings/Settings";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HostDashboard from "./pages/Host/HostDashboard";
import PublicInvoice from "./pages/PublicInvoice/PublicInvoice";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function HomePage() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 110);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Sticky Header */}
      <div className={`top-header ${isScrolled ? "header-scrolled" : ""}`}>
        <Navbar setShowLogin={setShowLogin} isScrolled={isScrolled} />
      </div>

      {/* Page Sections */}
      <HeroBanner isScrolled={isScrolled} />
      <PopularDestinations />
      <NewlyAddedProperties />
      <PropertyListings />
      <SpecialOffers />
      <HowItWorks />
      <GuestFavorites />
      <Testimonials />
      <WhyChoose />
      <Footer />

      {/* Auth Modals */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
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
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/wishlist" element={<Navigate to="/favorites" replace />} />
        <Route path="/liked" element={<Navigate to="/favorites" replace />} />
        <Route path="/saved" element={<Navigate to="/favorites" replace />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/user/bookings" element={<Navigate to="/my-bookings" replace />} />
        <Route path="/invoice/:bookingId" element={<PublicInvoice />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/host" element={<HostDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;