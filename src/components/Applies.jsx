import React, { useEffect, useState } from 'react'
import style from '../css/applies.module.css'
import AddExperience from './AddExperience'
import { CgDetailsMore } from 'react-icons/cg'
import { getAppliesByJob, getAppliesByUser } from '../api/applies'
import { VscGitStashApply } from 'react-icons/vsc'
import { useNavigate } from 'react-router-dom'
import { BiMessageSquare } from 'react-icons/bi'
import Loading from '../pages/loading'

function Applies({userID, jobID}) {

    const [applies, setApplies] = useState(null);
    const navigate = useNavigate()

    useEffect(()=>{
        loadApplies()
    },[])

    const loadApplies = async() => {
        let list = [];
        if(userID!=null)
            list = await getAppliesByUser(userID)

        if(jobID!=null)
            list = await getAppliesByJob(jobID)
        setApplies(list)
    }


  return (
    <div className={style.applies}>
           <div className={style.heading}>{ userID!=null? "Your job applies":"Applies By Users"}  </div>
                <div className={style.body}>
                  {!applies && <Loading/>}
                  { applies && applies.length==0 && <div className={style.none_applied}> 🐥 None Jobs Applied...</div>}
                  {
                    applies &&  applies.length>0 && applies.map((a,i)=>{

                        return <> <div className={style.exp_card} >
                                        <>
                            
                                                <div className={style.body}>
                                                    { userID && <div className={style.company}> <VscGitStashApply size={18} />  {a.jobPostingDTO.companyName}</div>}
                                                    { jobID && <div className={style.company}>  <VscGitStashApply size={18} /> {a.appUserDTO.name}</div>}

                                                    { userID && <div className={style.role}> {a.jobPostingDTO.designation}</div>}
                                                    { jobID && <div className={style.role}> {a.appUserDTO.email}</div>}

                                                    
                                                    <div className={style.comment}> {`Expected salary is ${a.expectedSalary}L, said that, ${a.comment}` } </div>
                                                </div>  
                                                { userID && <div className={style.details} onClick={()=>navigate(`/jobs/${a.jobPostingDTO.id }`)}  > <CgDetailsMore size={20} />  Details  </div>}
                                                { jobID && <div className={style.details} onClick={()=>navigate(`/profile/${a.appUserDTO.id}`)}  > <CgDetailsMore size={20} />  See Profile  </div>}
                                        </>

                                        </div> { (i+1) !==applies.length && <div className={style.divider}/>} 
                          </>
                        }) 

                    } 
                </div>
    </div>
  )
}

export default Applies