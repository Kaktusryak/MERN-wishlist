import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import { Route,Routes } from 'react-router-dom'
import FindUser from '../src/pages/FindUser'
import MainPage from '../src/pages/MainPage'
import Friends from '../src/pages/Friends'
import LogIn from '../src/pages/LogIn'
import MyPage from '../src/pages/MyPage'
import SignUp from '../src/pages/SignUp'
import UserWishes from '../src/pages/UserWishes'
import Navbar from '../src/components/Navbar'
import Footer from './components/Footer'
import { ThemeContext } from './constext/ThemeContext'




function App() {
  const [count, setCount] = useState(0)
  
  
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("TOKEN")}`;

  const navigate = useNavigate()

  const unlog = ()=>{
    localStorage.setItem('TOKEN','')
    localStorage.setItem('email','')
    localStorage.setItem('userId','')
    localStorage.setItem('name','')
    

  }

  const {darkTheme} = useContext(ThemeContext)
  
 

  // useEffect(()=>{
  //   axios.get('http://localhost:4040/user/isActual').then(res=>{

  //   }

  //   ).catch(
  //     unlog()
  //   )
  // },[])

  

  return (
    <div className={`flex justify-center ${darkTheme} `}> 


      <div className={`w-[900px] flex flex-col items-center justify-between `}>
        <Navbar />

        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/findUser' element={<FindUser />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/wishes/:userId' element={<UserWishes />} />
          {/* wishes of a user */}

        </Routes>



      </div>
    </div>
  )
}

export default App
