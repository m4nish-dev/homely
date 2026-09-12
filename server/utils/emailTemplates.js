export const forgotPasswordTemplate = (resetUrl, userName = 'User') => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background-color: #111827; padding: 30px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #374151; line-height: 1.6; }
    .content h2 { color: #111827; margin-top: 0; }
    .btn { display: inline-block; background-color: #d89b4a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 25px 0; text-align: center; }
    .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 13px; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>HOMELY</h1>
    </div>
    <div class="content">
      <h2>Password Reset Request</h2>
      <p>Hello ${userName},</p>
      <p>We received a request to reset the password for your Homely account. If you didn't make this request, you can safely ignore this email.</p>
      <center>
        <a href="${resetUrl}" class="btn" style="color: white;">Reset Your Password</a>
      </center>
      <p>Or copy and paste this link into your browser:</p>
      <p style="word-break: break-all; color: #6b7280; font-size: 14px;">${resetUrl}</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Homely. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

export const bookingConfirmationTemplate = (booking) => {
  const checkIn = new Date(booking.checkIn).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
  const checkOut = new Date(booking.checkOut).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });
  const clientUrl = (process.env.CLIENT_URL || 'https://homely-gilt.vercel.app').replace(/\/$/, '');
  const invoiceUrl = `${clientUrl}/invoice/${booking.bookingId || booking._id}?download=true`;
  const viewUrl = `${clientUrl}/invoice/${booking.bookingId || booking._id}`;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 20px; margin: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    .header { background-color: #16a34a; padding: 30px 20px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; }
    .content { padding: 40px 30px; color: #374151; line-height: 1.6; }
    .content h2 { color: #111827; margin-top: 0; font-size: 22px; }
    .details-box { background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 25px 0; }
    .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px dashed #e5e7eb; padding-bottom: 12px; }
    .detail-row:last-child { border-bottom: none; padding-bottom: 0; margin-bottom: 0; }
    .detail-label { color: #6b7280; font-weight: 500; }
    .detail-value { color: #111827; font-weight: 600; text-align: right; }
    .total-row { display: flex; justify-content: space-between; margin-top: 15px; padding-top: 15px; border-top: 2px solid #e5e7eb; font-size: 18px; font-weight: 700; color: #111827; }
    .btn { display: inline-block; background-color: #16a34a; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0 10px 0; text-align: center; width: 100%; box-sizing: border-box; }
    .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #9ca3af; font-size: 13px; border-top: 1px solid #f3f4f6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmed! 🎉</h1>
    </div>
    <div class="content">
      <h2>Hello ${booking.user.name},</h2>
      <p>Pack your bags! Your payment was successful and your reservation at <strong>${booking.property.title}</strong> is fully confirmed.</p>
      
      <div class="details-box">
        <div class="detail-row">
          <span class="detail-label">Booking ID</span>
          <span class="detail-value">${booking.bookingId}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Property</span>
          <span class="detail-value">${booking.property.title}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-in</span>
          <span class="detail-value">${checkIn}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Check-out</span>
          <span class="detail-value">${checkOut}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Duration</span>
          <span class="detail-value">${booking.nights} Night${booking.nights > 1 ? 's' : ''}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Guests</span>
          <span class="detail-value">${booking.guests}</span>
        </div>
        <div class="total-row">
          <span>Total Amount</span>
          <span>₹${booking.totalAmount.toLocaleString('en-IN')}</span>
        </div>
      </div>

      <a href="${invoiceUrl}" class="btn" style="color: #ffffff !important;">📥 Download PDF Invoice</a>
      <p style="text-align: center; margin: 8px 0 16px; font-size: 13px;"><a href="${viewUrl}" style="color: #4b5563; text-decoration: underline;">Or view invoice directly in browser</a></p>
      <p style="text-align: center; font-size: 14px; color: #6b7280; margin-top: 15px;">Have questions? Reply to this email and our support team will assist you.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Homely. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
  `;
};
