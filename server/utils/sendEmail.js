import nodemailer from 'nodemailer';

/**
 * Reusable utility to send transactional emails via SMTP
 * Automatically falls back to Ethereal Email for testing if no SMTP_EMAIL is provided
 * 
 * @param {Object} options - { email, subject, message }
 * @returns {Promise} - resolves with SMTP info object
 */
const sendEmail = async (options) => {
  let transporter;

  // Use real credentials if provided
  if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } else {
    // Generate test Ethereal account
    console.log('🧪 No SMTP_EMAIL found in .env. Generating Ethereal Test Account...');
    let testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  // Construct message payload
  const mailOptions = {
    from: `${process.env.FROM_NAME || 'Homely'} <${process.env.FROM_EMAIL || 'noreply@homely.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html || options.message?.replace(/\n/g, '<br>'),
  };

  // Send email and return info
  const info = await transporter.sendMail(mailOptions);
  
  if (!process.env.SMTP_EMAIL) {
    console.log('✉️  Test Email Sent!');
    console.log('🔗 Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
  
  return info;
};

export default sendEmail;
