import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleLogInClick = () => {
    navigate('/login')
  }


  const handleSignUpClick = (e) => {
    e.preventDefault()
    // alert(email+password)
    axios.post('http://localhost:4040/user/signup', {
      email: email,
      password: password,
      name: name
    }).then(response => {
      console.log(response)

      navigate('/')
    }).catch(error => {
      console.log(error)
    })
  }


  return (
    <div className='flex flex-col justify-between items-center w-[600px] p-2  rounded-md	my-2'>
      <h1>Create new account</h1>
      <form className='flex flex-col justify-center items-center my-4'>
        <div className='flex flex-col w-full items-center my-2'>
          <input className='w-[20rem] h-[3rem]' id='pass' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='nickname' type='text' ></input>
          <label htmlFor='pass'>Enter your nickname</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input className='w-[20rem] h-[3rem]' id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='example@email.com' type='text' ></input>
          <label htmlFor='email'>Enter your email</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input className='w-[20rem] h-[3rem]' id='pass' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' type='text' ></input>
          <label htmlFor='pass'>Enter your password</label>
        </div>
        
        <button onClick={handleSignUpClick} className='text-amber-600'>Sign-Up</button>

      </form>
      <div className='flex flex-col justify-center items-center my-4'>
        <p>Already have an account?</p>
        <button onClick={handleLogInClick} className='text-sky-600'>Log-In</button>
      </div>

    </div>
  )

}

export default SignUp