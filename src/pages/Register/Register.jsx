import "../Login/Login.css";
import "./Register.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaGoogle } from "react-icons/fa";

function Register({ onClose, onLoginClick }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Full name is required.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (password.length < 6) e.password = "At least 6 characters required.";
    if (!confirm) e.confirm = "Please confirm your password.";
    else if (confirm !== password) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleRegister = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Account created successfully! (Demo mode)");
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button>

        <div className="modal-header">
          <h1>Create Account</h1>
          <p>Join Homely and discover premium stays across India</p>
        </div>

        {/* Google */}
        <button className="google-btn">
          <FaGoogle />
          Sign up with Google
        </button>

        <div className="modal-divider"><span>or</span></div>

        {/* Name */}
        <div className={`modal-input-group ${errors.name ? "has-error" : ""}`}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="e.g. Rahul Sharma"
            value={name}
            onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
          />
          {errors.name && <span className="modal-error">{errors.name}</span>}
        </div>

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
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
            />
            <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <span className="modal-error">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className={`modal-input-group ${errors.confirm ? "has-error" : ""}`}>
          <label>Confirm Password</label>
          <div className="password-box">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: "" })); }}
            />
            <button type="button" className="show-hide-btn" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirm && <span className="modal-error">{errors.confirm}</span>}
        </div>

        <button className="modal-submit-btn" onClick={handleRegister} disabled={loading}>
          {loading ? <span className="btn-spinner" /> : "Create Account"}
        </button>

        <p className="modal-switch">
          Already have an account?
          <button className="modal-switch-btn" onClick={onLoginClick}>Login</button>
        </p>
      </div>
    </div>
  );
}

export default Register;