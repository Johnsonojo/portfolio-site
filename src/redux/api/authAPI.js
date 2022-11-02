import { encrypt } from "../../utils";
import axiosPublic from "../axiosMethods/axiosPublic";

const authAPI = {};

authAPI.loginUser = async ({ loginDetails }) => {
  try {
    const response = await axiosPublic.post("auth/login", loginDetails);
    const { data } = response;
    // encrypt and store user data
    const { accessToken, refreshToken } = data?.data;
    const session = { accessToken, refreshToken };
    const encryptedData = encrypt(session);
    localStorage.setItem("session", encryptedData);
    return data;
  } catch (error) {
    throw error;
  }
};

export default authAPI;
