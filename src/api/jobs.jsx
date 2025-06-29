import axios from "axios"
import { getConfig } from "../utils/crypt";

const URL=import.meta.env.VITE_API_URL;

const getJobs = async () => {
    console.log("->>> get jobs called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/job-postings`, config)
    return res.data
}

const getJobsByEmployerID = async (userID) => {
    console.log("->>> getJobsByEmployerID called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/job-postings/app-users/${userID}`, config)
    return res.data
}

const getJobByID = async (jobId) => {
    console.log("->>> get jobByID called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/job-postings/${jobId}`, config)
    return res.data
}

const getJobsByKeyword = async (keyword) => {
    console.log("->>> get jobs called..")
    const config = await getConfig();
    const res = await axios.get(`${URL}/api/v1/job-postings/search?keyword=${keyword}`, config)
    console.log(res.data)
    return res.data
    
}

const postJob = async (jobPosting) => {
    console.log("->>> postJob called..")
    const config = await getConfig();
    const res = await axios.post(`${URL}/api/v1/job-postings`,jobPosting, config)
    console.log(res.data)
    return res.data
}

const putJob = async (jobPosting) => {
    console.log("->>> postJob called..")
    const config = await getConfig();
    const res = await axios.put(`${URL}/api/v1/job-postings/${jobPosting.id}`,jobPosting, config)
    console.log(res.data)
    return res.data
}

const deleteJob = async (jobId) => {
    console.log("->>> deleteJob called..")
    const config = await getConfig();
    const res = await axios.delete(`${URL}/api/v1/job-postings/${jobId}`, config)
    console.log(res.data)
    return res.data
}


export  {getJobs, getJobsByKeyword, getJobByID, postJob, putJob, deleteJob, getJobsByEmployerID};