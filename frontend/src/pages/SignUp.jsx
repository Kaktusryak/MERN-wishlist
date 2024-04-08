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
          <input id='pass' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='nickname' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
          <label htmlFor='pass'>Enter your nickname</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='email' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='example@email.com' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
          <label htmlFor='email'>Enter your email</label>
        </div>
        <div className='flex flex-col w-full items-center my-2'>
          <input id='pass' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='password' type='text' className='rounded-md border-2 border-sky-500 w-[15rem] h-[3rem] px-2'></input>
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