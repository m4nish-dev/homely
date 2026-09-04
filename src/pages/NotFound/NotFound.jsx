import "./NotFound.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-card">
        <div className="not-found-emoji"><FaHome /></div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you're looking for has checked out.<br />
          Let's get you back to finding your perfect stay.
        </p>
        <div className="not-found-actions">
          <button className="not-found-home-btn" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="not-found-search-btn" onClick={() => navigate("/search")}>
            Explore Stays
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
