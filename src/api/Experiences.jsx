import axios from "axios"
import { getConfig } from "../utils/crypt";


const URL=import.meta.env.VITE_API_URL;

const getExperience = async (userID) => {
    console.log("->>> get experience called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/work-experiences`,config)
    return res.data;
}

const getExperienceByUser = async (userID) => {
    console.log("->>> getExperienceByUser called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/work-experiences/app-users/${userID}`,config)
    return res.data;
}


const postExperience = async (exp) => {
    console.log("->>> postExperince called..")
    const config = await getConfig();
    const res = await axios.post(`${URL}/api/v1/work-experiences`, exp, config)
    return res.data;
}


const putExperience = async (exp) => {
    console.log("->>> putExperince called..")
    console.log(exp)
    const config = await getConfig();
    const res = await axios.put(`${URL}/api/v1/work-experiences/${exp.id}`,exp, config)
    return res.data;
}

const deleteExperience = async (ID) => {
    console.log("->>> deleteExperience called..")
    const config = await getConfig();
    await axios.delete(`${URL}/api/v1/work-experiences/${ID}`, config)
}

export {postExperience, getExperience, getExperienceByUser, putExperience, deleteExperience}