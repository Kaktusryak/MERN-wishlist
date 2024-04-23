import React, { useState,useRef, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { MdOutlineClose } from "react-icons/md";
//conponent for pop up window where you fill form for your wish
const CreateWish = ({ handleOnCreate , handleOnCreateClose}) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')

  const refItem = useRef()
  const navigate = useNavigate()

  useEffect(()=>{
    refItem.current.focus()
  },[])

  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("TOKEN")}`;

  const handleCreate = (e) => {
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
    } else {
      console.log('no title')
    }


  }

  return (
    <div onClick={handleOnCreateClose} className=' w-[100%] h-[100%] flex justify-center items-center'>
      <div onClick={(e)=>{e.stopPropagation()}} className={` relative flex justify-center w-[600px] p-2 	my-2 transition-all fade-in-up`}>
        <form className='flex flex-col justify-center items-center my-4'>
          <div className='flex flex-col w-full items-center my-2'>
            <input ref={refItem} id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Title' type='text' ></input>
            <label htmlFor='title'>Enter here an overall name of your wish</label>
          </div>
          <div className='flex flex-col w-full items-center my-2'>
            <textarea id='desc' value={description} onChange={(e) => { setDescription(e.target.value) }} placeholder='Description' type='text' className='  bg-black bg-opacity-10 px-5 py-2 text-slate-600 rounded-md h-10 border border-white flex items-center justify-center transition-colors duration-300 hover:border-slate-600 resize-none w-[250px] h-[6rem]'></textarea>
            <label htmlFor='desc'>Enter here a description for your wish {'('}it can be some specific information{')'}</label>
          </div>
          <div className='flex flex-col w-full items-center my-2'>
            <input id='link' value={link} onChange={(e) => { setLink(e.target.value) }} placeholder='Link' type='text'></input>
            <label htmlFor='link'>Paste here a link to your wish if it exists</label>
          </div>
          <button onClick={handleCreate} className='mt-2' >Create</button>

        </form>
        <button onClick={handleOnCreateClose} className='absolute right-5 top-5 border-none bg-inherit w-fit  hover:border-none hover:bg-inherit'><MdOutlineClose className='text-3xl text-red-500' /></button>
      </div>
    </div>

  )
}

export default CreateWish