import React from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const handleLogInClick = ()=>{
    navigate('/login')
  }
  const handleSignUpClick = ()=>{
    navigate('/')
  }

  return (
    <div className='flex flex-col justify-between items-center w-[600px] p-2  rounded-md	my-2'>
      <h1>Create new account</h1>
      <form className='flex flex-col justify-center items-center my-4'>
      <div className='flex flex-col w-full items-center my-2'>
          <input id='nick' placeholder='nickname' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
          <label htmlFor='nick'>Enter your nickname</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='email' placeholder='example@email.com' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
          <label htmlFor='email'>Enter your email</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='pass' placeholder='password' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
          <label htmlFor='pass'>Enter your password</label>
        </div>
        <button onClick={handleSignUpClick} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Sign-Up</button>
        
      </form>
      <div className='flex flex-col justify-center items-center my-4'>
        <p>Already have an account?</p>
        <button onClick={handleLogInClick} className='bg-sky-500 border-2 border-white rounded-md text-white py-2 px-4 my-2 hover:border-sky-500 hover:bg-white hover:text-sky-500'>Log-In</button>
      </div>
      
    </div>
  )
}

export default SignUp