import axios from "axios";

const blogConfig = axios.create();

blogConfig.interceptors.request.use(
  (config) => {
    const { headers, url } = config;
    const userData = JSON.parse(sessionStorage.getItem("user")!);
    headers.Authorization = `Bearer ${userData.token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

blogConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("userData"); // Clear token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default blogConfig;
