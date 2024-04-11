import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserCard = ({user,isFriends}) => {
  const navigate = useNavigate()
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("TOKEN")}`;

  const toFriends = ()=>{
    axios.patch('http://localhost:4040/user/addFollows/'+localStorage.getItem('userId'), {
      newFollow:user._id
    }).then(response=>{
      navigate(0)
    }).catch(error=>{
      console.log(error)
    })
  }
  const removeFriends = ()=>{
    axios.patch('http://localhost:4040/user/removeFollows/'+localStorage.getItem('userId'), {
      newFollow:user._id
    }).then(response=>{
      navigate(0)
    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <li className='flex items-center justify-between py-2 my-2 border-2 border-sky-500 rounded-md w-[500px] px-4'>
        <div className='flex items-center'>
            <div className='mr-4'><FaRegUser /></div>
            <p>{user.name}</p>
            
        </div>
        <div className='flex'>
          <Link className='mr-[3px]' to={`/wishes/${user._id}`}>Wishes</Link>
          {}
          {localStorage.getItem('TOKEN') && isFriends==false &&(<button className='w-[6rem]'  onClick={toFriends}>To friends</button>)}
          {localStorage.getItem('TOKEN') && isFriends==true &&(<button className='w-[6rem]' onClick={removeFriends}>Remove</button>)}
          
        </div>
        
    </li>
  )
}

export default UserCard