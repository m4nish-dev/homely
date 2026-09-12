import "./BookingSuccess.css";
import { FaCheckCircle, FaHome, FaTicketAlt } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Invoice from "../../components/Invoice/Invoice";

function BookingSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const booking = location.state;
  const [visible, setVisible] = useState(false);
  const [generating, setGenerating] = useState(false);
  const invoiceRef = useRef();

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const handleDownloadInvoice = () => {
    if (!invoiceRef.current) return;
    setGenerating(true);
    
    const opt = {
      margin:       0,
      filename:     `Homely_Invoice_${booking.bookingId || 'Booking'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(invoiceRef.current).save().then(() => {
      setGenerating(false);
    });
  };

  if (!booking) {
    return (
      <div className="success-page">
        <div className="success-card">
          <h1>No Booking Found</h1>
          <p>Please complete a booking first.</p>
          <button className="home-btn" onClick={() => navigate("/")}>
            <FaHome /> Back To Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="success-page">
      <div className={`success-card ${visible ? "success-visible" : ""}`}>
        {/* Icon */}
        <div className="success-icon-wrap">
          <FaCheckCircle className="success-icon" />
          <div className="success-ring" />
        </div>

        <h1>Booking Confirmed!</h1>
        <p>Your stay has been successfully booked. Have a wonderful trip!</p>

        {/* Booking ID */}
        <div className="booking-id">
          <FaTicketAlt />
          <div>
            <span className="bid-label">Booking ID</span>
            <strong>{booking.bookingId}</strong>
          </div>
        </div>

        {/* Details */}
        <div className="booking-details">
          {booking.name && (
            <div className="detail-row">
              <span>Guest</span>
              <strong>{booking.name}</strong>
            </div>
          )}
          <div className="detail-row">
            <span>Property</span>
            <strong>{booking.property}</strong>
          </div>
          <div className="detail-row">
            <span>Location</span>
            <strong>{booking.location}</strong>
          </div>
          <div className="detail-row">
            <span>Check In</span>
            <strong>{booking.checkIn}</strong>
          </div>
          <div className="detail-row">
            <span>Check Out</span>
            <strong>{booking.checkOut}</strong>
          </div>
          <div className="detail-row">
            <span>Guests</span>
            <strong>{booking.guests}</strong>
          </div>
          <div className="detail-row total-detail">
            <span>Total Paid</span>
            <strong>₹{booking.total?.toLocaleString()}</strong>
          </div>
        </div>

        <div className="success-actions">
          <button className="home-btn" onClick={() => navigate("/")}>
            <FaHome /> Back To Home
          </button>
          <button className="explore-btn" onClick={handleDownloadInvoice} disabled={generating}>
            {generating ? "Generating PDF..." : "Download Invoice"}
          </button>
        </div>
      </div>
      
      {/* Hidden Invoice Component for PDF generation */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <Invoice booking={booking} ref={invoiceRef} />
      </div>
    </div>
  );
}

export default BookingSuccess;