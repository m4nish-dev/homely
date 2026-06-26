import "./Register.css";
import { useState } from "react";

function Register({ onClose, onLoginClick }) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (
    <div
      className="register-overlay"
      onClick={onClose}
    >
      <div
        className="register-card"
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

        <h1>Create Account</h1>

        <p>
          Join Homely and discover premium stays
        </p>

        <input
          type="text"
          placeholder="Full Name"
        />

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

        <div className="password-box">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword
              ? "Hide"
              : "Show"}
          </button>
        </div>

        <button className="register-btn">
          Create Account
        </button>

        <span className="switch-auth">
          Already have an account?

          <button
            className="switch-btn"
            onClick={onLoginClick}
          >
            Login
          </button>
        </span>
      </div>
    </div>
  );
}

export default Register;