
import './App.css'
import React from 'react';
import {
  RecoilRoot,
  useSetRecoilState,
} from 'recoil'
import {userState} from "./states/states"
import SignIn from './components/signin'
import SignUp from './components/signup'
import NavBar from './components/navbar'
import Course from './components/Course'
import Courses from './components/Courses'
import LandingPage from './components/landingPage'

import Updatecourse from './components/UpdateCourses'
import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom'
import  {useEffect} from 'react'

function App() {

  return (
    <>
    <RecoilRoot>

    <Router>
    <Init></Init>
      <NavBar/>
      
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/course' element={<Course/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/updatecourse/:courseId' element={<Updatecourse/>}/>
        </Routes>
    </Router>
    </RecoilRoot>
    
    </>
  )
}

export default App


export function Init(){
  const setUser = useSetRecoilState(userState)
    useEffect(()=>{
      const token=localStorage.getItem("token")
      fetch("https://course-app-z6ch.onrender.com/admin/get/me",{
        headers:{
          "Authorization":`${token}`
        }
      }).then((res) => res.json()) // Parse response as JSON
      .then((data) => {
        setUser(data.admins.username);
      })
    },[])
  
  return (<></>)
 }
 
