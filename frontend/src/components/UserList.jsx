import React from 'react'
import UserCard from './UserCard'

const UserList = ({users}) => {
  return (
    <ul>
        {users.map((item)=>(
            <UserCard key={item._id} user={item}/>
        ))}
    </ul>
  )
}

export default UserList