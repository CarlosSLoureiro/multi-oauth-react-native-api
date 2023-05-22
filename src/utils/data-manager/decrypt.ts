import CryptoJS from "crypto-js";

export default function decryptData (value: string): object | undefined {
  const data = value;

  let decrypted: object;

  if (data) {
    try {
      decrypted = JSON.parse(CryptoJS.AES.decrypt(decodeURIComponent(data), `CARLOS LOUREIRO`).toString(CryptoJS.enc.Utf8));
    } catch (e) {
    }
  }

  return decrypted;
}
