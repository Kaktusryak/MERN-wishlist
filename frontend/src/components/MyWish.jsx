import React from 'react'
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


const MyWish = ({wish}) => {
    const [isMore,setMore] = useState(false)
    const [isEdit,setEdit] = useState(false)
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("TOKEN")}`;

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
    <li className='flex flex-col justify-between py-2 my-2  w-[500px] px-4'>
        {isEdit && <EditWish title={wish.title} description={wish.description} link={wish.link} _id={wish._id}/>}
        <div className='flex justify-between items-center'>
            <p className='truncate w-[50%]'>{wish.title}</p>
            <div className='flex flex-col'>
              <button className='w-[3rem]' onClick={()=>{setEdit(!isEdit)}} >{isEdit ? <BsGear />:<BsGearFill />}</button>
                <button className='w-[3rem]' onClick={handleDelete} ><FaTrash /></button>
                
                <button className='w-[3rem]' onClick={()=>{setMore(!isMore)}} >{isMore ? <FaChevronUp/>:<FaChevronDown/>}</button> 
            </div>
            
            
        </div>
          {isMore && <div>
              <p className='text-wrap'>Title: {wish.title}</p>
              <p className='text-wrap'>Description: {wish.description}</p>
              <p className='text-wrap'>Link: {wish.link}</p>
              
              {wish.link &&<a className='w-[100%] h-[2rem]' onClick={(e) => { e.preventDefault(); window.open(wish.link, '_blank'); }}><RiExternalLinkFill /></a>}
          


          </div>}
        
        
    </li>
  )
}

export default MyWish