import React from 'react'
import { useState } from 'react'
import EditWish from '../components/EditWish'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const MyWish = ({wish}) => {
    const [isMore,setMore] = useState(false)
    const [isEdit,setEdit] = useState(false)

  const navigate = useNavigate()

    const handleDelete = (e)=>{
      e.preventDefault()
      if(confirm('Are you sure?')){
        axios.delete('http://localhost:4040/wishes/'+wish._id).then(response=>{
          navigate(0)
        }).catch(error=>{
          console.log(error)
        })
      }
    }

  return (
    <li className='flex flex-col justify-between py-2 my-2 border-2 border-sky-500 rounded-md w-[500px] px-4'>
        {isEdit && <EditWish title={wish.title} description={wish.description} link={wish.link} _id={wish._id}/>}
        <div className='flex justify-between items-center'>
            <p>{wish.title}</p>
            <div>
                <button onClick={handleDelete} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Delete</button>
                <button onClick={()=>{setEdit(!isEdit)}} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>{isEdit ? 'Hide':'Edit'}</button>
                <button onClick={()=>{setMore(!isMore)}} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>{isMore ? 'Less':'More'}</button> 
            </div>
            
            
        </div>
          {isMore && <div>
              <p>Description: {wish.description}</p>
              <p>Link: {wish.link}</p>
          </div>}
        
        
    </li>
  )
}

export default MyWish