import { Link } from "react-router-dom";
import logoUrl from "../assets/logo.png";

export default function LandingPage() {
  return (
    <main className="signup-shell">
      <section className="insight-panel" aria-labelledby="landing-headline">
        <div className="ambient-glow ambient-glow-green"></div>
        <div className="ambient-glow ambient-glow-blue"></div>
        <div className="market-orbits" aria-hidden="true"></div>

        <div className="insight-content">
          <div className="brand-logo" aria-label="StockInsights">
            <img className="brand-logo-image" src={logoUrl} alt="Stock Insights logo" />
            <span className="logo-wordmark">
              <span className="logo-stock">Stock</span>
              <span className="logo-insights">Insights</span>
            </span>
          </div>

          <div className="hero-copy">
            <p className="eyebrow">Personalized market intelligence.</p>
            <h1 id="landing-headline">
              Home for smarter stock decisions.
              <span>Onboard once, trade with confidence.</span>
            </h1>
            <p className="hero-description">
              Register and tell us your preferred markets and stocks so the dashboard, watchlist, and alerts are personalized from day one.
            </p>
          </div>
        </div>
      </section>

      <section className="form-panel" aria-labelledby="launch-title">
        <div className="registration-form">
          <div className="form-header">
            <p className="form-kicker">Get started</p>
            <h2 id="launch-title" className="form-title">Build your investment edge</h2>
            <p className="form-subtitle">Register or log in to begin onboarding and create a tailored watchlist.</p>
          </div>

          <div className="cta-group">
            <Link to="/register" className="primary-button">Register</Link>
            <Link to="/login" className="secondary-button">Login</Link>
          </div>

          <div className="landing-features">
            <div>
              <strong>Personalized watchlist</strong>
              <p>Choose markets and stocks to make the dashboard yours.</p>
            </div>
            <div>
              <strong>News tailored to you</strong>
              <p>Only see stories for the stocks you care about.</p>
            </div>
            <div>
              <strong>Faster onboarding</strong>
              <p>Complete the questionnaire once, then use the platform.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
