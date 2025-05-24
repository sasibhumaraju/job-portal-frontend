import React, { useEffect, useState } from 'react'
import style from '../css/auth.module.css'
import { getItem } from '../utils/storage';
import Login from '../components/Login';
import Signup from '../components/Signup';

function Auth() {

  const [switchAuth, toggleSwitch] = useState(true);

  const toggleAuth = () => {
    toggleSwitch(!switchAuth);
  }

  return (
    <div className={style.auth}>
      { switchAuth ? <Login toggleAuth={toggleAuth}/> : <Signup toggleAuth={toggleAuth}/> }
    </div>
  )
}

export default Auth