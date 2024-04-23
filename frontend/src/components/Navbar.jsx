import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoGift } from "react-icons/go";
import { FaRegUser } from "react-icons/fa";



const Navbar = () => {
  const nav=useNavigate()
  nav(0)
  const [token,setToken]=useState(localStorage.getItem('TOKEN'))
  
  
  
  
  
  

  return (
    <div key={token} className='flex items-center justify-between w-[100%] py-1  border-b-2 border-slate-400 	my-2 mb-6'>
      
      <GoGift className=' text-xl w-[50px]' />
      <div className='flex'>
        <Link to='/' className='mx-2'>Home</Link>
        <Link to='/findUser' className='mx-2'>Find friends</Link>
        
        {token && <Link to='/friends' className='mx-2'>Friends</Link>}
      </div>
      <div >
        {token ? (<Link className='w-[50px]' to='/myPage'><FaRegUser /></Link>):(<Link className='w-[50px]' to='/login'><FaRegUser /></Link>)}
        
      </div>
      
    </div>
  )
}

export default Navbar