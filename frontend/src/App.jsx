import { useState } from "react";
import "./App.css";
import { registerUser } from "./api/userApi";
import PasswordStrengthIndicator from "./components/PasswordStrengthIndicator";
import StockTagInput from "./components/StockTagInput";

const marketData = [
  { flag: "🇮🇳", name: "NIFTY 50", value: "23,412.80", change: "+1.24%" },
  { flag: "🇺🇸", name: "S&P 500", value: "5,486.02", change: "+0.86%" },
  { flag: "🇦🇺", name: "ASX", value: "7,824.10", change: "+0.42%" },
  { flag: "🇬🇧", name: "FTSE 100", value: "8,188.61", change: "+0.58%" },
  { flag: "🇩🇪", name: "DAX", value: "18,612.44", change: "+0.73%" },
  { flag: "🇯🇵", name: "NIKKEI", value: "38,921.55", change: "+1.08%" },
];

const trustItems = [
  {
    label: "256-bit SSL",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 10V8a5 5 0 0 1 10 0v2" />
        <rect x="5" y="10" width="14" height="10" rx="2" />
      </svg>
    ),
  },
  {
    label: "SEBI Compliant",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
        <path d="M9 12l2 2 4-5" />
      </svg>
    ),
  },
  {
    label: "6 Global Markets",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9S14.4 18.4 12 21M12 3C9.6 5.6 8.4 8.6 8.4 12S9.6 18.4 12 21" />
      </svg>
    ),
  },
];

function BrandLogo() {
  return (
    <div className="brand-logo" aria-label="StockInsights">
      <span className="logo-bars" aria-hidden="true">
        <span className="logo-bar logo-bar-1"></span>
        <span className="logo-bar logo-bar-2"></span>
        <span className="logo-bar logo-bar-3"></span>
      </span>
      <span className="logo-wordmark">
        <span className="logo-stock">Stock</span>
        <span className="logo-insights">Insights</span>
      </span>
    </div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    market: "",
    stocks: [],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
        market: formData.market || null,
        stocks: formData.stocks,
      };

      await registerUser(payload);
      setMessage("✓ Registration successful! Redirecting...");

      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          market: "",
          stocks: [],
        });
        setMessage("");
      }, 2000);
    } catch (error) {
      console.error(error);
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
          <BrandLogo />

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

          <div className="markets-panel">
            <div className="markets-header">
              <span>Live global markets</span>
              <span className="market-status">Positive breadth</span>
            </div>

            <div className="markets-grid">
              {marketData.map((market) => (
                <article className="market-card" key={market.name}>
                  <div className="market-card-top">
                    <span className="market-flag">{market.flag}</span>
                    <span className="market-name">{market.name}</span>
                  </div>
                  <strong>{market.value}</strong>
                  <span className="change-pill">{market.change}</span>
                </article>
              ))}
            </div>
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
            <div className={`status-message ${message.includes("✓") ? "success" : "error"}`}>
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
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
            {formData.password && <PasswordStrengthIndicator password={formData.password} />}
          </div>

          <div className="form-group">
            <label htmlFor="market" className="floating-label">Primary Market</label>
            <select
              id="market"
              name="market"
              value={formData.market}
              onChange={handleChange}
              className="market-select"
            >
              <option value="">Select your primary market</option>
              <option value="India">India · NSE/BSE</option>
              <option value="US">United States · NYSE/NASDAQ</option>
              <option value="Australia">Australia · ASX</option>
              <option value="Europe">Europe · FTSE/DAX</option>
              <option value="Japan">Japan · Nikkei</option>
              <option value="Global">Global Multi-Market</option>
            </select>
          </div>

          <div className="form-group">
            <label className="floating-label">Watch Stocks</label>
            <StockTagInput
              stocks={formData.stocks}
              onChange={(stocks) => setFormData((prev) => ({ ...prev, stocks }))}
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                <span>Creating account</span>
              </>
            ) : (
              <>
                <span>Create account</span>
                <span className="arrow">→</span>
              </>
            )}
          </button>

          <div className="signin-link">
            Already have an account? <a href="#signin">Sign in</a>
          </div>

          <div className="trust-row" aria-label="Trust indicators">
            {trustItems.map((item) => (
              <div className="trust-item" key={item.label}>
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </form>
      </section>
    </main>
  );
}

export default App;
