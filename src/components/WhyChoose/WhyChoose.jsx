import "./WhyChoose.css";
import { FaShieldAlt } from "react-icons/fa";
import { FaHeadset } from "react-icons/fa";
import { FaTags } from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="why-choose">
      <h2>Why Choose Homely?</h2>

      <div className="features-grid">

        <div className="feature-card">
          <FaShieldAlt className="feature-icon" />
          <h3>Trusted Stays</h3>
          <p>
            Verified hotels, villas and apartments for a safe experience.
          </p>
        </div>

        <div className="feature-card">
          <FaTags className="feature-icon" />
          <h3>Best Prices</h3>
          <p>
            Get exclusive deals and affordable stays every time.
          </p>
        </div>

        <div className="feature-card">
          <FaHeadset className="feature-icon" />
          <h3>24/7 Support</h3>
          <p>
            Our team is available anytime to help with bookings.
          </p>
        </div>

      </div>
    </section>
  );
}

export default WhyChoose;
