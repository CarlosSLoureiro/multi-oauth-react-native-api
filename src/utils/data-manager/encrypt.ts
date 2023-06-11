import CryptoJS from "crypto-js";

export default function encryptData (data: object): string {
  const jsonResponse = JSON.stringify(data);
  const encrypted = encodeURIComponent(CryptoJS.AES.encrypt(jsonResponse, process.env.CLIENT_SALT).toString());
  return encrypted;
}
