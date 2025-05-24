import React from 'react';
import style from '../css/loading.module.css';

function Loading() {
    const dummyList = ["1","2","3","4","5"]
  return (
    <div className={style.loading}>
        <nav className={style.navbar}>
            <span className={style.logo_container}>
                <span className={style.logo}>
                    Job Portal   
                </span>
            </span>
            <span className={style.links_container}>
                <span className={`${style.shimmer} ${style.in_active}`} > </span>
                <span className={`${style.shimmer} ${style.in_active}`} > </span>
            </span>

        </nav>

           <div className={style.jobs_list_container}>
                    <div className={style.job_list}>
                      {dummyList.map((i)=>{
                        return <div className={ `${style.shimmer} ${style.job_card}`} key={i}>
                            <div className={ `${style.shimmer} ${style.designation}`}/>
                            <div className={ `${style.shimmer} ${style.company_name}`} /> 
                            <div className={ `${style.shimmer} ${style.comment}`} />
                            <div className={ `${style.shimmer} ${style.comment}`} />
                            <div className={ `${style.shimmer} ${style.posted_by}`}/>
                            <div className={ `${style.shimmer} ${style.see_details}`} />
                        </div>
                      })}
                    </div>
            </div>

    </div>
  )
}

export default Loading