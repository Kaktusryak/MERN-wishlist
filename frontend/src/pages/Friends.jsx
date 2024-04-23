import React,{useEffect,useState} from 'react'
import axios from 'axios'
import UserList from '../components/UserList'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
//page where usser can observe and delete his friends
const Friends = () => {
  const [user,setUser] = useState({})
  const [friends,setFriends] = useState([])
  
  const [allFriends, setAllFriends] = useState([])
  const [currentPage,setCurrentPage] = useState(1)
  const perPage = 10;


  useEffect(()=>{
    axios.get('http://localhost:4040/user/friends/'+localStorage.getItem('userId')).then(response=>{
      console.log(response.data.data)
      setAllFriends(response.data.data)
      const pages = Math.ceil(response.data.number/perPage) 
      setFriends(response.data.data.slice(0,perPage))
      
    }).catch(error=>{
      console.log(error)
    })
  },[])


  const nextPage = () => {
    if (currentPage < Math.ceil(allFriends.length / perPage)) {
        setCurrentPage(currentPage + 1);
        const startIndex = (currentPage + 1 - 1) * perPage;
        const endIndex = startIndex + perPage;
        setFriends(allFriends.slice(startIndex, endIndex));
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        const startIndex = (currentPage - 1 - 1) * perPage;
        const endIndex = startIndex + perPage;
        setFriends(allFriends.slice(startIndex, endIndex));
    }
  };

  return (
    <div className='flex flex-col w-[600px] justify-between  items-center'>
      <p>Your friends:</p>
      
      <div className='flex justify-between w-[600px] p-2 buttons'> 
        {currentPage==1?(<button className='inactive'><GrPrevious/></button>):<button onClick={prevPage}><GrPrevious/></button>}
        
        {currentPage < Math.ceil(allFriends.length / perPage)?(<button onClick={nextPage}  ><GrNext/></button>):<button  className='inactive'  ><GrNext/></button>}
        
        
      </div>
      <UserList friends={friends.map(item=>(item._id))}  users={friends}/>
      <div className='flex justify-between w-[600px] p-2 buttons'> 
        {currentPage==1?(<button className='inactive'><GrPrevious/></button>):<button onClick={prevPage}><GrPrevious/></button>}
        
        {currentPage < Math.ceil(allFriends.length / perPage)?(<button onClick={nextPage}  ><GrNext/></button>):<button  className='inactive'  ><GrNext/></button>}
        
        
      </div>
    </div>
  )
}

export default Friends