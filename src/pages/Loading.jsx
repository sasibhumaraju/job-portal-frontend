import React from 'react';
import style from '../css/loading.module.css';

function Loading() {
    const dummyList = ["1","2","3","4","5"]
  return (
    <div className={style.loading}>
       <div className={style.spinner}></div>
    </div>
  )
}

export default Loading