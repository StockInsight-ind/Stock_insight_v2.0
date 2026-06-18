import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import logoUrl from "../assets/logo.png";

export default function LoginPage() {
  return (
    <main className="signup-shell">
      <section className="insight-panel" aria-labelledby="signin-headline">
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
            <h1 id="signin-headline">
              Welcome
              <span>Back.</span>
            </h1>
            <p className="hero-description">
              Access your watchlists, portfolio insights, AI research reports, and market intelligence.
            </p>
          </div>

        </div>
      </section>

      <section className="form-panel" aria-labelledby="continue-journey-title">
        <div className="login-card">
          <div className="login-card-decor login-card-decor-left"></div>
          <div className="login-card-decor login-card-decor-right"></div>

          <div className="login-card-header">
            <p className="form-kicker">Welcome Back</p>
            <h2 className="card-title">Secure access to your premium insights</h2>
            <p className="card-copy">
              Log in to continue with watchlists, data-driven signals, and instant market intelligence.
            </p>
          </div>

          <div className="login-card-meta">
            <span className="trusted-pill">Trusted by retail investors</span>
            <div className="ticker-chips">
              <span className="ticker-chip">NIFTY +1.24%</span>
              <span className="ticker-chip">RELIANCE +0.87%</span>
              <span className="ticker-chip">TCS +1.15%</span>
            </div>
          </div>

          <LoginForm />

          <div className="login-card-actions">
            <a href="#" className="text-link">Forgot Password?</a>
            <p className="card-subtext">
              New here? <Link to="/register">Create Account</Link>
            </p>
          </div>

          <div className="security-badge">
            <span className="security-icon">🔒</span>
            <div>
              <p>Secure Authentication</p>
              <p>Encrypted Access</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
