import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import UserList from '../components/UserList'
//page with the form to find user and list of found users
const FindUser = () => {
  const [users, setUsers] = useState([])
  const [query,setQuery] = useState('')
  const [friends,setFriends] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4040/user').then(response=>{
      setUsers(response.data)
      console.log(response.data)
    }).catch(error=>{
      console.log(error)
    })

    try {
      axios.get('http://localhost:4040/user/friends/' + localStorage.getItem('userId')).then(response => {
        console.log(response.data.followedUsers.map(item=>(item._id)))
        setFriends(response.data.followedUsers.map(item=>(item._id)))

      }).catch(error => {
        console.log(error)
      })
    } catch (error) {

    }
  }, [])

  const findUser = (e)=>{
    e.preventDefault()
    axios.post('http://localhost:4040/user/find',{
      query:query
    }).then(response=>{
      console.log(response.data)
      setUsers(response.data)
    }).catch(error=>{
      console.log(error)
    })
  }

  return (
    <div className='flex flex-col w-[600px] justify-between  items-center'>
      <form className='flex w-[600px] justify-around  items-center my-4'>
        <input className='w-[20rem] h-[3rem]' value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder='friend name' />
        <button className='w-[5rem] h-[2.5rem]' onClick={findUser} >Find</button>
      </form>
      <UserList friends={friends} users={users}/>
    </div>
  )
}

export default FindUser