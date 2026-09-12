import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSuitcase, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaClock, FaFileDownload } from "react-icons/fa";
import bookingService from "../../api/bookingService";
import Navbar from "../../components/Navbar/Navbar";
import html2pdf from "html2pdf.js";
import Invoice from "../../components/Invoice/Invoice";
import { useRef } from "react";
import "./MyBookings.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState(null);
  const invoiceRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await bookingService.getMy();
      setBookings(data.bookings);
    } catch (error) {
      console.error("Failed to load bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <FaCheckCircle color="#10b981" />;
      case 'confirmed': return <FaCheckCircle color="#3b82f6" />;
      case 'cancelled': return <FaTimesCircle color="#ef4444" />;
      default: return <FaClock color="#f59e0b" />;
    }
  };

  const handleDownloadInvoice = (booking) => {
    const el = invoiceRefs.current[booking._id];
    if (!el) return;
    
    setGeneratingId(booking._id);
    const opt = {
      margin:       0,
      filename:     `Homely_Invoice_${booking.bookingId || 'Booking'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(el).save().then(() => {
      setGeneratingId(null);
    });
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="bookings-page">
        <div className="bookings-header">
          <h1>My Bookings</h1>
          <p>View all your past and upcoming stays.</p>
        </div>

        {loading ? (
          <div className="loading">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">
            <FaSuitcase size={48} color="#e5e7eb" />
            <h2>No bookings yet</h2>
            <p>Ready for your next adventure? Start exploring our properties.</p>
            <button onClick={() => navigate("/")} className="explore-btn">Explore Stays</button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="my-booking-card">
                <div className="booking-image-wrap">
                  {booking.property ? (
                    <img src={booking.property.images[0]?.url} alt={booking.property.title} />
                  ) : (
                    <div className="property-removed">Property Unavailable</div>
                  )}
                </div>
                
                <div className="booking-details">
                  <div className="booking-status-badge" data-status={booking.status}>
                    {getStatusIcon(booking.status)}
                    <span>{booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}</span>
                  </div>

                  <h3>{booking.property ? booking.property.title : "Property Removed"}</h3>
                  
                  {booking.property && (
                    <p className="booking-location">
                      <FaMapMarkerAlt /> {booking.property.location.city}
                    </p>
                  )}
                  
                  <div className="booking-dates">
                    <div className="date-box">
                      <span>Check-in</span>
                      <strong>{formatDate(booking.checkIn)}</strong>
                    </div>
                    <div className="date-arrow">→</div>
                    <div className="date-box">
                      <span>Check-out</span>
                      <strong>{formatDate(booking.checkOut)}</strong>
                    </div>
                  </div>
                </div>

                <div className="booking-summary">
                  <div className="summary-row">
                    <span>Booking ID:</span>
                    <strong>{booking.bookingId}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Payment Status:</span>
                    <strong className={`payment-status ${booking.paymentStatus}`}>
                      {booking.paymentStatus.toUpperCase()}
                    </strong>
                  </div>
                  <div className="summary-row total">
                    <span>Total Amount:</span>
                    <strong>₹{booking.totalAmount}</strong>
                  </div>

                  {booking.property && (
                    <>
                      <button 
                        className="view-property-btn"
                        onClick={() => navigate(`/property/${booking.property._id}`)}
                      >
                        View Property
                      </button>
                      <button 
                        className="download-invoice-btn"
                        onClick={() => handleDownloadInvoice(booking)}
                        disabled={generatingId === booking._id}
                        style={{ marginTop: '8px', padding: '10px', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: '600', color: '#374151', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                      >
                        <FaFileDownload /> {generatingId === booking._id ? "Generating..." : "Download Invoice"}
                      </button>
                      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
                        <Invoice booking={booking} ref={el => invoiceRefs.current[booking._id] = el} />
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default MyBookings;
