import React from 'react'
import style from '../css/footer.module.css'
import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {

    const reDirect = (option) => {
        console.log("links called.")
        switch(option) {
            case 1: window.open('https://www.instagram.com/sasibhumaraju', '_blank'); break;
            case 2: window.open('https://www.linkedin.com/in/sasibhumaraju', '_blank'); break;
            case 3: window.open('https://x.com/sasibhumaraju', '_blank'); break;
        }
    }

  return (
    <div className={style.footer}>
        <div className={style.footer_container}>
            <div className={style.footer_icons} >
                <AiFillInstagram size={25} onClick={()=>reDirect(1)}/>
                <AiFillLinkedin size={25} onClick={()=>reDirect(2)} />
                <FaSquareXTwitter size={25} onClick={()=>reDirect(3)} />
            </div>
            <div className={style.footer_signature}>
                 developed by  &nbsp;&nbsp;♔ sasibhumaraju 
            </div>
        </div>
    </div>
  )
}

export default Footer