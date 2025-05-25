import axios from "axios"

const URL=import.meta.env.VITE_API_URL;

const getUserByEmail = async (email) => {
    console.log("->>> get userByEmail called..")
    const res = await axios.get(`${URL}/api/v1/app-users/search-by-email?email=${email}`)
    console.log(res)
    return res.data
}

const getUserByID = async (ID) => {
    console.log("->>> getUserByID called..")
    const res = await axios.get(`${URL}/api/v1/app-users/${ID}`)
    console.log(res)
    return res.data
}

const postUser = async (user) => {
    console.log("->>> post user called..")
    const res = await axios.post(`${URL}/api/v1/app-users`, user)
    return res.data;
}

export {getUserByEmail, postUser, getUserByID}