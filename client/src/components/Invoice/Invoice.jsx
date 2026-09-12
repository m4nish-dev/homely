import React from 'react';
import './Invoice.css';

const Invoice = React.forwardRef(({ booking }, ref) => {
  if (!booking) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);
  const diffTime = Math.abs(checkOut - checkIn);
  const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const serviceFee = 499;
  const basePrice = (booking.total || booking.totalAmount) - serviceFee;

  return (
    <div className="invoice-container" ref={ref}>
      <div className="invoice-header">
        <div className="invoice-logo">Homely</div>
        <div className="invoice-title">INVOICE</div>
      </div>

      <div className="invoice-details-section">
        <div className="invoice-bill-to">
          <h4>Bill To:</h4>
          <p className="strong">{booking.name || booking.user?.name || "Guest"}</p>
          <p>{booking.email || booking.user?.email}</p>
        </div>
        <div className="invoice-meta">
          <div className="meta-row">
            <span>Invoice No:</span>
            <strong>{booking.bookingId || booking._id}</strong>
          </div>
          <div className="meta-row">
            <span>Date Issued:</span>
            <strong>{formatDate(booking.createdAt || new Date())}</strong>
          </div>
          <div className="meta-row">
            <span>Status:</span>
            <strong className="status-paid">PAID</strong>
          </div>
        </div>
      </div>

      <div className="invoice-property">
        <h4>Booking Details:</h4>
        <p className="property-name">{booking.property?.title || booking.property}</p>
        <p className="property-location">{booking.property?.location?.city || booking.location}</p>
        
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

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Nights</th>
            <th className="text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Accommodation Stay</td>
            <td>{nights}</td>
            <td className="text-right">₹{basePrice.toLocaleString()}</td>
          </tr>
          <tr>
            <td>Service Fee</td>
            <td>-</td>
            <td className="text-right">₹{serviceFee}</td>
          </tr>
        </tbody>
      </table>

      <div className="invoice-summary">
        <div className="summary-row total">
          <span>Total Paid</span>
          <span>₹{(booking.total || booking.totalAmount)?.toLocaleString()}</span>
        </div>
      </div>

      <div className="invoice-footer">
        <p>Thank you for choosing Homely for your stay!</p>
        <p>If you have any questions about this invoice, please contact support@homely.com.</p>
      </div>
    </div>
  );
});

Invoice.displayName = 'Invoice';
export default Invoice;
