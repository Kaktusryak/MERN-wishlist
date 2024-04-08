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
    <li className='flex flex-col justify-between py-2 my-2 border-2 border-sky-500 rounded-md w-[500px] px-4'>
        {isEdit && <EditWish title={wish.title} description={wish.description} link={wish.link} _id={wish._id}/>}
        <div className='flex justify-between items-center'>
            <p>{wish.title}</p>
            <div>
              
                <button onClick={handleDelete} className='h-[2rem] w-[6rem] justify-center flex items-center text-center bg-sky-500 border-2 border-white rounded-md text-white p-[5px]  hover:border-sky-500 hover:bg-white hover:text-sky-500'><FaTrash /></button>
                <button onClick={()=>{setEdit(!isEdit)}} className='h-[2rem] w-[6rem] justify-center flex items-center text-center bg-sky-500 border-2 border-white rounded-md text-white p-[5px]  hover:border-sky-500 hover:bg-white hover:text-sky-500'>{isEdit ? <BsGear />:<BsGearFill />}</button>
                <button onClick={()=>{setMore(!isMore)}} className='h-[2rem] w-[6rem] justify-center flex items-center text-center bg-sky-500 border-2 border-white rounded-md text-white p-[5px]  hover:border-sky-500 hover:bg-white hover:text-sky-500'>{isMore ? <FaChevronUp/>:<FaChevronDown/>}</button> 
            </div>
            
            
        </div>
          {isMore && <div>
              <p>Description: {wish.description}</p>
              <p>Link: {wish.link}</p>
              
              {wish.link &&<a onClick={(e) => { e.preventDefault(); window.open(wish.link, '_blank'); }}><RiExternalLinkFill /></a>}
          


          </div>}
        
        
    </li>
  )
}

export default MyWish