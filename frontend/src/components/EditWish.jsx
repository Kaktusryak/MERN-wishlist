import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
//pop up where you edit your wish
const EditWish = ({title,description,link,_id}) => {
  const [newTitle,setTitle] = useState(title)
  const [newDescription,setDescription] = useState(description)
  const [newLink,setLink] = useState(link)


  const navigate = useNavigate()

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
    
    <div className='flex justify-center w-[450px] p-2 border-2 border-sky-500 rounded-md	my-2'>
      <form className='flex flex-col justify-center items-center my-4'>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='title' value={newTitle}  onChange={(e)=>{setTitle(e.target.value)}} placeholder='Title' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'/>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <textarea  id='desc' value={newDescription}  onChange={(e)=>{setDescription(e.target.value)}} placeholder='Description' type='text' className='rounded-md border-2 border-sky-500 w-[25rem] h-[10rem] px-2 resize-none'/>
        </div> 
        <div className='flex flex-col w-full items-center my-2'>
          <input id='link' value={newLink}  onChange={(e)=>{setLink(e.target.value)}} placeholder='Link' type='text' className='rounded-md border-2 border-sky-500 w-[25rem] h-[3rem] px-2'/>
          
        </div>
        <button onClick={handleEdit} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Edit wish</button>
        
      </form>
    </div>
  )
}


export default EditWish