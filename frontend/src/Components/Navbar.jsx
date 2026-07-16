import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBusSimple, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { resetUserDetails } from '../Features/User/userSlice.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios.api.js';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openlogout, setopenlogout] = useState(false);

  const { name } = useSelector((state) => state.user);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleLogoutToggle = () => setopenlogout((prev) => !prev);

  const handleLogout = async () => {
  try {
    await api.post("/logout");
    setopenlogout(false);
    dispatch(resetUserDetails());
    navigate("/");
  } catch (error) {
    toast.error("Logout failed");
  }
};


  return (
    <nav className="bg-white shadow-md px-6 sm:px-10 py-4 relative z-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faBusSimple} className="text-[#de1b0d]" size="xl" />
          <span className="text-2xl font-bold text-[#de1b0d]">bookMyTrip</span>
        </Link>

        {/* Hamburger for Mobile */}
        <button onClick={toggleMenu} className="sm:hidden text-[#de1b0d] focus:outline-none">
          <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} size="lg" />
        </button>

        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-8 text-gray-800 text-sm font-medium">
          <Link to="/my-booking" className="hover:text-[#de1b0d] transition">My Booking</Link>
          <Link to="/track-ticket" className="hover:text-[#de1b0d] transition">Track Ticket</Link>
          <Link to="/wallet" className="hover:text-[#de1b0d] transition">Wallet</Link>
          <Link
            to={name ? '#' : '/register'}
            className="hover:text-[#de1b0d] transition"
            onClick={name ? handleLogoutToggle : undefined}
          >
            {name ? `Hello, ${name} ` : 'Login / Signup'}
          </Link>
          {openlogout &&
            <button
              className="hover:text-[#de1b0d] transition"
              onClick={handleLogout}
            >
              Log Out
            </button>
          }
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="sm:hidden mt-4 bg-white rounded-md shadow-lg py-4 px-4 flex flex-col gap-3 text-gray-800 text-sm font-medium">
          <Link to="/my-booking" onClick={toggleMenu} className="hover:text-[#de1b0d]">My Booking</Link>
          <Link to="/track-ticket" onClick={toggleMenu} className="hover:text-[#de1b0d]">Track Ticket</Link>
          <Link to="/wallet" onClick={toggleMenu} className="hover:text-[#de1b0d]">Wallet</Link>
          <Link
            to={name ? '/' : '/register'}
            onClick={toggleMenu}
            className="hover:text-[#de1b0d]"
          >
            {name ? `Hello,${name}` : 'Login / Signup'}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
