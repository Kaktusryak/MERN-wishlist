import React,{useEffect,useState} from 'react'
import axios from 'axios'
import UserList from '../components/UserList'
//page where usser can observe and delete his friends
const Friends = () => {
  const [user,setUser] = useState({})
  const [friends,setFriends] = useState([])


  useEffect(()=>{
    axios.get('http://localhost:4040/user/friends/'+localStorage.getItem('userId')).then(response=>{
      console.log(response.data.followedUsers)
      setFriends(response.data.followedUsers)
      
    }).catch(error=>{
      console.log(error)
    })
      

    
    

  },[])
  return (
    <div className='flex flex-col w-[600px] justify-between  items-center'>
      <p>Your friends:</p>
      <UserList friends={friends.map(item=>(item._id))}  users={friends}/>
    </div>
  )
}

export default Friends