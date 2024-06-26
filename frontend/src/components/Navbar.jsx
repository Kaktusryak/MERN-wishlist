import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoGift } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";
import Switch from "react-switch";
import { ThemeContext } from '../constext/ThemeContext';




const Navbar = () => {
  const nav=useNavigate()
  nav(0)
  const [token,setToken]=useState(localStorage.getItem('TOKEN'))
  
  const {toggleDark,darkTheme,isDark} = useContext(ThemeContext)
  
  
  
  
  
  

  return (
    <div key={token} className='flex items-center justify-between w-[100%] py-1 h-[8vh] border-b-2 border-slate-400 pt-[1vh]'>
      
      <Switch onChange={toggleDark} checked={isDark} offColor='#212a31' onColor='#d3d9d4' uncheckedIcon={''} checkedIcon={''}/>
      <div className='flex'>
        <Link to='/' className='mx-2'>Home</Link>
        <Link to='/findUser' className='mx-2'>Find friends</Link>
        
        {token && <Link to='/friends' className='mx-2'>Friends</Link>}
      </div>
      <div >
        {token ? (<Link className='w-[70px] bg-inherit' to='/myPage'><div className='flex flex-col justify-center items-center'><FaRegUser className='text-green-600 	' /><p className='text-xs'>Profile</p></div></Link>):(<Link className='w-[70px] ' to='/login'><div className='flex flex-col justify-center items-center'><FaRegUser className='text-sky-600 	' /><p className='text-xs'>Log-In</p></div></Link>)}
        
      </div>
      
    </div>
  )
}

export default Navbar