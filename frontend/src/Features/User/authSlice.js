import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    token: null, 
    user: ''
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
