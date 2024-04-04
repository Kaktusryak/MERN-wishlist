import React from 'react'
import MyWish from './MyWish'

const MyWishList = ({wishes}) => {
  return (
    <ul>
        {wishes.map((item)=>(
            <MyWish key={item._id} wish={item}/>
        ))}
    </ul>
  )
}

export default MyWishList