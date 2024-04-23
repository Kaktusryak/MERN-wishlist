import React from 'react'
import { Link } from 'react-router-dom'
//page that present site
const MainPage = () => {
  return (
    <div className='flex flex-col justify-between w-[600px] p-2  rounded-md	my-2'>
      <h1 className='text-5xl text-sky-500'>This is my small and stupid project</h1>
      <p className='text-lg text-sky-500 my-2'>Here you can observe your friends wishes and do something with this</p>
      <i className='my-2' >{'('}Should change this text later{')'}</i>
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
          <Link className='my-4 h-[3rem] w-[7rem] text-lg px-2' to='/login'>Log-in</Link>
        </div> }
        
        
        
      </div>
    </div>
  )
}

export default MainPage