import axios from "axios";
import { useAuthStore } from "../store/authStore";

const baseURL = "http://localhost:5000/api";

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
