import React, { useContext } from 'react'
import { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { RiExternalLinkFill } from "react-icons/ri";

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../constext/ThemeContext';


const UserWish = ({wish}) => {
    const [isMore,setMore] = useState(false)
    const {darkTheme} = useContext(ThemeContext)

 

    

  return (
    <li className='flex flex-col justify-between py-2 my-2  w-[500px] px-4 overflow-hidden'>
        
        <div className={`flex justify-between items-center z-10 bg-white ${darkTheme}`}>
            <p className='truncate w-[50%]'>{wish.title}</p>
            <div>
                
                
                <button onClick={()=>{setMore(!isMore)}} >{isMore ? <FaChevronUp/>:<FaChevronDown/>}</button> 
            </div>
            
            
        </div>
        {isMore && <div className='in-down z-0'>
              <p className='text-wrap'>Title: {wish.title}</p>
              <p className='text-wrap'>Description: {wish.description}</p>
              {wish.link && <p className='text-wrap'>Link: {wish.link}</p>}
              {wish.link &&<a className='w-[100%] h-[2rem]' onClick={(e) => { e.preventDefault(); window.open(wish.link, '_blank'); }}><RiExternalLinkFill /></a>}
        </div>}
        
        
    </li>
  )
}

export default UserWish