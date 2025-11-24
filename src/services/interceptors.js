import axios from "axios";
 
const blogConfig = axios.create();
 
blogConfig.interceptors.request.use(
  (config) => {
    const { headers, url } = config;
    const userData = JSON.parse(sessionStorage.getItem("token"));
    headers.Authorization = `Bearer ${userData}`;
 
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
      sessionStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
 
export default blogConfig;
 
