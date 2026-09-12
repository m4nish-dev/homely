import "../Login/Login.css";
import "./Register.css";
import { useState, useMemo } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function getPasswordStrength(pw) {
  const checks = {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    number: /[0-9]/.test(pw),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pw),
  };
  const score = Object.values(checks).filter(Boolean).length;
  return { checks, score };
}

function Register({ onClose, onLoginClick }) {
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { checks, score } = useMemo(() => getPasswordStrength(password), [password]);

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score] || "";
  const strengthColor = ["", "#e53e3e", "#dd6b20", "#d69e2e", "#38a169"][score] || "transparent";

  const validate = () => {
    const e = {};
    if (!name.trim() || name.trim().length < 2) e.name = "Full name must be at least 2 characters.";
    if (!email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    else if (score < 3) e.password = "Please choose a stronger password.";
    if (!confirm) e.confirm = "Please confirm your password.";
    else if (confirm !== password) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleRegister = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setErrors({});
    try {
      await register({ name, email, password });
      setSuccess(true);
      setTimeout(() => onClose(), 1800);
    } catch (err) {
      setErrors({ email: err.response?.data?.message || "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const reqItem = (met, label) => (
    <div className={"pw-req-item " + (met ? "met" : "unmet")}>
      {met ? <FaCheckCircle color="#38a169" /> : <FaTimesCircle color="#e53e3e" />}
      <span>{label}</span>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button>

        {success ? (
          <div className="modal-success">
            <FaCheckCircle className="modal-success-icon" />
            <h2>Account Created!</h2>
            <p>Welcome to Homely. You are all set!</p>
          </div>
        ) : (
          <div>
            <div className="modal-header">
              <h1>Create Account</h1>
              <p>Join Homely and discover premium stays across India</p>
            </div>

            <div className={"modal-input-group " + (errors.name ? "has-error" : "")}>
              <label>Full Name</label>
              <input type="text" placeholder="e.g. Rahul Sharma" value={name} autoComplete="name"
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }} />
              {errors.name && <span className="modal-error">{errors.name}</span>}
            </div>

            <div className={"modal-input-group " + (errors.email ? "has-error" : "")}>
              <label>Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} autoComplete="email"
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }} />
              {errors.email && <span className="modal-error">{errors.email}</span>}
            </div>

            <div className={"modal-input-group " + (errors.password ? "has-error" : "")}>
              <label>Password</label>
              <div className="password-box">
                <input type={showPassword ? "text" : "password"} placeholder="Create a strong password"
                  value={password} autoComplete="new-password"
                  onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }} />
                <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="pw-strength-wrap">
                  <div className="pw-strength-bar">
                    {[1, 2, 3, 4].map((s) => (
                      <div key={s} className="pw-strength-segment"
                        style={{ background: score >= s ? strengthColor : "#e5e7eb" }} />
                    ))}
                  </div>
                  <span className="pw-strength-label" style={{ color: strengthColor }}>{strengthLabel}</span>
                </div>
              )}

              {password.length > 0 && (
                <div className="pw-requirements">
                  {reqItem(checks.length, "At least 8 characters")}
                  {reqItem(checks.upper, "One uppercase letter (A-Z)")}
                  {reqItem(checks.number, "One number (0-9)")}
                  {reqItem(checks.special, "One special character (!@#...)")}
                </div>
              )}

              {errors.password && <span className="modal-error">{errors.password}</span>}
            </div>

            <div className={"modal-input-group " + (errors.confirm ? "has-error" : "")}>
              <label>Confirm Password</label>
              <div className="password-box">
                <input type={showConfirm ? "text" : "password"} placeholder="Repeat your password"
                  value={confirm} autoComplete="new-password"
                  onChange={(e) => { setConfirm(e.target.value); setErrors((p) => ({ ...p, confirm: "" })); }} />
                <button type="button" className="show-hide-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {confirm.length > 0 && (
                <div style={{ fontSize: 12, marginTop: 4, color: confirm === password ? "#38a169" : "#e53e3e", display: "flex", alignItems: "center", gap: 4 }}>
                  {confirm === password
                    ? <><FaCheckCircle /> Passwords match</>
                    : <><FaTimesCircle /> Passwords do not match</>}
                </div>
              )}
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
        )}
      </div>
    </div>
  );
}

export default Register;
