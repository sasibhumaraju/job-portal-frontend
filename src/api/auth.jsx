import axios from "axios"
import { cookies } from "../utils/Cooks";
import { decrypt, encrypt } from "../utils/crypt";
import { getItem, setItem } from "../utils/storage";
import Constants from "../constants";

const URL = import.meta.env.VITE_API_URL;

const registerUser = async (user) => {
  console.log("user register called..");
  try {
    const res = await axios.post(`${URL}/api/v1/auth/register`, user);
    cookies.remove('jwt', { path: '/' });
    if (res.data && res.data.jwtToken) {
      var u = res.data;
      const encryptedToken = encrypt(u.jwtToken);
      u = {...u, "jwtToken":encryptedToken}
      setItem('user', u);
      return Constants.SUCCESS
    }
  } catch (error) {
    console.log("Registration error →", error);
    return Constants.FAILED
  }
};

const authenticateUser = async (user) => {
  console.log("user authenticate called..");
  try {
    const res = await axios.post(`${URL}/api/v1/auth/authenticate`, user);
    cookies.remove('jwt', { path: '/' });
    if (res.data && res.data.jwtToken) {
      var u = res.data;
      const encryptedToken = encrypt(u.jwtToken);
      u = {...u, "jwtToken":encryptedToken}
      setItem('user', u);
      return Constants.SUCCESS
    }
  } catch (error) {
    console.error("Authentication error →", error);
     return Constants.FAILED
  }
};

const logoutUser = async () => {
  console.log("user logout called..");
  try {
    const res = await axios.post(`${URL}/api/v1/auth/authenticate`, user);
    cookies.remove('jwt', { path: '/' });
    if (res.data && res.data.jwtToken) {
      const encryptedToken = encrypt(res.data.jwtToken);
      setItem('jwt', encryptedToken);
       return Constants.SUCCESS
    }
  } catch (error) {
    console.error("Authentication error →", error);
     return Constants.FAILED
  }
};

export { registerUser, authenticateUser };
