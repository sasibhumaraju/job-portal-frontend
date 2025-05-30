import React, { useState } from 'react'
import style from '../css/auth.module.css';
import { getUserByEmail, postUser } from '../api/users';
import toast from 'react-hot-toast';
import { setItem } from '../utils/storage';
import { FaArrowRight } from 'react-icons/fa6';

function Signup({toggleAuth}) {

  const [user, setUser] = useState({"name":"", "email":"","password":"","phone":"","role":"JOB_SEEKER"});

  const submitUser = async (e) => {
     e.preventDefault();

      const u = await getUserByEmail(user.email)
      if( u !== "" ) {

        toast(`${user.email} is already having account`, { icon: '🤨',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
      
      } else {

          const u = await postUser(user);
           if( u !== "" ) {
              toast(`${user.email} account created`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
              setItem("user",u);
              const timeOut = setTimeout(()=>{window.location.reload(); clearTimeout(timeOut)},1500)
           }
      }
  }



  return (
    <div className={style.auth_container}>
   
         <div className={style.header_container}>
                <div className={style.header_text}>
                  CREATE ACCOUNT
                </div>
                <div className={style.tail_text}>
                  <b onClick={toggleAuth}>  Sign In</b>
                </div>
              </div>
        
              <div className={style.divider}/>

              <form className={style.form_container} onSubmit={submitUser}>
                    <label for='email'>Email Address</label>
                    <input id='email' title='Enter a valid email address (e.g., user@example.com)' type='email' required placeholder='Email'  name='email' pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={user.email} onChange={(e)=>{ const u = {...user, email:e.target.value} ; setUser(u)}}></input>
                    <label for='pass'>Password</label>
                    <input id='pass' title="Password must be at least 8 characters, and include uppercase, lowercase, a number, and a special character" type='text' required placeholder='Password'  name='password' pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$" value={user.password} onChange={(e)=>{ const u = {...user, password:e.target.value} ; setUser(u)}}></input>
                    <label for='name'>Name</label>
                    <input id='name' title="Name can only contain letters, spaces, hyphens, or apostrophes (e.g., John O'Connor)" type='text' required placeholder='Name'  name='name' pattern="^[A-Za-z\s'-]+$" value={user.name} onChange={(e)=>{ const u = {...user, name:e.target.value} ; setUser(u)}}></input>
                    <label for='phone'>Mobile Number</label>
                    <input title='Enter a 10-digit phone number without spaces or symbols (e.g., 9876543210)' type='tel' required pattern="^\d{10}$" placeholder='Phone Number'  name='phone' value={user.phone} onChange={(e)=>{ const u = {...user, phone:e.target.value} ; setUser(u)}}></input>
                    <label for='role'>Persona</label>
                    <select name="role" id="role" required value={user.role} onChange={(e) => { setUser({ ...user, role: e.target.value });} }>
                      <option value="JOB_SEEKER" selected>Job Seeker</option>
                      <option value="EMPLOYER">Employer</option>
                    </select>
                    
                  <button type='submit' >Signup  &nbsp; <FaArrowRight /></button>
              </form>
               <div className={style.divider}/>
   
         <div className={style.switch_auth}>
           Have an account? <b onClick={toggleAuth}>  Login Now </b>
         </div>
       </div>
  )
}

export default Signup