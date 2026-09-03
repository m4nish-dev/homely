import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Search Your Destination",
    desc: "Tell us where you want to go, your dates, and how many guests. Discover thousands of curated properties instantly.",
  },
  {
    number: "02",
    icon: "🏠",
    title: "Choose Your Stay",
    desc: "Browse stunning photos, read verified reviews, and compare prices. Filter by type, amenities, and budget.",
  },
  {
    number: "03",
    icon: "📋",
    title: "Book with Confidence",
    desc: "Secure instant booking with our encrypted payment system. Get your confirmation in seconds.",
  },
  {
    number: "04",
    icon: "✈️",
    title: "Enjoy Your Stay",
    desc: "Arrive, relax, and enjoy. Our 24/7 support team is always ready if you need anything during your trip.",
  },
];

function HowItWorks() {
  return (
    <section className="hiw-section">
      <div className="hiw-inner">
        <div className="section-header">
          <span className="hiw-eyebrow">Simple & Easy</span>
          <h2>How Homely Works</h2>
          <p>Book your perfect stay in 4 simple steps — takes less than 2 minutes.</p>
        </div>

        <div className="hiw-steps">
          {steps.map((step, i) => (
            <div className="hiw-step" key={i}>
              {/* Connector line */}
              {i < steps.length - 1 && <div className="hiw-connector" />}

              <div className="hiw-step-number">{step.number}</div>
              <div className="hiw-step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
