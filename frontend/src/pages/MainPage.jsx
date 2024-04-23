import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
//page that present site
const MainPage = () => {
  return (
    <div className='flex flex-col justify-between w-[600px] p-2  rounded-md	my-2'>
      <h1 className='text-5xl text-sky-500'>This is my small project</h1>
      <p className='text-lg text-sky-500 my-2'>Here you can observe your friends wishes and do something with this</p>
      <i className='my-2 mb-10' >I tried very much and again failed to create something good</i>
      <div className='flex flex-col items-center divide-y  '>
        
        
        
        {localStorage.getItem('userId') && <div className='w-full flex justify-between items-center'>
          <p >Go to your profile</p>
          <Link className='my-4  h-[3rem] w-[7rem] text-lg px-2' to='/myPage'>Your profile</Link>
          
        </div>}
        {localStorage.getItem('userId') &&<div className='w-full flex justify-between items-center'>
          <p>Watch your friends wishes</p>
          <Link className='my-4 h-[3rem] w-[7rem] text-lg px-2' to='/friends'>Friends</Link>
        </div>}
        {localStorage.getItem('userId') &&<div className='w-full flex justify-between items-center'>
          <p>Find friends </p>
          <Link className='my-4 h-[3rem] w-[7rem] text-lg px-2' to='/findUser'>Find friends</Link>
        </div>}
        {!localStorage.getItem('userId') &&<div className='w-full flex justify-between items-center'>
          <p>Log-In or Sign-Up</p>
          <Link className='my-4 h-[3rem] w-[7rem] text-lg px-2 text-sky-600' to='/login'>Log-In</Link>
        </div> }
        
        
        
      </div>
      <div className='flex items-center justify-between  mt-6'>
      <div className='flex items-center'>
         <a className='w-fit bg-inherit h-fit p-2' target='_blank' href="https://github.com/Kaktusryak"> My Git:<FaGithub className='ml-[5px]'/></a>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <p>Kaktusryak inc.</p>
        <p>All rights reserved {'(no)'}</p>
        
      </div>
    </div>
    </div>
  )
}

export default MainPage