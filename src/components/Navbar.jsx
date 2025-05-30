import React, { useEffect, useState } from 'react'
import style from '../css/navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { getItem } from '../utils/storage';
import logo from "../assets/job.png"
import { PiBagLight, PiBookLight } from 'react-icons/pi';
import { RxPerson } from 'react-icons/rx';
import { AiOutlineLogin } from 'react-icons/ai';
function Navbar() {

    const [user, setUser] = useState(null);
    const navigate = useNavigate()
    
    useEffect(()=>{
        const u = getItem("user")
        u == null? setUser(null) : setUser(u);
    },[])

    const navClass = ({isActive}) => {
        if(isActive) return style.active;
        else return style.in_active;
    }

  return (
    <nav className={style.navbar}>
        <span className={style.logo_container}>
            <span className={style.logo} onClick={()=>navigate("jobs")}>
                <img src={logo} alt='Job Portal'></img>
            </span>
        </span>
        <span className={style.links_container}>
            <NavLink to="/jobs" className={navClass} > <PiBagLight size={18} /> Jobs Alerts</NavLink>
            
            {/* <NavLink to="/jobs" className={navClass} > <PiBookLight size={18}  /> About</NavLink> */}
            { user == null && 
            <NavLink to="/auth" className={navClass} > <AiOutlineLogin size={18} />Sign In</NavLink>}

            { user !== null && 
            <NavLink to={`/profile/${user.id}`} className={navClass}> <RxPerson size={17} />Profile</NavLink> }

        </span>
    </nav>
  )
}

export default Navbar