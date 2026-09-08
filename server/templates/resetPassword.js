export const resetPasswordEmail = (name, resetUrl) => {
  const subject = 'Password Reset Request - Homely';
  
  const html = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #1a56db; padding: 30px 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Reset Your Password</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 40px;">
                <h2 style="color: #333333; margin-top: 0; font-size: 20px;">Hello ${name},</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  We received a request to reset the password for your Homely account. 
                  Click the button below to choose a new, secure password.
                </p>
                
                <!-- Call to Action -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                  <tr>
                    <td align="center">
                      <a href="${resetUrl}" style="background-color: #ef4444; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 16px; font-weight: bold; border-radius: 4px; display: inline-block;">Reset Password</a>
                    </td>
                  </tr>
                </table>

                <p style="color: #ef4444; font-size: 14px; font-weight: bold; text-align: center; margin-bottom: 24px;">
                  ⚠️ Security Notice: This link will expire in exactly 10 minutes.
                </p>

                <p style="color: #888888; font-size: 14px; line-height: 1.5; margin-bottom: 0;">
                  If you did not request a password reset, you can safely ignore this email. Your account is secure and your password will remain unchanged.
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
