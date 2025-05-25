import axios from "axios"

const URL=import.meta.env.VITE_API_URL;

const getExperience = async (userID) => {
    console.log("->>> get experience called..")
    const res = await axios.get(`${URL}/api/v1/work-experiences`)
    return res.data;
}

const getExperienceByUser = async (userID) => {
    console.log("->>> getExperienceByUser called..")
    const res = await axios.get(`${URL}/api/v1/work-experiences/app-users/${userID}`)
    return res.data;
}


const postExperience = async (exp) => {
    console.log("->>> postExperince called..")
    const res = await axios.post(`${URL}/api/v1/work-experiences`, exp)
    return res.data;
}


const putExperience = async (exp) => {
    console.log("->>> putExperince called..")
    console.log(exp)
    const res = await axios.put(`${URL}/api/v1/work-experiences/${exp.id}`,exp)
    return res.data;
}

const deleteExperience = async (ID) => {
    console.log("->>> deleteExperience called..")
    await axios.delete(`${URL}/api/v1/work-experiences/${ID}`)
}

export {postExperience, getExperience, getExperienceByUser, putExperience, deleteExperience}