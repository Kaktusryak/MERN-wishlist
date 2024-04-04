import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//conponent for pop up window where you fill form for your wish
const CreateWish = ({handleOnCreate}) => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const [link,setLink] = useState('')


  const navigate = useNavigate()

  const handleCreate=(e)=>{
    e.preventDefault()
    if (title != '') {
      console.log(title + description + link)
      setTitle('')
      setDescription('')
      setLink('')

      axios.post('http://localhost:4040/wishes', {
        title: title,
        description: description,
        link: link,
        userId: localStorage.getItem('userId')
      }).then(response => {
        handleOnCreate()
      }).catch(error => {
        console.log(error)
      })
    }else{
      console.log('no title')
    }
    
    
  }

  return (
    <div className='flex justify-center w-[600px] p-2 border-2 border-sky-500 rounded-md	my-2'>
      <form className='flex flex-col justify-center items-center my-4'>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='title' value={title}  onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
          <label htmlFor='title'>Enter here an overall name of your wish</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <textarea  id='desc' value={description}  onChange={(e)=>{setDescription(e.target.value)}} placeholder='Description' type='text' className='rounded-md border-2 border-sky-500 w-[25rem] h-[10rem] px-2 resize-none'></textarea>
          <label htmlFor='desc'>Enter here a description for your wish {'('}it can be some specific information{')'}</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='link' value={link}  onChange={(e)=>{setLink(e.target.value)}} placeholder='Link' type='text' className='rounded-md border-2 border-sky-500 w-[25rem] h-[3rem] px-2'></input>
          <label htmlFor='link'>Paste here a link to your wish if it exists</label>
        </div>
        <button onClick={handleCreate} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Create</button>
        
      </form>
    </div>
  )
}

export default CreateWish