import React from 'react'
import { useState } from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const UserWish = ({wish}) => {
    const [isMore,setMore] = useState(false)
    

 

    

  return (
    <li className='flex flex-col justify-between py-2 my-2 border-2 border-sky-500 rounded-md w-[500px] px-4'>
        
        <div className='flex justify-between items-center'>
            <p>{wish.title}</p>
            <div>
                
                
                <button onClick={()=>{setMore(!isMore)}} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>{isMore ? 'Less':'More'}</button> 
            </div>
            
            
        </div>
          {isMore && <div>
              <p>Description: {wish.description}</p>
              <p>Link: {wish.link}</p>
          </div>}
        
        
    </li>
  )
}

export default UserWish