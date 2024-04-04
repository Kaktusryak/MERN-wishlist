import React from 'react'
import { Link } from 'react-router-dom'
//page that present site
const MainPage = () => {
  return (
    <div className='flex flex-col justify-between w-[600px] p-2  rounded-md	my-2'>
      <h1 className='text-5xl text-sky-500'>This is my small and stupid project</h1>
      <p className='text-lg text-sky-500 my-2'>Here you can observe your friends wishes and do something with this</p>
      <i className='my-2' >{'('}Should change this text later{')'}</i>
      <div className='flex flex-col items-center '>
        {localStorage.getItem('userId') && <Link className='my-4 w-fit h-[3rem] text-lg px-2' to='/myPage'>Here you can go to your profile</Link>}
        {localStorage.getItem('userId') &&<Link className='my-4 w-fit h-[3rem] text-lg px-2' to='/friends'>Here you can watch your friends wishes</Link>}
        {localStorage.getItem('userId') &&<Link className='my-4 w-fit h-[6rem] text-lg px-2' to='/findUser'>Here you can find new friends to check their wishes so you can present it them so they are happy</Link>}
        {!localStorage.getItem('userId') && <Link className='my-4 w-fit h-[3rem] text-lg px-2' to='/login'>Here you can Log-In</Link>}
        
        
        
      </div>
    </div>
  )
}

export default MainPage