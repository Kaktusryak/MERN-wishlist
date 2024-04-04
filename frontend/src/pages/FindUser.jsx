import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import UserList from '../components/UserList'
//page with the form to find user and list of found users
const FindUser = () => {
  const [users, setUsers] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4040/user').then(response=>{
      setUsers(response.data)
      console.log(response.data)
    }).catch(error=>{
      console.log(error)
    })
  },[])

  return (
    <div><UserList users={users}/></div>
  )
}

export default FindUser