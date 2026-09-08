import "./WhyChoose.css";
import { FaCheckCircle, FaHeadset, FaShieldAlt, FaRegGem } from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="why-choose">
      <div className="wc-inner">
        
        <div className="wc-header">
          <span className="wc-eyebrow">The Homely Standard</span>
          <h2>Beyond ordinary stays</h2>
          <p>
            Experience a new level of hospitality where every detail is 
            curated for your comfort and peace of mind.
          </p>
        </div>

        <div className="wc-bento">
          
          {/* Card 1: Large Image (Left, 2 columns, 2 rows) */}
          <div className="bento-card bento-large">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80" 
              alt="Premium Villa" 
              className="bento-bg"
            />
            <div className="bento-overlay" />
            <div className="bento-content text-white">
              <div className="bento-icon-glass">
                <FaCheckCircle />
              </div>
              <h3>100% Verified Quality</h3>
              <p>
                Every single property on Homely undergoes a rigorous 50-point 
                in-person inspection before it's listed. No surprises, just perfection.
              </p>
            </div>
          </div>

          {/* Card 2: 1 Column, 1 Row */}
          <div className="bento-card bento-small">
            <div className="bento-icon dark-icon">
              <FaHeadset />
            </div>
            <h3>24/7 Concierge</h3>
            <p>
              Dedicated travel experts available around the clock to assist you.
            </p>
          </div>

          {/* Card 3: 1 Column, 1 Row */}
          <div className="bento-card bento-small">
            <div className="bento-icon dark-icon">
              <FaShieldAlt />
            </div>
            <h3>Secure Booking</h3>
            <p>
              Bank-grade encryption ensures your payment data is always safe.
            </p>
          </div>

          {/* Card 4: Wide, 2 Columns, 1 Row */}
          <div className="bento-card bento-wide">
            <div className="wide-content">
              <div className="bento-icon dark-icon">
                <FaRegGem />
              </div>
              <div>
                <h3>Best Price Guarantee</h3>
                <p>
                  Found it cheaper? We'll match the price. Enjoy exclusive rates 
                  and premium rewards on every single booking you make with Homely.
                </p>
              </div>
            </div>
            {/* Abstract decorative element for the wide card */}
            <div className="bento-abstract"></div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
