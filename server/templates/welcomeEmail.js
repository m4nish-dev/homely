export const welcomeEmail = (name) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const subject = 'Welcome to Homely!';
  
  const html = `
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f7f9fc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td align="center" style="background-color: #1a56db; padding: 40px 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">Homely</h1>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding: 40px;">
                <h2 style="color: #333333; margin-top: 0;">Welcome, ${name}!</h2>
                <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
                  We are incredibly excited to have you on board. Homely is your gateway to discovering breathtaking stays, luxury villas, and cozy cabins across the world.
                </p>
                <p style="color: #555555; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                  Whether you're looking for your next vacation or listing your own property to host others, we've got you covered.
                </p>
                <!-- CTA -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="center">
                      <a href="${clientUrl}" style="background-color: #1a56db; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 16px; font-weight: bold; border-radius: 4px; display: inline-block;">Explore Properties</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td align="center" style="background-color: #f1f5f9; padding: 20px; font-size: 14px; color: #888888;">
                &copy; ${new Date().getFullYear()} Homely. All rights reserved.<br>
                123 Vacation Lane, Suite 100, Global City
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return { subject, html };
};
