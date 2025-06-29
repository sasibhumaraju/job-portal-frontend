import { useEffect, useState } from 'react'
import style from "../css/jobs.module.css"
import { getJobs, getJobsByKeyword } from '../api/jobs'
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Outlet, useNavigate } from 'react-router-dom'
import { BiMessageSquare } from 'react-icons/bi';
import { LuShare2 } from 'react-icons/lu';
import toast from 'react-hot-toast';
import Loading from './loading';

function Jobs() {

  const URL=import.meta.env.VITE_SELF_URL;

  const [jobs,setJobs] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate()
  

  const fetchJobs = async () => {
    const jobsList = keyword == ""? await getJobs() : await getJobsByKeyword(keyword);
    setJobs(jobsList);
  }

  const onClicked = (e) => {
      e.preventDefault();
      document.activeElement.blur();
      fetchJobs()
  }

  useEffect(()=>{
    fetchJobs();
  },[])

  const copyLink = (jobName,jobId) => {
    navigator.clipboard.writeText(`${URL}/jobs/${jobId}`).then(() => {
      toast(`${jobName} Link Copied to Clip Board!`, { icon: '🙈', replace:true,   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
    }).catch(err => {
      toast(`Failed to Copy Link!`, { icon: '😭', replace:true,   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
    });
    
  }

  return (
    <div className={style.jobs}>
       
        <div className={style.header_container}>
          <form onSubmit={onClicked}>
            <div className={style.tail}>
                <input type='text' name='keyword' id='keyword' value={keyword} onChange={(e)=>setKeyword(e.target.value)}  placeholder='Search Skill or Title and Press Enter'></input>
                {/* <button type='submit' className={style.button} >Search jobs</button> */}
            </div>
          </form>
        </div>
      
      
      <div className={style.jobs_list_container}>
        <div className={style.job_list}>
          {!jobs && <Loading/>}
          { jobs && jobs.length>0 && jobs.map((job)=>{
            return <div className={style.job_card} key={job.id}>

              <div className={style.job_card_heading}>
               <BiMessageSquare size={40} /> 
                <div className={style.job_card_heading_tail}>
                  <div className={style.designation}>{job.designation}</div>
                  <div className={style.company_name}>{job.companyName}</div>
                </div>
                <div className={style.share} onClick={()=>copyLink(job.designation,job.id)}><LuShare2 size={23} /></div>
              </div>

              <div className={style.comment}>{job.comment}</div>
                <div className={style.posted_by}>posted by <b onClick={()=>{window.location.href = `mailto:${job.appUserEmail}`;}}>{job.appUserEmail}</b></div>
                <div className={style.see_details} onClick={()=>navigate(`/jobs/${job.id }`)} >See details</div>
            </div>
          })}
        
        </div>
      </div>
    </div>
  )
}

export default Jobs