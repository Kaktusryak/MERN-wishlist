import React, {useState,useRef, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//pop up where you edit your wish
const EditWish = ({title,description,link,_id}) => {
  const [newTitle,setTitle] = useState(title)
  const [newDescription,setDescription] = useState(description)
  const [newLink,setLink] = useState(link)
  const refItem = useRef()

  const navigate = useNavigate()
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("TOKEN")}`;

  useEffect(()=>{
    refItem.current.focus()
  },[])

  const handleEdit=(e)=>{
    e.preventDefault()
    if (title != '') {
      console.log(title + description + link)
      setTitle('')
      setDescription('')
      setLink('')

      axios.patch('http://localhost:4040/wishes/'+_id, {
        title: newTitle,
        description: newDescription,
        link: newLink,
        
      }).then(response => {
        //handleOnCreate()
        navigate(0)
      }).catch(error => {
        console.log(error)
      })
    }else{
      console.log('no title')
    }
    
    
  }

  

  return (
    
    <div className='flex justify-center w-[450px] p-2 fade-in-up 	my-2 '>
      <form className='flex flex-col justify-center items-center my-4'>
        <div className='flex flex-col w-full items-center my-2'>
          <label>Title:</label>
          <input ref={refItem} id='title' value={newTitle}  onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title' type='text' />
          
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <label>Description:</label>
          <textarea  id='desc' value={newDescription}  onChange={(e)=>{setDescription(e.target.value)}} placeholder='Description' type='text' className='py-2  bg-black bg-opacity-10 px-5 text-slate-600 rounded-md h-10 border border-white flex items-center justify-center transition-colors duration-300 hover:border-slate-600 resize-none w-[250px] h-[6rem]'/>
        </div> 
        <div className='flex flex-col w-full items-center my-2'>
          <label>Link:</label>
          <input id='link' value={newLink}  onChange={(e)=>{setLink(e.target.value)}} placeholder='Link' type='text' />
          
        </div>
        <button className="mt-2"onClick={handleEdit} >Apply</button>
        
      </form>
    </div>
  )
}


export default EditWish