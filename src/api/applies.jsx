import axios from "axios"

const URL=import.meta.env.VITE_API_URL;

const postApply = async (apply) => {
    console.log("->>> post apply called..")
    const res = await axios.post(`${URL}/api/v1/applies`, apply)
    console.log(res)
    return res.data;
}

const getApplyByJobAndUser = async (jobID, userID) => {
    console.log("->>> getApplyByJobAndUser called..")
    const res = await axios.get(`${URL}/api/v1/applies/job-postings/${jobID}/app-users/${userID}`)
    return res.data;
}

const getAppliesByUser = async (userID) => {
    console.log("->>> getAppliesByUser called..")
    const res = await axios.get(`${URL}/api/v1/applies/app-users/${userID}`)
    return res.data;
}

const getAppliesByJob = async (jobID) => {
    console.log("->>> getAppliesByJob called..")
    const res = await axios.get(`${URL}/api/v1/applies/job-postings/${jobID}`)
    return res.data;
}

export {postApply, getApplyByJobAndUser, getAppliesByUser, getAppliesByJob}