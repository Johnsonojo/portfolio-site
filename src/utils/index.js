import CryptoJS from "crypto-js";

// encryption secret key, ideally should be an environment variable
const secret = process.env.REACT_APP_SECRET;

// expiry duration in milliseconds, ensure you calculate the expiry in milliseconds
const expiryDuration = process.env.REACT_APP_EXPIRY_DURATION;

// encrypt data
export const encrypt = (dataToEncrypt) => {
  if (dataToEncrypt !== null) {
    return CryptoJS.AES.encrypt(
      JSON.stringify(dataToEncrypt),
      secret
    ).toString();
  }
  return null;
};

// decrypt encrypted data
export const decrypt = (dataToDecrypt) => {
  try {
    if (dataToDecrypt !== null && dataToDecrypt !== "null") {
      let bytes = CryptoJS.AES.decrypt(dataToDecrypt.toString(), secret);
      let decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// store in localStorage
export const setToStorage = (key, value) => {
  return localStorage.setItem(key, value);
};

// read from localStorage
export const getFromStorage = (key) => {
  return localStorage.getItem(key);
};

// get new expiry
export const getExpiry = () => {
  return new Date().getTime() + expiryDuration;
};

// check if expired
export const isExpired = (expiry) => {
  return new Date().getTime() > parseInt(expiry, 10);
};

// Encrypt and store with time expiry functionality
export const storeExpiry = (key, value, expiry = false) => {
  const encryptedData = encrypt(value);
  if (expiry === true) {
    const encryptedExpiry = encrypt(getExpiry());
    setToStorage(`${key}.e`, encryptedExpiry);
  }
  return setToStorage(key, encryptedData);
};

// decrypt and read with time expiry functionality
export const readExpiry = (key) => {
  const expiryData = decrypt(getFromStorage(`${key}.e`));
  const data = decrypt(getFromStorage(key));
  if (data != null) {
    if (data && isExpired(expiryData)) {
      return { response: data, expired: true };
    }
    if (data && !isExpired(expiryData)) {
      return { response: data, expired: false };
    }
  }
  return { response: null, expired: true };
};

// reset localStorage
export const clearStorage = () => {
  localStorage.clear();
  return null;
};
