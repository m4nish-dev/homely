import "./Login.css";
import { useState } from "react";

function Login({
  onClose,
  onRegisterClick,
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div
      className="login-overlay"
      onClick={onClose}
    >
      <div
        className="login-card"
        onClick={(e) =>
          e.stopPropagation()
        }
      >
        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue your journey
        </p>

        <input
          type="email"
          placeholder="Email Address"
        />

        <div className="password-box">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <button className="login-btn">
          Login
        </button>

        <span className="switch-auth">
          Don't have an account?

          <button
            className="switch-btn"
            onClick={onRegisterClick}
          >
            Register
          </button>
        </span>
      </div>
    </div>
  );
}

export default Login;