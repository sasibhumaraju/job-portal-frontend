import React, { useEffect, useState } from 'react'
import style from '../css/navbar.module.css'
import { Link, NavLink } from 'react-router-dom'
import { getItem } from '../utils/storage';
function Navbar() {

    const [user, setUser] = useState(null);
    
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
            <span className={style.logo}>
                Job Portal   
            </span>
        </span>
        <span className={style.links_container}>
            <NavLink to="/jobs" className={navClass} >Jobs</NavLink>
            
            { user == null && 
            <NavLink to="/auth" className={navClass} >Signin</NavLink>}

            { user !== null && 
            <NavLink to={`/profile/${user.id}`} className={navClass}>Profile</NavLink> }
        </span>
    </nav>
  )
}

export default Navbar