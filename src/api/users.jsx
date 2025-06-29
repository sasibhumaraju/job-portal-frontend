import axios from "axios"
import { getConfig } from "../utils/crypt";

const URL=import.meta.env.VITE_API_URL;

const getUserByEmail = async (email) => {
    console.log("->>> get userByEmail called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/app-users/search-by-email?email=${email}`, config)
    return res.data;
}

const getUserByID = async (ID) => {
    console.log("->>> getUserByID called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/app-users/${ID}`, config)
    return res.data
}

const postUser = async (user) => {
    console.log("->>> post user called..")
    const config = await getConfig();
    const res = await axios.post(`${URL}/api/v1/app-users`, user, config)
    return res.data;
}

export {getUserByEmail, postUser, getUserByID}