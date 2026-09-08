import nodemailer from 'nodemailer';

/**
 * Reusable utility to send transactional emails via SMTP
 * 
 * @param {Object} options - { to, subject, html, text }
 * @returns {Promise} - resolves with SMTP info object
 */
const sendEmail = async ({ to, subject, html, text }) => {
  // Create transporter instance using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465 (SSL), false for 587 (TLS)
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Construct message payload
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to,
    subject,
    html,
    text, // Optional plain-text fallback
  };

  // Send email and return info
  const info = await transporter.sendMail(message);
  return info;
};

export default sendEmail;
