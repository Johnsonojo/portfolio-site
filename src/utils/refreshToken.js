import mem from "mem";
import axiosPublic from "../redux/axiosMethods/axiosPublic";
import { decrypt, encrypt } from "../utils";

export const refreshTokenFn = async () => {
  const decryptedData = decrypt(localStorage.getItem("session"));

  try {
    const response = await axiosPublic.post("/auth/refresh-token", {
      refreshToken: decryptedData?.refreshToken,
    });

    const { data } = response.data;

    if (!data?.accessToken) {
      localStorage.removeItem("session");
    }
    //   encrypt and store user data
    const { accessToken, refreshToken } = data;
    const session = { accessToken, refreshToken };
    const encryptedData = encrypt(session);
    localStorage.setItem("session", encryptedData);

    return accessToken;
  } catch (error) {
    localStorage.removeItem("session");
  }
};

const maxAge = 10000;

export const memoizedRefreshToken = mem(refreshTokenFn, {
  maxAge,
});
