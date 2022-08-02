import CryptoJS from "crypto-js";

const secret = process.env.REACT_APP_CRYPTO_SECRET;

export const encrypt = (text) => {
  const json = CryptoJS.AES.encrypt(JSON.stringify(text), secret).toString();

  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Latin1.parse(json));
};

export const decrypt = (cipher) => {
  const decoded = decodeURIComponent(cipher);

  const data = CryptoJS.enc.Base64.parse(decoded.toString()).toString(
    CryptoJS.enc.Latin1
  );

  const bytes = CryptoJS.AES.decrypt(data, secret);

  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  return originalText.substring(1, originalText.length - 1);
};
