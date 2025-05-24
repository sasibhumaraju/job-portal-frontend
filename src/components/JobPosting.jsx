import React, { useEffect, useState } from 'react'

import AddExperience from './AddExperience'
import { CgDetailsMore } from 'react-icons/cg'
import { getAppliesByUser } from '../api/applies'
import { VscGitStashApply } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import style from '../css/job_postings.module.css'
import AddJobPosting from './AddJobPosting'
import { IoMdAdd } from 'react-icons/io'
import { getJobsByEmployerID } from '../api/jobs'
import { MdOutlineLocalPostOffice, MdWorkOutline } from 'react-icons/md'

function JobPosting({userID}) {

    const [jobPostings, setJobPostings] = useState([]);
    const [showAddJobPostingForm, toggleAddJobPostingForm] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
        loadJobPostings()
    },[])

    const loadJobPostings = async () => {
        const jobPostingList = await getJobsByEmployerID(userID);
        setJobPostings(jobPostingList);
    }



  return (
     <div className={style.data_card}>
                <div className={style.heading}>Your job postings {!showAddJobPostingForm && <div  className={style.add} onClick={()=>toggleAddJobPostingForm(!showAddJobPostingForm)}><IoMdAdd size={23} /> Add</div>} </div>
                { showAddJobPostingForm &&
                  <AddJobPosting toggleAddJobPosting={toggleAddJobPostingForm} mode={"add"} loadJobPostings={loadJobPostings}/>
                }
                <div className={style.body}>
                    {
                        jobPostings.length>0 && jobPostings.map((e,i)=>{
                            return <> <div className={style.exp_card} key={e.id}>
                                    <>
                                        <div className={style.icon}> <MdWorkOutline size={23} />  </div>
                                        <div className={style.body}>
                                            <div className={style.company}> {e.companyName}</div>
                                            <div className={style.role}> {e.designation}</div>
                                            <div className={style.comment}> { e.comment} </div>
                                        </div>   
                                        <div className={style.details} onClick={()=>navigate(`/jobs/${e.id }`)}  > <CgDetailsMore size={20} />  Details  </div>
                                    </>
                                    </div> { (i+1)!=jobPostings.length && <div className={style.divider}/>} </>})

                    }
                </div>
              </div>
  )
}

export default JobPosting