import React, { useState } from 'react'
import style from '../css/auth.module.css';
import { getUserByEmail } from '../api/users';
import toast from 'react-hot-toast';
import { setItem } from '../utils/storage';

function Login({toggleAuth}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async (e) => {
      e.preventDefault();
      const u = await getUserByEmail(email)
      if( u=="") toast(`${email} user doesn't exists!`, { icon: '🤨',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
      else {
        if(u.password == password.trim()) {
          setItem("user",u);
          toast(`${email} logged in!`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
          const timeOut = setTimeout(()=>{window.location.reload(); clearTimeout(timeOut)},1500)
        } else {
           toast(`incorrect password`, { icon: '😑',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        }
      }
  }

  return (
    <div className={style.auth_container}>

      <div className={style.logo}>
          Job Portal   
      </div>

      <div className={style.header_container}>
        <div className={style.header_text}>
          Login
        </div>
        <div className={style.tail_text}>
          Use your job portal account
        </div>
      </div>

      <form className={style.form_container} onSubmit={logInUser}>
          <input value={email} onChange={(e)=> setEmail(e.target.value)} title='Enter a valid email address (e.g., user@example.com)' pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" type='email' required placeholder='Email'  name='email'></input>
          <input value={password} onChange={(e)=> setPassword(e.target.value)} type='password' required placeholder='Password'  name='password'></input>
          <button type='submit' >Login</button>
      </form>

      <div className={style.switch_auth}>
        New to Job Portal? <b onClick={toggleAuth}>  Create an account</b>
      </div>
    </div>
  )
}

export default Login