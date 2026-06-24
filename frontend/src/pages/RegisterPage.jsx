import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../api/userApi";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";
import logoUrl from "../assets/logo.png";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };

      await registerUser(payload);
      setMessage("Registration successful! You can now sign in.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="signup-shell">
      <section className="insight-panel" aria-labelledby="signup-headline">
        <div className="ambient-glow ambient-glow-green"></div>
        <div className="ambient-glow ambient-glow-blue"></div>
        <div className="market-orbits" aria-hidden="true"></div>

        <div className="insight-content">
          <div className="brand-logo" aria-label="StockInsights">
            <img className="brand-logo-image" src={logoUrl} alt="" aria-hidden="true" />
            <span className="logo-wordmark">
              <span className="logo-stock">Stock</span>
              <span className="logo-insights">Insights</span>
            </span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Institutional clarity for retail investors</p>
            <h1 id="signup-headline">
              Every market.
              <span>One clear picture.</span>
            </h1>
            <p className="hero-description">
              StockInsights turns institutional-grade research into a calm, actionable
              command center for retail investors across India, the USA, Australia,
              Europe, and Asia.
            </p>
          </div>

        </div>
      </section>

      <section className="form-panel" aria-labelledby="create-account-title">
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <p className="form-kicker">Start your workspace</p>
            <h2 id="create-account-title" className="form-title">Create account</h2>
            <p className="form-subtitle">Build your first global watchlist in under a minute.</p>
          </div>

          {message && (
            <div className={`status-message ${message.includes("successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName" className="floating-label">First Name</label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Aarav"
                className={`form-input ${errors.firstName ? "input-error" : ""}`}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lastName" className="floating-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Kapoor"
                className={`form-input ${errors.lastName ? "input-error" : ""}`}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email" className="floating-label">Email</label>
            <input
              id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={`form-input ${errors.email ? "input-error" : ""}`}
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="floating-label">Password</label>
              <div className="password-input-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
              {formData.password && (
                <PasswordStrengthIndicator password={formData.password} />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="floating-label">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`form-input ${errors.confirmPassword ? "input-error" : ""}`}
              />
              {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
            </div>


            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>

            <div className="signin-link">
              Already have an account? <Link to="/login">Sign inheleos</Link>
            </div>
          </form>
        </section>
      </main>
    );
}
