import "./Login.css";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import authService from "../../api/authService";

function Login({ onClose, onRegisterClick }) {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if (!password) e.password = "Password is required.";
    return e;
  };

  const handleLogin = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setErrors({});
    try {
      await login({ email, password });
      setSuccess(true);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setErrors({ email: err.response?.data?.message || "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: "Enter a valid email address first." });
      return;
    }
    setLoading(true);
    setErrors({});
    setResetMessage("");
    try {
      await authService.forgotPassword(email);
      setResetMessage("Password reset instructions sent! Check your terminal for the Ethereal link.");
    } catch (err) {
      setErrors({ email: err.response?.data?.message || "Failed to send reset link." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close"><FaTimes /></button>

        {success ? (
          <div className="modal-success">
            <FaCheckCircle className="modal-success-icon" />
            <h2>Welcome back!</h2>
            <p>You have successfully signed in.</p>
          </div>
        ) : isForgotPassword ? (
          <>
            <div className="modal-header">
              <h1>Reset Password</h1>
              <p>Enter your email to receive reset instructions</p>
            </div>

            {resetMessage && (
              <div className="modal-success" style={{ padding: '12px', background: '#ecfdf5', color: '#059669', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', border: '1px solid #a7f3d0' }}>
                {resetMessage}
              </div>
            )}

            <div className={`modal-input-group ${errors.email ? "has-error" : ""}`}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors({}); setResetMessage(""); }}
              />
              {errors.email && <span className="modal-error">{errors.email}</span>}
            </div>

            <button className="modal-submit-btn" onClick={handleForgotPassword} disabled={loading}>
              {loading ? <span className="btn-spinner" /> : "Send Reset Link"}
            </button>

            <div className="modal-switch">
              <button className="modal-switch-btn" onClick={() => { setIsForgotPassword(false); setErrors({}); setResetMessage(""); }}>
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h1>Welcome Back</h1>
              <p>Sign in to continue your journey with Homely</p>
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
              <button onClick={() => { setIsForgotPassword(true); setErrors({}); }}>Forgot password?</button>
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
          </>
        )}
      </div>
    </div>
  );
}

export default Login;