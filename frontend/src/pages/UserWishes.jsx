import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserWishList from '../components/UserWishList'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
//wishes of exact user
const UserWishes = () => {
  const {userId} =useParams()
  const [user,setUser] = useState({})
  const [wishes,setWishes] = useState([])
  const [allWishes, setAllWishes] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const perPage = 10;

  useEffect(()=>{
    axios.get('http://localhost:4040/user/'+userId).then(response=>{
      console.log(response.data)
      setUser(response.data)
    }).catch(error=>{
      console.log(error)
    })

    axios.get('http://localhost:4040/wishes/'+userId).then(response=>{
      
      const pages = Math.ceil(response.data.number/perPage) 
      console.log(pages)
      setWishes(response.data.data.slice(0,perPage))
      setAllWishes(response.data.data)
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

  return (
    <div>
      <p > {user.name} wishes:</p>
      <div className='flex justify-between w-[600px] items-center p-2 buttons'> 
        {currentPage==1?(<button className='inactive'><GrPrevious/></button>):<button onClick={prevPage}><GrPrevious/></button>}
        <p>Page {currentPage}</p>
        {currentPage < Math.ceil(allWishes.length / perPage)?(<button onClick={nextPage}  ><GrNext/></button>):<button  className='inactive'  ><GrNext/></button>}
        
        
      </div>
      <div className='flex justify-center'>
        <UserWishList wishes={wishes}/>
      </div>
      {wishes.length>5&&<div className='flex justify-between w-[600px] items-center p-2 buttons'> 
        {currentPage==1?(<button className='inactive'><GrPrevious/></button>):<button onClick={prevPage}><GrPrevious/></button>}
        <p>Page {currentPage}</p>
        {currentPage < Math.ceil(allWishes.length / perPage)?(<button onClick={nextPage}  ><GrNext/></button>):<button  className='inactive'  ><GrNext/></button>}
        
        
      </div>}
      
    
    </div>
  )
}

export default UserWishes