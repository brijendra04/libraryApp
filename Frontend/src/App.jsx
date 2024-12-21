import React from 'react'
import Home from '../src/Home/Home'
import Courses from './courses/Courses'
import {Navigate, Route, Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Contact from '../src/contact/Contact'
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import About from './about/About'
import { useAuth } from './context/AuthProvider'



function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser)
  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/course" element={authUser ? <Courses/>: <Navigate to="/signup"/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/about" element={<About/>}/>
      
    </Routes>
    <Toaster/>
    </div>
    
    </>
  )
}

export default App