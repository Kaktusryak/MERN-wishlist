import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'

import {connect} from 'react-redux'



const LogIn = ({login}) => {
  const navigate = useNavigate()
  const [email,setEmail] =useState('')
  const [password,setPassword] =useState('')

  const handleLogInClick = (e)=>{
    e.preventDefault()
    // alert(email+password)
    axios.post('http://localhost:4040/user/login',{
      email:email,
      password:password
    }).then(response=>{
      console.log(response)
      localStorage.setItem('TOKEN', response.data.token)
      let decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
      
      localStorage.setItem('userId', decodedToken.userId)
      localStorage.setItem('name', decodedToken.name)
      localStorage.setItem('email',decodedToken.email)

      

      console.log(decodedToken)
      navigate('/')
    }).catch(error=>{
      console.log(error)
    })



    
  }
  const handleSignUpClick = ()=>{
    
    navigate('/signup')
  }

  return (
    <div className='flex flex-col justify-between items-center w-[600px] p-2  rounded-md	my-2'>
      <h1>Log-In into your account</h1>
      <form className='flex flex-col justify-center items-center my-4'>
        <div className='flex flex-col w-full items-center my-2'>
          <input className='w-[20rem] h-[3rem]' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder='example@email.com' type='text' ></input>
          <label htmlFor='email'>Enter your email</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input className='w-[20rem] h-[3rem]' id='pass' value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder='password' type='text' ></input>
          <label htmlFor='pass'>Enter your password</label>
        </div>
        <button onClick={handleLogInClick} className='text-sky-600' >Log-In</button>
        
      </form>
      <div className='flex flex-col justify-center items-center my-4'>
        <p>Don't have an account?</p>
        <button onClick={handleSignUpClick} className='text-amber-600'>Sign-Up</button>
      </div>
      
    </div>
  )
}

export default LogIn