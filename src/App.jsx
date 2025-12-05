import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import Login from './pages/Login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'

const App = () => {

  const dispatch = useDispatch()

    const getUserData = async () => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        // Set default Authorization header for axios (so all requests use it)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const { data } = await api.get('/api/users/data');
        if (data.user) {
          // dispatch user + token into redux
          dispatch(login({ token, user: data.user }));
        }
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log('getUserData error:', error?.response?.data || error.message);
      // If token invalid, clear it
      localStorage.removeItem('token');
      api.defaults.headers.common['Authorization'] = '';
    }
  }


  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>
    <Toaster />
      <Routes>
        <Route path='/' element={<Home />}/>

        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder />}/>
        </Route>

        <Route path='view/:resumeId' element={<Preview />}/>

      </Routes>
    </>
  )
}

export default App
