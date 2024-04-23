import React from 'react'
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='flex items-center justify-between w-[100%] py-1 h-[8vh] border-t-2 border-slate-400 bottom-0 my-[1vh] fixed px-6'>
      <div className='flex items-center'>
         <a className='w-fit bg-inherit h-fit p-2' target='_blank' href="https://github.com/Kaktusryak"> My Git:<FaGithub className='ml-[5px]'/></a>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <p>Kaktusryak inc.</p>
        <p>All rights reserved {'(no)'}</p>
        
      </div>
    </div>
  )
}

export default Footer
