import React from 'react'
import UserWish from './UserWish'

const UserWishList = ({wishes}) => {
  return (
    <ul className='divide-y divide-slate-400'>
        {wishes.map((item)=>(
            <UserWish key={item._id} wish={item}/>
        ))}
    </ul>
  )
}

export default UserWishList