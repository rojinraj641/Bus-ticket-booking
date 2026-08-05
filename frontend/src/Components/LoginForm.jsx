import { useState } from 'react';
import { TextField, Button, Alert, InputAdornment, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { login as loginAction, setUser } from '../Features/User/authSlice';
import { closeAuthModal, setAuthMode } from '../Features/User/uiSlice';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        formData
      );
      dispatch(loginAction(res.data.token));
      dispatch(setUser(res.data.user));
      dispatch(closeAuthModal());
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setServerError('');
    setGoogleLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
        { token: credentialResponse.credential }
      );
      dispatch(loginAction(res.data.token));
      dispatch(setUser(res.data.user));
      dispatch(closeAuthModal());
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Google login failed. Please try again.'
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setServerError('Google login failed. Please try again.');
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
      {serverError && <Alert className="mb-4" severity="error">{serverError}</Alert>}

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email || ' '}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email fontSize="small" className="text-gray-400" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password || ' '}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock fontSize="small" className="text-gray-400" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((prev) => !prev)}
                edge="end"
                size="small"
              >
                {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div className="flex justify-end -mt-2">
        <button
          type="button"
          className="text-sm font-medium text-[#2563E8] hover:underline"
          onClick={() => {/* TODO: wire up forgot-password flow */}}
        >
          Forgot password?
        </button>
      </div>

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
        sx={{
          bgcolor: '#2563E8',
          textTransform: 'none',
          fontWeight: 600,
          py: 1.2,
          '&:hover': { bgcolor: '#1D4ED8' },
        }}
      >
        {loading ? 'Logging in...' : 'Log In'}
      </Button>

      <Divider sx={{ my: 1 }}>
        <span className="text-xs text-gray-400">OR</span>
      </Divider>

      <div className="flex justify-center">
        {googleLoading ? (
          <Button variant="outlined" fullWidth disabled sx={{ textTransform: 'none', py: 1.2 }}>
            Signing in...
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="400"
            text="continue_with"
            shape="rectangular"
            logo_alignment="center"
          />
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-2">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          className="font-semibold text-[#2563E8] hover:underline"
          onClick={() => dispatch(setAuthMode('signup'))}
        >
          Sign up
        </button>
      </p>
    </form>
  );
};

export default LoginForm;