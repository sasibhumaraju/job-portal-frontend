import React, { useEffect, useState } from 'react'
import style from '../css/profile.module.css'
import { getItem, setItem } from '../utils/storage'
import { useNavigate, useParams } from 'react-router-dom';
import Loading from './loading';
import { IoArrowBack, IoPersonCircle } from "react-icons/io5"
import { ImMail4 } from "react-icons/im";
import { SiTelegram } from "react-icons/si";
import { TbCircleLetterRFilled } from "react-icons/tb";
import toast from 'react-hot-toast';
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import AddExperience from '../components/AddExperience';
import { getExperience, getExperienceByUser } from '../api/Experiences';
import Applies from '../components/Applies';
import JobPosting from '../components/JobPosting';
import { getUserByID } from '../api/users';
import { RxPerson } from 'react-icons/rx';
import { HiOutlineMail } from 'react-icons/hi';
import { CiMail } from 'react-icons/ci';
import { GoMail } from 'react-icons/go';
import { BsPhone } from 'react-icons/bs';
import { PiBagLight, PiCoffeeLight, PiCoffeeThin } from 'react-icons/pi';

function Profile() {

   const {userID} = useParams()
   const [user, setUser] = useState(null);
   const [currentUser, setCurrentUser] = useState(null);
   const [exps,setExps] = useState(null);
   const [showExpForm, toggleExpForm] = useState(false);
   const [showExpEditForm, toggleExpEditForm] = useState([]);
   const navigate = useNavigate();

   useEffect(()=>{
          console.log(userID)
          loadUser();
      },[showExpForm,userID])

  const loadUser = async() => {
    const u = await getItem("user")
    setCurrentUser(u);


    if(u != null && u.id == userID) {
      setUser(u);
      loadExp(u.id)
      console.log("local ->> ", u)
    } else {
      const u1 = await getUserByID(userID);
       console.log("remote ->> ", u1)
      setUser(u1);
      loadExp(u1.id);
    }
  }

  const loadExp = async(userID) => {
    const expList = await getExperienceByUser(userID);
    let toggleExpEditFormList = []
    for(let i=0; i<expList.length; i++) {
      toggleExpEditFormList.push({i:false})
    }
    toggleExpEditForm(toggleExpEditFormList);
    setExps(expList);
  }

  const toggleEditForm = (i) => {
    showExpEditForm[i].i = !(showExpEditForm[i].i)
    toggleExpEditForm({...showExpEditForm});
  }

  const logout = () => {
    setItem("user",null);
    toast(`${user.email} logged out!`, {  icon: "🫣",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
    const timeOut = setTimeout(()=>{navigate("/auth"); window.location.reload();   clearTimeout(timeOut)},1500)
  }

  return (
    <>
     {user == undefined? 
        <Loading/> :
        <div className={style.profile}>
          { userID != currentUser?.id &&  <div className={style.back} onClick={()=>navigate(-1)}> <IoArrowBack size={25} /> Go back  </div>}
            <div className={style.profile_container}>

              <div className={style.profile_card}>
                <div className={style.name}>{user.name}</div>
                <div className={style.email}>{user.email}</div>
               { currentUser && currentUser.id == userID && <button onClick={logout}> Logout </button>}
              </div>

              <div className={style.data_card}>
                <div className={style.heading}>Bio data</div>
                <div className={style.body}>
                  <div className={style.snip}> <RxPerson size={17} />  {user.name}</div>
                  <div className={style.snip}>  <GoMail  size={16} />  {user.email}</div>
                  <div className={style.snip}>  <BsPhone size={16} />  {user.phone}</div>
                  <div className={style.snip}>  <PiCoffeeLight size={17}  />  {user.role==="EMPLOYER"? "Employer":"Job seeker"}</div>
                </div>
              </div>


{/* ---------------           Experience section -----------------            */}
              <div className={style.data_card}>
                
                <div className={style.heading}>Most recent experience { currentUser && currentUser.id == userID && !showExpForm && <div  className={style.add} onClick={()=>toggleExpForm(!showExpForm)}><IoMdAdd size={23} /> Add</div>} </div>
                { currentUser && currentUser.id == userID && showExpForm &&
                  <AddExperience toggleExpForm={toggleExpForm} mode={"add"}/>
                }
                <div className={style.body}>
                  {!exps && <Loading/> }

                  {exps && exps.length==0 && <div className={style.comment}> 🥦 No Experience Added!</div> }
                  {
                   exps && exps.length>0 && exps.map((e,i)=>{

                          return <> <div className={style.exp_card} key={e.id}>

                            {currentUser && currentUser.id == userID && showExpEditForm[i].i && <AddExperience loadUser={loadUser} expObject={e} toggleExpEditForm={()=>toggleEditForm(i)} mode={"edit"}/>}

                            {!showExpEditForm[i].i && 
                              <>
                              {/* <div className={style.icon}> <MdOutlineLocalPostOffice size={23}/> </div> */}
                              <div className={style.body}>
                                  <div className={style.company}> <PiBagLight size={18} /> {e.companyName}</div>
                                  <div className={style.role}> {e.designation}</div>
                                  <div className={style.comment}> { e.yearsWorked + " years experienced, " + e.comment} </div>
                              </div>   

                             { currentUser && currentUser.id == userID && <div className={style.edit} onClick={()=>toggleEditForm(i)} > <MdOutlineEdit size={20} /> Edit  </div> }
                              </>
                            }
                          </div> { (i+1)!=exps.length && <div className={style.divider}/>} </>})

                      }
                </div>
              </div>
{/* ---------------------------------------------------------- */}

              {
                currentUser && currentUser.id == userID && user.role === "JOB_SEEKER" && <Applies userID={user.id}/>
              }

              {
                currentUser && currentUser.id == userID &&  user.role === "EMPLOYER" && <JobPosting userID={user.id}/>
              }

            </div>
        </div>
    }
    </>
    
  )
}

export default Profile