import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
// TODO: adjust this import + action name to match your actual auth slice
import { logout } from '../Features/User/authSlice';
import { openAuthModal } from '../Features/User/uiSlice';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const logoutRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // TODO: adjust to match your actual redux state shape (e.g. state.auth.user.name)
  const name = useSelector((state) => state.auth?.user?.name);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogoutToggle = () => setOpenLogout((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    setOpenLogout(false);
    setMenuOpen(false);
    navigate('/');
  };

  const handleLogin = () =>{
    dispatch(openAuthModal('login'));
  }

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
              onClick={handleLogin}
            >
              {name ? `Hello, ${name}` : 'LOGIN / SIGNUP'}
            </Link>

            {name && openLogout && (
              <button
                className="absolute right-0 mt-2 bg-white text-[#4B5563] text-xs md:text-base font-bold px-4 py-2 rounded-md shadow-lg hover:text-[#de1b0d] transition-colors whitespace-nowrap"
                onClick={handleLogout}
              >
                Log Out
              </button>
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

          <Link
            onClick={handleLogin}
            className="hover:text-[#de1b0d]"
          >
            {name ? `Hello, ${name}` : 'Login / Signup'}
          </Link>

          {name && openLogout && (
            <button
              onClick={handleLogout}
              className="text-left hover:text-[#de1b0d] text-xs md:text-base font-bold px-4 py-2 rounded-md transition-colors whitespace-nowrap"
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;