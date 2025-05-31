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
import About from './pages/About';

function App() {

    const [user, setUser] = useState(undefined);
    const [isTooSmall, setIsTooSmall] = useState(window.innerWidth < 750);

   

  useEffect(()=>{
    const u = getItem("user")
    u == null? setUser(null) : setUser(u);

     const handleResize = () => {
      setIsTooSmall(window.innerWidth < 750);
    };
     window.addEventListener('resize', handleResize);

    // Clean up listener on unmount
    return () => window.removeEventListener('resize', handleResize);
  },[])
  

  return (<>
     {/* {isTooSmall ? 
      <div className='small_screen'>Hey!🫰 i know you want to see in small screens, but i promise this feature will be available within 24 hours, until please have some patience naaaa...</div> :  */}
      <div className='app'>

      { user === undefined? 
        null :
      <>
      <div className='home'>
            <Navbar></Navbar>
            <div className='pages'>
              {/* <Loading/> */}
            <Routes>

              <Route path='/' element={<Navigate to="/jobs"/>} />
              <Route path='/jobs' element={<Jobs/>} /> 
              <Route path='/jobs/:jobId' element={<Job/>}/>
              <Route path='/profile/:userID'element={<Profile/>} />
              <Route path='/about' element={<About/>} /> 

              
                { user == null && 
                  <Route path='/auth' element={<Auth/>}/> }

                { user !== null && 
                  <Route path='/profile'element={<Navigate to="/profile/:userID" replace />} /> }
              
                <Route path='*' element={<Navigate to="/jobs" replace />} />
            </Routes>
            </div>

      </div>
           </> }
      {/* <Footer/> */}
    </div>
     {/* }  */}
  </>
   
  )
}

export default App
