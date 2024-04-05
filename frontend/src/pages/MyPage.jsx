import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreateWish from '../components/CreateWish'
import axios from 'axios'
import MyWishList from '../components/MyWishList'
import { FaPlus } from "react-icons/fa";
import '../index.css'
import { GoGift } from "react-icons/go";
import CopyLinkButton from '../components/CopyLinkButton'
import { MdOutlineContentCopy } from "react-icons/md";
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
    <div className=' flex flex-col items-center  w-full h-[100vh] transition-all'>
      <div className='flex items-center justify-between w-[600px] p-2 border-2 border-sky-500 rounded-md	my-2'>
        <div className='flex'>
          <div>
            <p>Your wishes link: http://localhost:5173/wishes/{localStorage.getItem('userId')}</p>
            <p className=''>Share it with your friends</p>
          </div>
          
          
        </div>
        <CopyLinkButton text={'hello'}/>
      </div>
      {isCreate && <CreateWish handleOnCreate={handleOnCreate} /> }
      <div className='flex items-center justify-between w-[600px] p-2 border-2 border-sky-500 rounded-md	my-2'>
        {!isCreate && <button onClick={handleAddWish} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500 flex items-center'><FaPlus /><GoGift/></button>}
        {isCreate && <button onClick={handleAddWish} className={` bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500`}>Hide form</button>}
        <p className='text-2xl text-sky-500'>Your nickname: {localStorage.getItem('name')}</p>
        <button onClick={handleUnlogClick} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Unlog</button>
      </div>
      <div>
        <MyWishList wishes={wishes} />
      </div>
      
    </div>
  )
}

export default MyPage