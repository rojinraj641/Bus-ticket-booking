import { useState } from 'react';
import { TextField, Button, Alert, InputAdornment, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import { login as loginAction, setUser } from '../Features/User/authSlice';
import { closeAuthModal, setAuthMode } from '../Features/User/uiSlice';

const SignupForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
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
        `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      dispatch(loginAction(res.data.token));
      dispatch(setUser(res.data.user));
      dispatch(closeAuthModal());
    } catch (err) {
      setServerError(
        err.response?.data?.message || 'Signup failed. Please try again.'
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
        err.response?.data?.message || 'Google signup failed. Please try again.'
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    setServerError('Google signup failed. Please try again.');
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-1">
      {serverError && <Alert className="mb-4" severity="error">{serverError}</Alert>}

      <TextField
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name || ' '}
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person fontSize="small" className="text-gray-400" />
            </InputAdornment>
          ),
        }}
      />

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

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? 'text' : 'password'}
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword || ' '}
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
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                edge="end"
                size="small"
              >
                {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
        {loading ? 'Creating account...' : 'Sign Up'}
      </Button>

      <Divider sx={{ my: 1 }}>
        <span className="text-xs text-gray-400">OR</span>
      </Divider>

      <div className="flex justify-center">
        {googleLoading ? (
          <Button variant="outlined" fullWidth disabled sx={{ textTransform: 'none', py: 1.2 }}>
            Signing up...
          </Button>
        ) : (
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="400"
            text="signup_with"
            shape="rectangular"
            logo_alignment='center'
          />
        )}
      </div>

      <p className="text-center text-sm text-gray-500 mt-2">
        Already have an account?{' '}
        <button
          type="button"
          className="font-semibold text-[#2563E8] hover:underline"
          onClick={() => dispatch(setAuthMode('login'))}
        >
          Log in
        </button>
      </p>
    </form>
  );
};

export default SignupForm;