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
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
//page where you can watch your wishes, invoke pop-ups for editing and creating wishes and change your data (currently only nickname)
const MyPage = () => {
  const [isCreate,setCreate] = useState(false)
  const [wishes,setWishes] = useState([])
  const [allWishes, setAllWishes] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const perPage = 10;
  let totalPages
  

  useEffect(()=>{
    axios.get('http://localhost:4040/wishes/'+localStorage.getItem('userId')).then(response=>{
      
      
      setWishes(response.data.data.slice(0,perPage))
      setAllWishes(response.data.data)
      if(response.data.data%perPage==0){
        totalPages = response.data.data/perPage
      }else{
        totalPages = response.data.data/perPage+1
      }
      
    }).catch(error=>{
      console.log(error)
    })
    
  },[])

  const nextPage = () => {
    if (currentPage < Math.ceil(allWishes.length / perPage)) {
        setCurrentPage(currentPage + 1);
        const startIndex = (currentPage + 1 - 1) * perPage;
        const endIndex = startIndex + perPage;
        setWishes(allWishes.slice(startIndex, endIndex));
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        const startIndex = (currentPage - 1 - 1) * perPage;
        const endIndex = startIndex + perPage;
        setWishes(allWishes.slice(startIndex, endIndex));
    }
  };

  

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
  const handleOnCreateClose = ()=>{
    setCreate(false)
    
  }

  return (
    <div className=' flex flex-col items-center  w-[100%] h-[100vh] transition-all'>
      <div className='flex items-center justify-between w-[600px] p-2 border-b-2 border-slate-400	my-2'>
        <div className='flex'>
          <div>
            <p className='text-wrap'>Your wishes link:<br/> http://localhost:5173/wishes/{localStorage.getItem('userId')}</p>
            <p className=''>Share it with your friends</p>
          </div>
          
          
        </div>
        <CopyLinkButton text={`http://localhost:5173/wishes/${localStorage.getItem('userId')}`}/>
      </div>
      {isCreate && <CreateWish handleOnCreate={handleOnCreate} handleOnCreateClose={handleOnCreateClose} /> }
      <div className='flex items-center justify-between w-[600px] p-2 border-b-2 border-slate-400	my-2'>
        {!isCreate && <button onClick={handleAddWish} ><FaPlus /><GoGift/></button>}
        {isCreate && <button onClick={handleAddWish} >Hide form</button>}
        <p className='text-2xl '>Your nickname: {localStorage.getItem('name')}</p>
        <button onClick={handleUnlogClick} >Unlog</button>
      </div>
      <div className='flex justify-between w-[600px] p-2 buttons'> 
        {currentPage==1?(<button className='inactive'><GrPrevious/></button>):<button onClick={prevPage}><GrPrevious/></button>}
        
        {currentPage < Math.ceil(allWishes.length / perPage)?(<button  onClick={nextPage}  ><GrNext/></button>):<button  className='inactive'  ><GrNext/></button>}
        
        
      </div>
      <div >
        <MyWishList wishes={wishes} />
      </div>
      <div className='flex justify-between w-[600px] p-2 buttons'> 
        {currentPage==1?(<button className='inactive'><GrPrevious/></button>):<button onClick={prevPage}><GrPrevious/></button>}
        
        {currentPage < Math.ceil(allWishes.length / perPage)?(<button onClick={nextPage}  ><GrNext/></button>):<button  className='inactive'  ><GrNext/></button>}
        
        
      </div>
      
    </div>
  )
}

export default MyPage