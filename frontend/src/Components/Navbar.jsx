import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
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

  const navLinkClass = 'text-white/90 font-bold hover:text-white transition-colors';

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
          className="sm:hidden text-white focus:outline-none"
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

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden mt-4 bg-white rounded-md shadow-lg py-4 px-4 flex flex-col gap-3 text-gray-800 text-xs md:text-sm font-medium">
          <Link to="/my-booking" onClick={toggleMenu} className="hover:text-[#de1b0d]">MY BOOKING</Link>
          <Link to="/track-ticket" onClick={toggleMenu} className="hover:text-[#de1b0d]">TRACK TICKET</Link>
          <Link to="/wallet" onClick={toggleMenu} className="hover:text-[#de1b0d]">WALLET</Link>
          <div className="border-t border-gray-100 mt-2 pt-2">
            <Link
              onClick={handleUserClick}
              className="flex items-center gap-3 px-4 py-3 hover:text-[#de1b0d] transition-colors"
            >
              {name && (
                <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm font-bold">
                {name ? `Hello, ${name}` : 'Login / Signup'}
              </span>
            </Link>

            {name && openLogout && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-[#4B5563] hover:bg-red-50 hover:text-[#EF4444] active:bg-red-100 text-sm font-bold rounded-md transition-colors"
              >
                <svg
                  className="w-4 h-4 shrink-0"
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
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;