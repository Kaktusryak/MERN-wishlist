import React from 'react'
import { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { RiExternalLinkFill } from "react-icons/ri";

import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserWish = ({wish}) => {
    const [isMore,setMore] = useState(false)
    

 

    

  return (
    <li className='flex flex-col justify-between py-2 my-2 border-2 border-sky-500 rounded-md w-[500px] px-4'>
        
        <div className='flex justify-between items-center'>
            <p>{wish.title}</p>
            <div>
                
                
                <button onClick={()=>{setMore(!isMore)}} >{isMore ? <FaChevronUp/>:<FaChevronDown/>}</button> 
            </div>
            
            
        </div>
          {isMore && <div>
              <p>Description: {wish.description}</p>
              {wish.link && <p>Link: {wish.link}</p>}
              {wish.link &&<a onClick={(e) => { e.preventDefault(); window.open(wish.link, '_blank'); }}><RiExternalLinkFill /></a>}
          </div>}
        
        
    </li>
  )
}

export default UserWish