import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faBars, faXmark, faTicket, faLocationDot, faWallet, faRightFromBracket, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Features/User/authSlice';
import { openAuthModal } from '../Features/User/uiSlice';
import api from "../Api/axios.api.js";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const logoutRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useSelector((state) => state.auth.user?.name);
  
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogin = () => {
    dispatch(openAuthModal('login'));
  }

  const handleUserClick = () => {
    if (name) {
      setOpenLogout((prev) => !prev);
    } else {
      handleLogin();
    }
  };

  const handleLogout = async () => {
    try {
      await api.post('/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(logout());
      setOpenLogout(false);
      setMenuOpen(false);
      navigate('/');
    }
  };

  // Close the logout dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (logoutRef.current && !logoutRef.current.contains(e.target)) {
        setOpenLogout(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinkClass = 'text-white/90 font-bold hover:text-white transition-colors';

  const mobileLinks = [
    { to: '/my-booking', label: 'My Booking', icon: faTicket },
    { to: '/track-ticket', label: 'Track Ticket', icon: faLocationDot },
    { to: '/wallet', label: 'Wallet', icon: faWallet },
  ];

  return (
    <nav className="bg-[#2563E8] border-[#3B82F6] shadow-xl px-6 sm:px-10 py-4 relative z-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faBusSimple} className="text-white" size="xl" />
          <span className="text-2xl font-bold text-white">BookMyTrip</span>
        </Link>

        {/* Hamburger for Mobile */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-white focus:outline-none w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 active:scale-90 transition-all duration-150"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-8 text-xs md:text-sm">
          <Link to="/my-booking" className={navLinkClass}>MY BOOKING</Link>
          <Link to="/track-ticket" className={navLinkClass}>TRACK TICKET</Link>
          <Link to="/wallet" className={navLinkClass}>WALLET</Link>

          <div className="relative" ref={logoutRef}>
            <Link
              className={navLinkClass}
              onClick={handleUserClick}
            >
              {name ? `Hello, ${name}` : 'LOGIN / SIGNUP'}
            </Link>

            {name && openLogout && (
              <div
                className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 origin-top-right animate-in fade-in zoom-in-95 duration-150"
              >
                {/* Small caret pointing up to the trigger */}
                <div className="absolute -top-1.5 right-4 w-3 h-3 bg-white border-t border-l border-gray-100 rotate-45" />

                {/* User info header */}
                <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111827] truncate">{name}</p>
                    <p className="text-xs text-[#4B5563]">Signed in</p>
                  </div>
                </div>

                {/* Logout action */}
                <button
                  className="w-full flex items-center gap-2 px-4 py-2.5 mt-1 text-sm font-medium text-[#4B5563] hover:bg-red-50 hover:text-[#EF4444] transition-colors"
                  onClick={handleLogout}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===================== Mobile Bottom Sheet ===================== */}

      {/* Backdrop */}
      <div
        onClick={toggleMenu}
        className={`sm:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sheet */}
      <div
        className={`sm:hidden fixed left-0 right-0 bottom-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-white rounded-t-3xl shadow-[0_-8px_30px_rgba(0,0,0,0.15)] max-h-[85vh] overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1.5 rounded-full bg-slate-200" />
          </div>

          {/* User header */}
          <div className="px-5 pt-3 pb-4">
            {name ? (
              <button
                onClick={handleUserClick}
                className="w-full flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 px-4 py-4 active:scale-[0.98] transition-transform duration-150"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-white/20 ring-2 ring-white/30 text-white flex items-center justify-center font-bold text-base shrink-0">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 text-left">
                    <p className="text-sm font-bold text-white truncate">{name}</p>
                    <p className="text-xs text-blue-100">Signed in • Tap for options</p>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className={`text-white/70 text-xs transition-transform duration-200 shrink-0 ${
                    openLogout ? "rotate-90" : "rotate-0"
                  }`}
                />
              </button>
            ) : (
              <button
                onClick={handleUserClick}
                className="w-full flex items-center gap-3 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-500 px-4 py-4 active:scale-[0.98] transition-transform duration-150"
              >
                <div className="w-11 h-11 rounded-full bg-white/20 ring-2 ring-white/30 text-white flex items-center justify-center shrink-0">
                  <FontAwesomeIcon icon={faBusSimple} className="text-base" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Login / Signup</p>
                  <p className="text-xs text-blue-100">Book faster with an account</p>
                </div>
              </button>
            )}

            {/* Logout row — expands under the user card */}
            <div
              className={`overflow-hidden transition-all duration-200 ${
                name && openLogout ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
              }`}
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-left text-[#EF4444] text-sm font-semibold active:bg-red-100 transition-colors"
              >
                <FontAwesomeIcon icon={faRightFromBracket} className="w-4 h-4 shrink-0" />
                Log Out
              </button>
            </div>
          </div>

          {/* Nav links */}
          <div className="px-5 pb-2">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-2">
              Quick Links
            </p>
            <div className="flex flex-col gap-1">
              {mobileLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu}
                  className="flex items-center justify-between gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold text-[#111827] active:bg-slate-50 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                      <FontAwesomeIcon icon={link.icon} className="w-4 h-4 text-[#2563EB]" />
                    </span>
                    {link.label}
                  </span>
                  <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-slate-300" />
                </Link>
              ))}
            </div>
          </div>

          <div className="h-3" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;