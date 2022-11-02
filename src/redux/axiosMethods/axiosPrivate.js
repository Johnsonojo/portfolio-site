import axios from "axios";
import { decrypt } from "../../utils";
import { memoizedRefreshToken } from "../../utils/refreshToken";

const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosPrivate.interceptors.request.use(
  async (config) => {
    const decryptedData = decrypt(localStorage.getItem("session"));
    if (decryptedData?.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${decryptedData?.accessToken}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    if (error?.response?.status === 403 && !originalRequest?.sent) {
      originalRequest.sent = true;
      const accessToken = await memoizedRefreshToken();
      if (accessToken) {
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosPrivate(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
