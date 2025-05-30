import React, { useEffect, useState } from 'react'
import style from '../css/jobs.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteJob, getJobByID } from '../api/jobs';
import { IoArrowBack } from "react-icons/io5";
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { getItem } from '../utils/storage';
import toast from 'react-hot-toast';
import { getApplyByJobAndUser, postApply } from '../api/applies';
import Applies from '../components/Applies';
import { BiMessageSquare } from 'react-icons/bi';
import { LuShare2 } from 'react-icons/lu';
import Loading from './loading';

function Job() {

    const {jobId} = useParams()
    const [job, setJob] = useState(null);
    const [user, setUser] = useState(null);
    const [comment, setComment] = useState("");
    const [expectedSalary, setExpectedSalary] = useState("");
    const [showApplyForm, toggleShowApplyForm] = useState(true);

    const navigate = useNavigate();

    useEffect(()=>{
        load()
    },[])

    const load =  async () => {
        await fetchJob(jobId)
        await loadUser()
    }

    const fetchJob = async (jobID) => {
      const job = await getJobByID(jobID)
       const u = await getItem("user")
      await checkIsAlredyApplied(u,job,"I")
      setJob(job);
    }

    const loadUser = async () => {
        const u = await getItem("user")
        u == null? setUser(null) : setUser(u);
    }

    const copyLink = (jobName,jobId) => {
        navigator.clipboard.writeText(`${URL}/jobs/${jobId}`).then(() => {
          toast(`${jobName} Link Copied to Clip Board!`, { icon: '🙈', replace:true,   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        }).catch(err => {
          toast(`Failed to Copy Link!`, { icon: '😭', replace:true,   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        });
     }

    const checkIsAlredyApplied = async (u,j, mode)=>{
         
          if( u?.role=="EMPLOYER") {  
            u.id == j.appUserID? toast(`You posted this job`, {  icon: "👇🏻",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},}) :
            toast(`EMPLOYER can not apply for jobs`, {  icon: "🚫",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
            toggleShowApplyForm(false);
            return;
          }

          const a = await getApplyByJobAndUser(jobId,u?.id)
          
          if(a.expectedSalary == undefined )  {
            toggleShowApplyForm(true);
          } else {
            toggleShowApplyForm(false);
            if(mode=="I") toast(`You already applied for this job`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
          }
          
    }

    const deleteThisJob = async () => {
      const res = await deleteJob(jobId);
      if(res == "") {
        toast(`Job Deleted Successfully`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        navigate("/jobs");
      } else {
        toast(`Failed to Delete Job`, {  icon: "😞",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
      }
    }


    const applyJob = async (e) => {
      e.preventDefault();

       const u = await getItem("user")
        u == null? setUser(null) : setUser(u);
        if(u == null) {
           toast(`First signin to job portal to apply`, {  icon: "✍️",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        } else {
          if(u.role === "EMPLOYER") {
             toast(`Signin as job seeker to apply for jobs : You are EMPLOYER`, {  icon: "🙆🏻‍♂️",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
          } else {
              const applyObject = {
                "id":null,
                "jobPostingID":jobId,
                "appUserID":user.id,
                "expectedSalary":expectedSalary,
                "comment":comment
              }
             
                const a = await postApply(applyObject);
                
                if(a.expectedSalary == undefined)  {
                  toast(`Failed to apply for the job`, {  icon: "😭",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
                } else {
                  
                 toast(`Succesfully applied for expected salary ${a.expectedSalary} lakhs`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
                 const u = await getItem("user")
                 checkIsAlredyApplied(u,null,"L")
                }

          }
        }
    }



  return (
    <div className={style.job_page}>
        <div className={style.back} onClick={()=>navigate(-1)}> 
          <IoArrowBack size={25} />
          Go back 
        </div>
        {!job && <Loading/>}
        {job && <> <div className={style.job_container}>
          

           <div className={style.job_card_heading}>
              <BiMessageSquare size={40} /> 
              <div className={style.job_card_heading_tail}>
                <div className={style.designation}>{job.designation}</div>
                <div className={style.company_name}>{job.companyName}</div>
              </div>
              <div className={style.share} onClick={()=>copyLink(job.designation,job.id)}><LuShare2 size={23} /></div>
          </div>
          <div className={style.posted_by}>posted by <b>{job.appUserEmail}</b></div>
          
          <div className={style.divider}/>

          <div>
              <div className={style.overview}>Requirements</div>
              <div className={style.comment}>{job.comment}</div>
          </div>

          <div className={style.divider}/>

          <div>
              <div className={style.overview}>Terms & Conditions</div>
              <div className={style.terms}>
                By submitting your application for employment, you acknowledge and agree that all information provided is accurate and complete to the best of your knowledge. You authorize the company to verify any information included in your application and to conduct background checks as necessary. Submission of false or misleading information may result in disqualification from the recruitment process or termination of employment if discovered at a later date. Your personal data will be handled in accordance with applicable data protection laws and used solely for recruitment purposes. Applying for a position does not guarantee employment or interview.
              </div>
          </div>
           <p className={style.terms}><b>Note:</b> Please login to job portal as <b> Job Seeker</b> before applying for any job and an <b>Employer </b>can not apply to the jobs. </p>
         
          
           { showApplyForm && <div className={style.apply_job_form}>
                    <form className={style.form_container} onSubmit={applyJob} >
                        <input required value={expectedSalary} onChange={(e)=>setExpectedSalary(e.target.value)} pattern="^[0-9]{1,2}$" title="Enter expected salary in lakhs between 0 and 99" type='text' name='yearsWorked' id='yearsWorked' placeholder='Enter your expected salary in lakhs'   ></input>
                        <input required value={comment} onChange={(e)=>setComment(e.target.value)} pattern="^.{10,300}$"  title="Comment should be between 10 and 300 characters" type='text' name='comment' id='comment' placeholder='Type more about your work'  ></input>
                     <button className={style.apply} type='submit'  >Apply</button>
                    </form>
            </div>}

            {!showApplyForm && user?.role==="JOB_SEEKER" &&
            <p className={style.applied}>You already applied for this job</p>}

             {user?.role==="EMPLOYER" && user?.id==job.appUserID &&
       
          <button className={style.delete_job} onClick={deleteThisJob}>Remove This Job</button>
       }
        </div>

        {user?.role==="EMPLOYER" && user?.id==job.appUserID &&
        <div className={style.job_applies}>
          <Applies jobID={job.id}/>
        </div>}
         
        </>}
    </div>
  )
}

export default Job