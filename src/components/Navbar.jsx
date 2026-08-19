import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import '../styles/Navbar.css'

/* ── Nav link definitions ── */
const NAV_LINKS = [
  { to: '/',            label: 'Home',          end: true  },
  { to: '/properties',  label: 'Properties',    end: false },
  { to: '/add-property',label: 'Add Property',  end: false },
]

/* ── Helper: active class for NavLink ── */
const navCls = ({ isActive }) =>
  ['nb__link', isActive ? 'nb__link--active' : ''].filter(Boolean).join(' ')

const drawerCls = ({ isActive }) =>
  ['nb__drawer-link', isActive ? 'nb__drawer-link--active' : ''].filter(Boolean).join(' ')

/* ════════════════════════════════════════
   Component
════════════════════════════════════════ */
function Navbar() {
  const [open,      setOpen]      = useState(false)   // hamburger / drawer state
  const [scrolled,  setScrolled]  = useState(false)   // scroll shadow
  const [visible,   setVisible]   = useState(true)    // hide-on-scroll-down
  const lastScrollY = useRef(0)
  const drawerRef   = useRef(null)
  const location    = useLocation()

  /* Close drawer whenever route changes */
  useEffect(() => { setOpen(false) }, [location.pathname])

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  /* Scroll listener: add shadow + hide/show on scroll direction */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 10)
      setVisible(y < lastScrollY.current || y < 60)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close drawer on outside click */
  const handleOverlayClick = useCallback(() => setOpen(false), [])

  /* Keyboard: close on Escape */
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const toggle = () => setOpen(prev => !prev)

  return (
    <>
      {/* ══ NAVBAR HEADER ══ */}
      <header
        className={[
          'nb',
          scrolled  ? 'nb--scrolled' : '',
          !visible  ? 'nb--hidden'   : '',
          open      ? 'nb--open'     : '',
        ].filter(Boolean).join(' ')}
        role="banner"
      >
        <div className="nb__inner">

          {/* ── Brand / Logo ── */}
          <Link to="/" className="nb__brand" aria-label="RealNest — go to homepage">
            <span className="nb__brand-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </span>
            <span className="nb__brand-name">RealNest</span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="nb__nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={navCls}>
                {label}
              </NavLink>
            ))}
          </nav>

          {/* ── Desktop auth buttons ── */}
          <div className="nb__auth" role="group" aria-label="Account actions">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                ['nb__auth-btn nb__auth-btn--ghost', isActive ? 'nb__auth-btn--active' : '']
                  .filter(Boolean).join(' ')
              }
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              Login
            </NavLink>
            <NavLink to="/register" className="nb__auth-btn nb__auth-btn--solid">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <line x1="19" y1="8" x2="19" y2="14"/>
                <line x1="22" y1="11" x2="16" y2="11"/>
              </svg>
              Register
            </NavLink>
          </div>

          {/* ── Hamburger button (mobile only) ── */}
          <button
            className={['nb__hamburger', open ? 'nb__hamburger--open' : ''].filter(Boolean).join(' ')}
            onClick={toggle}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="nb-drawer"
          >
            <span className="nb__ham-box" aria-hidden="true">
              <span className="nb__ham-line nb__ham-line--top"    />
              <span className="nb__ham-line nb__ham-line--middle" />
              <span className="nb__ham-line nb__ham-line--bottom" />
            </span>
          </button>

        </div>
      </header>

      {/* ══ MOBILE OVERLAY ══ */}
      <div
        className={['nb__overlay', open ? 'nb__overlay--visible' : ''].filter(Boolean).join(' ')}
        onClick={handleOverlayClick}
        aria-hidden="true"
      />

      {/* ══ MOBILE DRAWER ══ */}
      <nav
        id="nb-drawer"
        ref={drawerRef}
        className={['nb__drawer', open ? 'nb__drawer--open' : ''].filter(Boolean).join(' ')}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        {/* Drawer header */}
        <div className="nb__drawer-head">
          <Link to="/" className="nb__drawer-brand" onClick={() => setOpen(false)}>
            <span className="nb__brand-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </span>
            <span className="nb__brand-name">RealNest</span>
          </Link>
          <button
            className="nb__drawer-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5"
              strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <div className="nb__drawer-nav">
          <p className="nb__drawer-section">Navigation</p>
          {NAV_LINKS.map(({ to, label, end }, i) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={drawerCls}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {label === 'Home' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              )}
              {label === 'Properties' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                </svg>
              )}
              {label === 'Add Property' && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
              )}
              <span>{label}</span>
              <svg className="nb__drawer-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </NavLink>
          ))}
        </div>

        {/* Drawer auth buttons */}
        <div className="nb__drawer-auth">
          <p className="nb__drawer-section">Account</p>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              ['nb__drawer-link', isActive ? 'nb__drawer-link--active' : ''].filter(Boolean).join(' ')
            }
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span>Login</span>
            <svg className="nb__drawer-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </NavLink>

          <Link
            to="/register"
            className="nb__drawer-cta"
            onClick={() => setOpen(false)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <line x1="19" y1="8" x2="19" y2="14"/>
              <line x1="22" y1="11" x2="16" y2="11"/>
            </svg>
            Create Free Account
          </Link>
        </div>

        {/* Drawer footer */}
        <div className="nb__drawer-foot">
          <p>© {new Date().getFullYear()} RealNest. All rights reserved.</p>
        </div>
      </nav>
    </>
  )
}

export default Navbar
