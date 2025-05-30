import React from 'react'
import style from '../css/about.module.css'

function About() {
    const goToInstagram = () => {
        window.open('http://instagram.com/sasibhumaraju', '_blank');
    }
  return (
    <div className={style.about}>
        <div className={style.about_container}>
            <div  className={style.heading}>🌳 &nbsp;About Us</div>
            <div className={style.comment}> Welcome to Job Portal, a job portal built with purpose: to connect great talent with the right opportunities, faster and smarter. </div>



            <div className={style.divider} /> 
            <div  className={style.heading}>🚜 &nbsp;Our Mission</div>
            <div className={style.comment}> At Job Portal, the goal is simple— to streamline the job search and hiring process for individuals and companies alike. Whether you're a job seeker looking to start or grow your career, or an employer in search of qualified professionals, this platform is designed to serve your needs with clarity, speed, and efficiency.</div>

            
            <div className={style.divider} /> 
            <div  className={style.heading}> 😎 &nbsp;Who Built This</div>
            <div className={style.comment}>  This platform was developed by <b onClick={goToInstagram}>@sasibhumaraju</b>, a passionate software engineer and problem-solver. With a strong background in full-stack development and backend engineering, Driven by user-first thinking and modern development practices.</div>

           
            {/* <div className={style.divider} /> 
            <div  className={style.heading}>Technology Behind the Platform</div>
            <div className={style.comment}>  * **Frontend**: \[e.g., React.js, Next.js, or Vue.js]
            * **Backend**: \[e.g., Node.js, Express, Django, etc.]
            * **Database**: \[e.g., PostgreSQL, MongoDB, etc.]
            * **Hosting & Deployment**: \[e.g., AWS, Vercel, Netlify] Every part of the platform is optimized for usability, scalability, and security.</div> */}


           

            

            <div className={style.divider} /> 
            <div  className={style.heading}>🎯 &nbsp;Our Vision</div>
            <div className={style.comment}> To empower job seekers and recruiters with tools that make hiring and career growth a seamless experience.</div>

           
     </div>
    </div>
  )
}

export default About