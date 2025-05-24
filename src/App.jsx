import { useEffect, useState } from 'react'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Navbar  from './components/Navbar';
import Job from './pages/Job';
import Footer from './components/Footer';
import { getItem } from './utils/storage';
import Auth from './pages/Auth';
import Loading from './pages/loading';

function App() {

  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    const u = getItem("user")
    u == null? setUser(null) : setUser(u);
  },[])
  

  return (
    <div className='app'>

      { user === undefined? 
        <Loading/> :
      <>
      <Navbar></Navbar>
      <Routes>

        <Route path='/' element={<Navigate to="/jobs"/>} />
        <Route path='/jobs' element={<Jobs/>} /> 
        <Route path='/jobs/:jobId' element={<Job/>}/>
        <Route path='/profile/:userID'element={<Profile/>} />

        
          { user == null && 
            <Route path='/auth' element={<Auth/>}/> }

          { user !== null && 
            <Route path='/profile'element={<Navigate to="/profile/:userID" replace />} /> }
        
          <Route path='*' element={<Navigate to="/jobs" replace />} />
      </Routes>
      </> }
      <Footer/>
    </div>
  )
}

export default App
