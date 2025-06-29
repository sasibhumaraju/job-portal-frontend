import axios from "axios"
import { getItem } from "../utils/storage";
import { decrypt, getConfig } from "../utils/crypt";

const URL=import.meta.env.VITE_API_URL;


const postApply = async (apply) => {
    console.log("->>> post apply called..")
    const config = await getConfig();
    console.log("apply Job ->", apply)
    const res = await axios.post(`${URL}/api/v1/applies`, apply, config)
    console.log(res)
    return res.data;
}

const getApplyByJobAndUser = async (jobID, userID) => {
    console.log("->>> getApplyByJobAndUser called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/applies/job-postings/${jobID}/app-users/${userID}`, config)
    return res.data;
}

const getAppliesByUser = async (userID) => {
    console.log("->>> getAppliesByUser called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/applies/app-users/${userID}`, config)
    return res.data;
}

const getAppliesByJob = async (jobID) => {
    console.log("->>> getAppliesByJob called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/applies/job-postings/${jobID}`, config)
    return res.data;
}

export {postApply, getApplyByJobAndUser, getAppliesByUser, getAppliesByJob}