import React from 'react'
import MyWish from './MyWish'

const MyWishList = ({wishes}) => {
  return (
    <ul className='divide-y divide-slate-400'>
        {wishes.map((item)=>(
            <MyWish key={item._id} wish={item}/>
        ))}
    </ul>
  )
}

export default MyWishList