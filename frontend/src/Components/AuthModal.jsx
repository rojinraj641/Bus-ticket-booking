import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { closeAuthModal, setAuthMode } from '../Features/User/uiSlice';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = () => {
  const dispatch = useDispatch();
  const { authModalOpen, authMode } = useSelector((state) => state.ui);

  // Prevent background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = authModalOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [authModalOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') dispatch(closeAuthModal());
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  if (!authModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={() => dispatch(closeAuthModal())}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-11/12 md:w-full max-w-md p-6 py-8 relative animate-[fadeIn_0.15s_ease-out]"
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        <button
          onClick={() => dispatch(closeAuthModal())}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        {/* Tabs */}
        <div className="flex mb-6 border-b">
          <button
            onClick={() => dispatch(setAuthMode('login'))}
            className={`flex-1 pb-3 font-bold ${
              authMode === 'login'
                ? 'text-[#2563E8] border-b-2 border-[#2563E8]'
                : 'text-gray-400'
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => dispatch(setAuthMode('signup'))}
            className={`flex-1 pb-3 font-bold ${
              authMode === 'signup'
                ? 'text-[#2563E8] border-b-2 border-[#2563E8]'
                : 'text-gray-400'
            }`}
          >
            SIGN UP
          </button>
        </div>

        {/* Swap in your real LoginForm / RegisterForm here */}
        {authMode === 'login' ? (
          <div><LoginForm /></div>
        ) : (
          <div><SignupForm /></div>
        )}
      </div>
    </div>
  );
};

export default AuthModal;