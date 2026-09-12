import { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { FaFileDownload, FaPrint, FaArrowLeft, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import bookingService from '../../api/bookingService';
import Invoice from '../../components/Invoice/Invoice';
import './PublicInvoice.css';

function PublicInvoice() {
  const { bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const shouldAutoDownload = searchParams.get('download') === 'true';
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const invoiceRef = useRef(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        setLoading(true);
        const data = await bookingService.getPublicInvoice(bookingId);
        setBooking(data.booking);
      } catch (err) {
        console.error('Failed to load invoice:', err);
        setError(err.response?.data?.message || 'Invoice not found or expired.');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchInvoice();
    }
  }, [bookingId]);

  // Handle PDF download
  const handleDownload = () => {
    if (!invoiceRef.current || !booking) return;
    setDownloading(true);

    const filename = `Homely_Invoice_${booking.bookingId || booking._id || 'Booking'}.pdf`;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
      .set(opt)
      .from(invoiceRef.current)
      .save()
      .then(() => {
        setDownloading(false);
      })
      .catch((err) => {
        console.error('PDF download error:', err);
        setDownloading(false);
      });
  };

  // Auto-download if triggered from email link
  useEffect(() => {
    if (booking && shouldAutoDownload && invoiceRef.current) {
      const timer = setTimeout(() => {
        handleDownload();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [booking, shouldAutoDownload]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="public-invoice-page">
        <div className="public-invoice-loading">
          <FaSpinner className="spin" size={32} />
          <p>Preparing your invoice...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="public-invoice-page">
        <div className="public-invoice-error">
          <h2>Invoice Not Found</h2>
          <p>{error || "We couldn't retrieve the requested booking invoice."}</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            <FaArrowLeft /> Return to Homely
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="public-invoice-page">
      {/* Top action header */}
      <div className="public-invoice-actions no-print">
        <button className="action-back-btn" onClick={() => navigate('/')}>
          <FaArrowLeft /> Homely
        </button>

        <div className="action-status">
          <FaCheckCircle color="#16a34a" /> Booking Confirmed
        </div>

        <div className="action-buttons">
          <button 
            className="action-btn download-btn" 
            onClick={handleDownload} 
            disabled={downloading}
          >
            {downloading ? (
              <><FaSpinner className="spin" /> Generating PDF...</>
            ) : (
              <><FaFileDownload /> Download PDF</>
            )}
          </button>

          <button className="action-btn print-btn" onClick={handlePrint}>
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* Invoice Document */}
      <div className="public-invoice-card">
        <Invoice booking={booking} ref={invoiceRef} />
      </div>
    </div>
  );
}

export default PublicInvoice;
