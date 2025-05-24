import { useEffect, useState } from 'react'
import style from '../css/add_job_posting.module.css'
import { getItem } from '../utils/storage';
import toast from 'react-hot-toast';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { deleteJob, postJob, putJob } from '../api/jobs';

function AddJobPosting({toggleAddJobPosting, toggleEditJobPosting, jobPostingObject, mode, loadJobPostings}) {

    const [jobPosting, setJobPosting] = useState({"id":null,"appUserID":"", "appUserEmail":"", "companyName":"", "designation":"", "comment":""})

    useEffect(()=>{
        if(mode=="edit") setJobPosting(jobPostingObject)
    },[jobPostingObject])

    const onSubmit = async (e) => {
        e.preventDefault();

    if( mode=="add"){
        const u = await getItem("user")
        jobPosting.appUserID = u.id;
        console.log(jobPosting)
        const u1 = await postJob(jobPosting)
        if(u1 !== "") {
            toast(`New job posting added succesffully`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        } else {
            toast(`Failed to add new job posting`, { icon: '😑',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        }
        loadJobPostings();
        toggleAddJobPosting(false)
    } else if(mode=="edit") {
        const u1 = await putJob(jobPosting)
         if(u1 !== "") {
            toast(`Updated job posting succesffully`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        } else {
            toast(`Failed to update job posting`, { icon: '😑',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        }
        loadJobPostings();
        toggleEditJobPosting();
    }

    }

    const deleteJobPosting = async(ID) => {
        console.log("IDD: >>",ID)
        await deleteJob(ID)
        toast(`Deleted ${jobPostingObject.designation} job posting in ${jobPostingObject.companyName} succesffully`, {  icon: "😭",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        loadJobPostings();
        toggleEditJobPosting();
    }

  return (
    <div className={style.add_job_posting}>
       { mode=="edit" && <div className={style.delete} onClick={()=>deleteJobPosting(jobPostingObject.id)}> <MdOutlineDeleteOutline size={20} /> Delete</div>}
        <form className={style.form_container} onSubmit={onSubmit}>
            <input required pattern="^[a-zA-Z0-9\s.,&'-]{2,50}$"  title="Company name should be 2-50 characters and can include letters, numbers, and symbols like .,&'-" type='text' name='company' id='company' placeholder='Enter job posting company name' value={jobPosting.companyName} onChange={(e)=>{ setJobPosting({...jobPosting, "companyName": e.target.value })}} ></input>
            <input required pattern="^[a-zA-Z\s]{2,50}$" title="Designation should be 2-50 letters only" type='text' name='designation' id='designation' placeholder='Enter job posting designation name' value={jobPosting.designation} onChange={(e)=>{ setJobPosting({...jobPosting, "designation": e.target.value })}} ></input>
            <input required pattern="^.{10,300}$"  title="Comment should be between 10 and 300 characters" type='text' name='comment' id='comment' placeholder='Type your expectations for the role' value={jobPosting.comment} onChange={(e)=>{ setJobPosting({...jobPosting, "comment": e.target.value })}} ></input>

            <div className={style.buttons}>
                <button className={style.button} type='submit' > { mode=="add"? "Add Job Posting" : "Update Job Posting"}</button>
                <button className={style.cancel} type='button' onClick={()=>{ mode=="add"? toggleAddJobPosting(false):toggleEditJobPosting()}}> Cancel </button>
            </div>
        
        </form>
    </div>
  )
}

export default AddJobPosting