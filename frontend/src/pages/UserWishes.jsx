import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import UserWishList from '../components/UserWishList'
//wishes of exact user
const UserWishes = () => {
  const {userId} =useParams()
  const [user,setUser] = useState({})
  const [wishes,setWishes] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4040/user/'+userId).then(response=>{
      console.log(response.data)
      setUser(response.data)
    }).catch(error=>{
      console.log(error)
    })


    axios.get('http://localhost:4040/wishes/'+userId).then(response=>{
      console.log(response.data)
      setWishes(response.data)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  return (
    <div>
      <p > {user.name} wishes:</p>
      <UserWishList wishes={wishes}/>
    
    </div>
  )
}

export default UserWishes