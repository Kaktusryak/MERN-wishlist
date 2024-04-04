import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";

const UserCard = ({user}) => {
  return (
    <li className='flex justify-between py-2 my-2 border-2 border-sky-500 rounded-md w-[500px] px-4'>
        <div className='flex items-center'>
            <div className='mr-4'><FaRegUser /></div>
            <p>{user.name}</p>
            
        </div>
        <Link to={`/wishes/${user._id}`}>Wishes</Link>
    </li>
  )
}

export default UserCard