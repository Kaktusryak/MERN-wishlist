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
        <input value={query} onChange={(e)=>{setQuery(e.target.value)}} placeholder='friend name' className='rounded-md border-2 border-sky-500 w-[25rem] h-[3rem] px-2'/>
        <button onClick={findUser} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Find</button>
      </form>
      <UserList friends={friends} users={users}/>
    </div>
  )
}

export default FindUser