import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateWish from '../components/CreateWish'
import axios from 'axios'
import MyWishList from '../components/MyWishList'
//page where you can watch your wishes, invoke pop-ups for editing and creating wishes and change your data (currently only nickname)
const MyPage = () => {
  const [isCreate,setCreate] = useState(false)
  const [wishes,setWishes] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4040/wishes/'+localStorage.getItem('userId')).then(response=>{
      console.log(response.data)
      setWishes(response.data)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  const navigate = useNavigate()
  const handleUnlogClick = ()=>{
    localStorage.setItem('TOKEN','')
    localStorage.setItem('email','')
    localStorage.setItem('userId','')
    localStorage.setItem('name','')
    navigate('/')

  }
  const handleAddWish = ()=>{
    setCreate(!isCreate)
  }

  const handleOnCreate = ()=>{
    setCreate(false)
    navigate(0)
  }

  return (
    <div className=' flex flex-col items-center  w-full h-[100vh]'>
      {isCreate && <CreateWish handleOnCreate={handleOnCreate}/> }
      <div className='flex justify-between w-[600px] p-2 border-2 border-sky-500 rounded-md	my-2'>
        {!isCreate && <button onClick={handleAddWish} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Create wish</button>}
        {isCreate && <button onClick={handleAddWish} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Hide form</button>}
        
        <button onClick={handleUnlogClick} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Unlog</button>
      </div>
      <div>
        <MyWishList wishes={wishes} />
      </div>
      
    </div>
  )
}

export default MyPage