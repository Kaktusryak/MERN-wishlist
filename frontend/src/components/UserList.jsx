import React from 'react'
import UserCard from './UserCard'

const UserList = ({ users, friends }) => {
  console.log(users)
  console.log( friends)
  return (
    <ul className='divide-y divide-slate-400'>
      {users.map((item) => {
        let isFriends = false
        
        if (friends.includes(item._id)) {
          
          isFriends = true
          console.log(isFriends)
        }
        
        return <UserCard isFriends={isFriends} key={item._id} user={item} />
      })}
    </ul>
  )
}

export default UserList