import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { openAuthModal } from '../Features/User/uiSlice';
import { setToast } from '../Features/Error/toastSlice';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      dispatch(setToast({ message: "Please log in", success: false }));
      dispatch(openAuthModal('login'));
    }
  }, [isLoading, isAuthenticated, dispatch]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;