import "./Login.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";

function Login({ onClose, onRegisterClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const handleLogin = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful! (Demo mode)");
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button>

        <div className="modal-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your journey with Homely</p>
        </div>

        {/* Google */}
        <button className="google-btn">
          <FaGoogle />
          Continue with Google
        </button>

        <div className="modal-divider"><span>or</span></div>

        {/* Email */}
        <div className={`modal-input-group ${errors.email ? "has-error" : ""}`}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
          />
          {errors.email && <span className="modal-error">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className={`modal-input-group ${errors.password ? "has-error" : ""}`}>
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
            />
            <button
              type="button"
              className="show-hide-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <span className="modal-error">{errors.password}</span>}
        </div>

        <div className="modal-forgot">
          <button>Forgot password?</button>
        </div>

        <button className="modal-submit-btn" onClick={handleLogin} disabled={loading}>
          {loading ? <span className="btn-spinner" /> : "Login"}
        </button>

        <p className="modal-switch">
          Don't have an account?
          <button className="modal-switch-btn" onClick={onRegisterClick}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;