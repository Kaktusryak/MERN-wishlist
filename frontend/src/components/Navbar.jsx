import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoGift } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";


const Navbar = () => {
  const nav=useNavigate()
  nav(0)
  const [token,setToken]=useState(localStorage.getItem('TOKEN'))
  
  
  
  
  
  

  return (
    <div key={token} className='flex items-center justify-between w-[600px] p-2 border-2 border-sky-500 rounded-md	my-2'>
      
      <GoGift className='text-sky-500 text-xl' />
      <div className='flex'>
        <Link to='/' className='mx-2'>Home</Link>
        <Link to='/findUser' className='mx-2'>Find friends</Link>
        
        {token && <Link to='/friends' className='mx-2'>Friends</Link>}
      </div>
      <div>
        {token ? (<Link to='/myPage'><FaRegUser /></Link>):(<Link to='/login'>Log In</Link>)}
        
      </div>
      
    </div>
  )
}

export default Navbar