import CryptoJS from 'crypto-js';
import { getItem } from "../utils/storage";

const KEY = import.meta.env.VITE_SECRET_KEY;

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, KEY).toString();
};

export const decrypt = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};




export const getConfig = async () => {
    var u = await getItem("user")
    if(u === null) return {}
    var token = u.jwtToken
    const decryptedToken =  decrypt(token);
    // console.log("JWTT->>", decryptedToken)
    return { headers: { 'Authorization': `Bearer ${decryptedToken}` } }
}