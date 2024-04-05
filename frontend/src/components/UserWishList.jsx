import React from 'react'
import UserWish from './UserWish'

const UserWishList = ({wishes}) => {
  return (
    <ul>
        {wishes.map((item)=>(
            <UserWish key={item._id} wish={item}/>
        ))}
    </ul>
  )
}

export default UserWishList