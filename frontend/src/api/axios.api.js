import axios from "axios";
import store from "../App/store.js";
import { refreshSession } from "../Features/User/authSlice";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/`,
    withCredentials: true,
});
// Add access token to every request
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Handle expired access token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Access token expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/auth/refresh")
        ) {
            originalRequest._retry = true;
            try {
                // Get a new access token using refresh token
                const result = await store.dispatch(refreshSession());
                const newAccessToken = result.payload.accessToken;
                // Add new token to the failed request
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                // Refresh token is also invalid/expired
                window.location.href = "/";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;