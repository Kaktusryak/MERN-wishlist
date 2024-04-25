import React, { useContext } from 'react'
import { useState } from 'react'
import EditWish from '../components/EditWish'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { RiExternalLinkFill } from "react-icons/ri";
import { ThemeContext } from '../constext/ThemeContext'


const MyWish = ({wish}) => {
    const [isMore,setMore] = useState(false)
    const [isEdit,setEdit] = useState(false)
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("TOKEN")}`;
    const {darkTheme} = useContext(ThemeContext)
  const navigate = useNavigate()

    const handleDelete = (e)=>{
      e.preventDefault()
      if(confirm('Are you sure?')){
        axios.delete('http://localhost:4040/wishes/'+wish._id).then(response=>{
          navigate(0)
        }).catch(error=>{
          console.log(error)
        })
      }
    }

  return (
    <li className={`flex flex-col justify-between py-2 my-2  w-[500px] px-4 overflow-hidden ${darkTheme}`} >
        {isEdit && <EditWish title={wish.title} description={wish.description} link={wish.link} _id={wish._id}/>}
        <div className={`flex justify-between items-center z-10 bg-white ${darkTheme}`}>
            <p className='truncate w-[50%]'>{wish.title}</p>
            <div className='flex flex-col divide-y'>
                <button className='w-[3rem] bg-inherit text-amber-500' onClick={()=>{setEdit(!isEdit)}} >{isEdit ? <BsGear />:<BsGearFill />}</button>
                <button className='w-[3rem] bg-inherit text-red-400' onClick={handleDelete} ><FaTrash /></button>
                
                <button className='w-[3rem] bg-inherit' onClick={()=>{setMore(!isMore)}} >{isMore ? <FaChevronUp/>:<FaChevronDown/>}</button> 
            </div>
            
            
        </div>
          {isMore && <div className='in-down z-0'>
              <p className='text-wrap'>Title: {wish.title}</p>
              <p className='text-wrap'>Description: {wish.description}</p>
              <p className='text-wrap'>Link: {wish.link}</p>
              
              {wish.link &&<a className='w-[100%] h-[2rem]' onClick={(e) => { e.preventDefault(); window.open(wish.link, '_blank'); }}><RiExternalLinkFill /></a>}
          


          </div>}
        
        
    </li>
  )
}

export default MyWish