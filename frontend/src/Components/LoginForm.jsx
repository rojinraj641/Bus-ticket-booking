import { useState } from 'react';
import { TextField, Button, Alert, InputAdornment, IconButton, Divider } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import api from "../Api/axios.api.js";
import { GoogleLogin } from '@react-oauth/google';
import { login, setUser } from '../Features/User/authSlice';
import { closeAuthModal, setAuthMode } from '../Features/User/uiSlice';
import { setToast } from '../Features/Error/toastSlice.js';
import { setLoading } from '../Features/Loading/loadingSlice.js';

const LoginForm = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { isLoading } = useSelector((state) => state.loading);

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
    if (!validate()) return;
    dispatch(setLoading(true));
    try {
      const res = await api.post('/login',
        {
          email: formData.email,
          password: formData.password
        }
      );
      dispatch(login(res.data.data.accessToken));
      dispatch(setUser(res.data.data.user));
      dispatch(closeAuthModal());
      dispatch(setToast({ message: res.data.message || 'Logged in successfully!', success: true }));
    } catch (err) {
      if(err.response?.status === 404){
        dispatch(setToast({ message: "User not found. Please signup instead.", success: false }));
        dispatch(setAuthMode('signup'));
      }else if(err.response?.status === 401){
        dispatch(setToast({ message: "Invalid email or password. Please try again.", success: false }));
      }else{
        dispatch(setToast({message: err.response?.data?.message || 'Login failed. Please check your credentials.', success: false}))
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setGoogleLoading(true);
    try {
      const res = await api.post('/google/login',
        { token: credentialResponse.credential }
      );
      dispatch(login(res.data.data.accessToken));
      dispatch(setUser(res.data.data.user));
      dispatch(closeAuthModal());
      dispatch(setToast({message: res.data.message || 'Logged in successfully!', success: true}));
    } catch (err) {
      dispatch(setToast({message: err.response?.data?.message || 'Google login failed. Please try again.', success: false}));
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleGoogleError = () => {
    dispatch(setToast({message: 'Google login failed. Please try again.', success: false}))
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2">
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
        disabled={isLoading}
        fullWidth
        sx={{
          bgcolor: '#2563E8',
          textTransform: 'none',
          fontWeight: 600,
          py: 1.2,
          '&:hover': { bgcolor: '#1D4ED8' },
        }}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
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
            width="fit-content"
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