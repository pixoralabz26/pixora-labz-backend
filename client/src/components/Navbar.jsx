import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location]);

  // Prevent scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          {/* Logo + Company Name */}
          <Link to="/" className="nav-logo-block">
            <img
              src="/logo-black.png"
              alt="Pixora Labz logo"
              className="nav-logo-img"
            />
            <span className="nav-brand-name">Pixora Labz</span>
          </Link>

          {/* Desktop Links — centred absolutely */}
          <div className="nav-links">
            <NavLink to="/services" className="nav-link">Services</NavLink>
            <NavLink to="/projects" className="nav-link">Projects</NavLink>
            <NavLink to="/team" className="nav-link">Team</NavLink>
            <NavLink to="/contact" className="nav-link">Contact</NavLink>
          </div>

          {/* Desktop CTA */}
          <Link to="/contact" className="nav-cta">Get Started →</Link>

          {/* Hamburger — mobile only */}
          <button
            className={`nav-hamburger${open ? ' open' : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nav-mobile-drawer${open ? ' open' : ''}`}>
        <NavLink to="/" className="nav-mobile-link">Home</NavLink>
        <NavLink to="/services" className="nav-mobile-link">Services</NavLink>
        <NavLink to="/projects" className="nav-mobile-link">Projects</NavLink>
        <NavLink to="/team" className="nav-mobile-link">Team</NavLink>
        <NavLink to="/contact" className="nav-mobile-link">Contact</NavLink>
        <Link to="/contact" className="nav-mobile-cta">Get Started →</Link>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            top: 'var(--nav-height)',
            background: 'rgba(0,0,0,0.3)',
            zIndex: 9997,
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </>
  );
};

export default Navbar;
