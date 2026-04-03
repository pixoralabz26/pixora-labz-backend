import { Link } from 'react-router-dom';
import { Globe, Smartphone, Wrench, TrendingUp, Mail, ArrowRight, Layers } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <div className="footer-brand-block">
              <img src="/logo-black.png" alt="Pixora Labz" className="footer-logo-img" />
              <span className="footer-brand-name">Pixora Labz</span>
            </div>
            <p className="footer-tagline">
              We craft digital experiences that elevate brands —<br />
              from concept to production, with precision.
            </p>
          </div>

          {/* Company */}
          <div>
            <p className="footer-nav-title">Company</p>
            <Link to="/" className="footer-nav-link">Home</Link>
            <Link to="/services" className="footer-nav-link">Services</Link>
            <Link to="/projects" className="footer-nav-link">Projects</Link>
          </div>

          {/* Team */}
          <div>
            <p className="footer-nav-title">About</p>
            <Link to="/team" className="footer-nav-link">Founders & Team</Link>
            <Link to="/contact" className="footer-nav-link">Contact Us</Link>
          </div>

          {/* Services */}
          <div>
            <p className="footer-nav-title">Services</p>
            <Link to="/services" className="footer-nav-link">Web Development</Link>
            <Link to="/services" className="footer-nav-link">App Development</Link>
            <Link to="/services" className="footer-nav-link">Digital Marketing</Link>
            <Link to="/services" className="footer-nav-link">Maintenance & Hosting</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pixora Labz. All rights reserved.</p>
          <p>Built with precision &amp; purpose.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
