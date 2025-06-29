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
    const [isTooSmall, setIsTooSmall] = useState(window.innerWidth < 750);
    const navigate = useNavigate()
    
    useEffect(()=>{
        load()
        const handleResize = () => {
        setIsTooSmall(window.innerWidth < 750);
        };
    window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
    },[])

    const load = async () => {
        const u = await getItem("user")
        u == null? setUser(null) : setUser(u);
        // console.log(u)
    }

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
            <NavLink to="/jobs" className={navClass} > <div className={style.icon}><PiBagLight size={ isTooSmall? 20:18} /></div>  <div className={style.text}>{ isTooSmall? "Jobs" : "Jobs Alerts"}</div> </NavLink>
            
            <NavLink to="/about" className={navClass} > <div  className={style.icon}><PiBookLight size={isTooSmall? 20:18}  /></div >  <div className={style.text}>{isTooSmall? "About" : "About Us"}</div></NavLink>
            { user == null && 
            <NavLink to="/auth" className={navClass} > <div className={style.icon}> <AiOutlineLogin size={isTooSmall? 20:18} /></div ><div className={style.text}>Sign In</div></NavLink>}

            { user !== null && 
            <NavLink to={`/profile/${user.id}`} className={navClass}> <div className={style.icon}><RxPerson size={isTooSmall? 19:17} /></div> <div className={style.text}>Profile</div></NavLink> }

        </span>
    </nav>
  )
}

export default Navbar