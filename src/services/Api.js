import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 1000,
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const auth = token ? `${token}` : "";
    config.headers.common["auth"] = auth;
    return config;
  },
  (error) => Promise.reject(error)
);

export default Api;
