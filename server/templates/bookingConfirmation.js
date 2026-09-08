export const bookingConfirmation = (booking, property, user) => {
  const subject = `Booking Confirmed: ${property.title} - Homely`;
  
  // Format dates elegantly for email rendering
  const checkInDate = new Date(booking.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  const checkOutDate = new Date(booking.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
  
  const html = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #10b981; padding: 30px 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Booking Confirmed!</h1>
                <p style="color: #e6fef4; margin: 10px 0 0 0; font-size: 16px;">Booking ID: ${booking.bookingId}</p>
              </td>
            </tr>
            <!-- Dynamic Property Image Splash -->
            ${property.images && property.images.length > 0 ? `
            <tr>
              <td>
                <img src="${property.images[0].url}" alt="${property.title}" width="600" style="width: 100%; max-width: 600px; height: auto; display: block;" />
              </td>
            </tr>
            ` : ''}
            <!-- Body -->
            <tr>
              <td style="padding: 40px;">
                <h2 style="color: #333333; margin-top: 0; font-size: 20px;">Hi ${user.name},</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  Your payment of <strong>₹${booking.totalAmount}</strong> was successful. You're all set for your trip to <strong>${property.location.city}</strong>!
                </p>

                <!-- Clean Booking Details Table -->
                <table width="100%" cellpadding="12" cellspacing="0" style="background-color: #f8fafc; border-radius: 6px; margin-bottom: 30px;">
                  <tr>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Property</td>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${property.title}</td>
                  </tr>
                  <tr>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Check-In</td>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${checkInDate}</td>
                  </tr>
                  <tr>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Check-Out</td>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${checkOutDate}</td>
                  </tr>
                  <tr>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">Guests</td>
                    <td style="border-bottom: 1px solid #e2e8f0; color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${booking.guests.adults} Adults ${booking.guests.children ? `, ${booking.guests.children} Children` : ''}</td>
                  </tr>
                  <tr>
                    <td style="color: #64748b; font-size: 14px;">Total Amount Paid</td>
                    <td style="color: #10b981; font-size: 16px; font-weight: bold; text-align: right;">₹${booking.totalAmount}</td>
                  </tr>
                </table>

                <h3 style="color: #333333; font-size: 16px;">Host Contact</h3>
                <p style="color: #555555; font-size: 14px; line-height: 1.5; margin-bottom: 24px;">
                  Your host will be preparing for your arrival. If you have any immediate questions, you can reach out to them directly via your dashboard messages.
                </p>

                <h3 style="color: #333333; font-size: 16px;">Cancellation Policy</h3>
                <p style="color: #555555; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
                  You may cancel your booking for a full refund up to 24 hours before your check-in date. Cancellations inside the 24-hour window are non-refundable.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #f1f5f9; padding: 20px; font-size: 14px; color: #888888;">
                &copy; ${new Date().getFullYear()} Homely. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return { subject, html };
};
