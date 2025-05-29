import React, { useEffect, useState } from 'react'
import style from '../css/add_experience.module.css'
import { postApply } from '../api/applies';
import { getItem } from '../utils/storage';
import { deleteExperience, postExperience, putExperience } from '../api/Experiences';
import toast from 'react-hot-toast';
import { MdOutlineDeleteOutline } from "react-icons/md";

function AddExperience({toggleExpForm, toggleExpEditForm, expObject, mode, loadUser}) {

    const [wExp, setWExp] = useState({"id":null,"appUserID":"", "companyName":"", "yearsWorked":"", "designation":"", "comment":""})

    useEffect(()=>{
        if(mode=="edit") setWExp(expObject)
    },[expObject])

    const onSubmit = async (e) => {
        e.preventDefault();

    if( mode=="add"){
        const u = await getItem("user")
        wExp.appUserID = u.id;
        console.log(wExp)
        const u1 = await postExperience(wExp)
        if(u1 !== "") {
            toast(`New experience added succesffully`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        } else {
            toast(`Failed to add new experience`, { icon: '😑',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        }
        toggleExpForm(false)
    } else if(mode=="edit") {
        const u1 = await putExperience(wExp)
         if(u1 !== "") {
            toast(`Updated experience succesffully`, {  icon: "✅",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        } else {
            toast(`Failed to update experience`, { icon: '😑',   style: {  borderRadius: '10px', background: '#333',  color: '#fff', fontSize: 14 }, });
        }
        loadUser();
        toggleExpEditForm();
    }

    }

    const deleteExp = async(ID) => {
        console.log("IDD: >>",ID)
        await deleteExperience(ID)
        toast(`Deleted ${expObject.companyName} experience succesffully`, {  icon: "😭",style: {borderRadius: '10px', background: '#333', color: '#fff',fontSize: 14},});
        loadUser();
        toggleExpEditForm();
    }

  return (
    <div className={style.add_experience}>
        <div className={style.type_heading}> {mode=="edit"? "Edit Experience 👇" : "Add New Experience 👇" }</div>
       { mode=="edit" && <div className={style.delete} onClick={()=>deleteExp(expObject.id)}> <MdOutlineDeleteOutline size={20} /> Delete</div>}
        <form className={style.form_container} onSubmit={onSubmit}>
            <input required pattern="^[a-zA-Z0-9\s.,&'-]{2,50}$"  title="Company name should be 2-50 characters and can include letters, numbers, and symbols like .,&'-" type='text' name='company' id='company' placeholder='Enter company name' value={wExp.companyName} onChange={(e)=>{ setWExp({...wExp, "companyName": e.target.value })}} ></input>
            <input required pattern="^[a-zA-Z\s]{2,50}$" title="Designation should be 2-50 letters only" type='text' name='designation' id='designation' placeholder='Enter designation name' value={wExp.designation} onChange={(e)=>{ setWExp({...wExp, "designation": e.target.value })}} ></input>
            <input required pattern="^[0-9]{1,2}$" title="Enter number of years between 0 and 99" type='text' name='yearsWorked' id='yearsWorked' placeholder='Number of years worked' value={wExp.yearsWorked} onChange={(e)=>{ setWExp({...wExp, "yearsWorked": e.target.value })}} ></input>
            <input required pattern="^.{10,300}$"  title="Comment should be between 10 and 300 characters" type='text' name='comment' id='comment' placeholder='Type your work in the role' value={wExp.comment} onChange={(e)=>{ setWExp({...wExp, "comment": e.target.value })}} ></input>

            <div className={style.buttons}>
                <button className={style.button} type='submit' > { mode=="add"? "Add Experience" : "Update Experience"}</button>
                <button className={style.cancel} type='button' onClick={()=>{ mode=="add"? toggleExpForm(false):toggleExpEditForm()}}> Cancel </button>
            </div>
        
        </form>
    </div>
  )
}

export default AddExperience