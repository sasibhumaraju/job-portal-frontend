import axios from "axios"

const URL=import.meta.env.VITE_API_URL;

const getJobs = async () => {
    console.log("->>> get jobs called..")
    const res = await axios.get(`${URL}/api/v1/job-postings`)
    return res.data
}

const getJobsByEmployerID = async (userID) => {
    console.log("->>> getJobsByEmployerID called..")
    const res = await axios.get(`${URL}/api/v1/job-postings/app-users/${userID}`)
    return res.data
}

const getJobByID = async (jobId) => {
    console.log("->>> get jobByID called..")
    const res = await axios.get(`${URL}/api/v1/job-postings/${jobId}`)
    return res.data
}

const getJobsByKeyword = async (keyword) => {
    console.log("->>> get jobs called..")
    const res = await axios.get(`${URL}/api/v1/job-postings/search?keyword=${keyword}`)
    console.log(res.data)
    return res.data
    
}

const postJob = async (jobPosting) => {
    console.log("->>> postJob called..")
    const res = await axios.post(`${URL}/api/v1/job-postings`,jobPosting)
    console.log(res.data)
    return res.data
}

const putJob = async (jobPosting) => {
    console.log("->>> postJob called..")
    const res = await axios.put(`${URL}/api/v1/job-postings/${jobPosting.id}`,jobPosting)
    console.log(res.data)
    return res.data
}

const deleteJob = async (jobId) => {
    console.log("->>> deleteJob called..")
    const res = await axios.delete(`${URL}/api/v1/job-postings/${jobId}`)
    console.log(res.data)
    return res.data
}


export  {getJobs, getJobsByKeyword, getJobByID, postJob, putJob, deleteJob, getJobsByEmployerID};