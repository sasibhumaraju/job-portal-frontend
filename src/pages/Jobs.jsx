import { useEffect, useState } from 'react'
import style from "../css/jobs.module.css"
import f from "../assets/f.jpg"
import { getJobs, getJobsByKeyword } from '../api/jobs'
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Outlet, useNavigate } from 'react-router-dom'

function Jobs() {

  const [jobs,setJobs] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  

  const fetchJobs = async () => {
    const jobsList = keyword == ""? await getJobs() : await getJobsByKeyword(keyword);
    setJobs(jobsList);
  }

  const onClicked = (e) => {
      e.preventDefault();
      fetchJobs()
  }

  useEffect(()=>{
    fetchJobs();
  },[])

  return (
    <div className={style.jobs}>
      <div className={style.image_container}>
        <div className={style.image} >
             <img src={f}></img>
        </div>
       
        <div className={style.header_container}>
            <div className={style.header}>Because impact matters</div>
            <form>
            <div className={style.tail}>
              
                <input type='text' name='keyword' id='keyword' required value={keyword} onChange={(e)=>setKeyword(e.target.value)}  placeholder='🔎 Find your dream job, Search by designation or skills'></input>
                <button type='submit' className={style.button} onClick={onClicked}>Search jobs</button>
  
            </div>
             </form>
        </div>
      </div>
      
      
      <Outlet/>
      <div className={style.jobs_list_container}>
        <div className={style.job_list}>
          {jobs.length>0 && jobs.map((job)=>{
            return <div className={style.job_card} key={job.id}>
                <div className={style.designation}>{job.designation}</div>
                <div className={style.company_name}> <HiOutlineOfficeBuilding /> <> {job.companyName}</></div>
                <div className={style.comment}>{job.comment}</div>
                <div className={style.posted_by}>posted by <b>{job.appUserEmail}</b></div>
                <div className={style.see_details} onClick={()=>navigate(`/jobs/${job.id }`)} >See details</div>
            </div>
          })}
        
        </div>
      </div>
    </div>
  )
}

export default Jobs