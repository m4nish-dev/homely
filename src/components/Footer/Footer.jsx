import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>Homely</h3>
          <p>
            Find hotels, villas, resorts and luxury stays across India.
          </p>
        </div>

        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li>Hotels</li>
            <li>Flats</li>
            <li>Villas</li>
            <li>Resorts</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
            <li>Support</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <ul>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 Homely. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;