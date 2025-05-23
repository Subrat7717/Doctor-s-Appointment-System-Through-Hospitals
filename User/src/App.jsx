import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointments from './pages/Appointments'
import Navbar from './components/Navbar';
import Doctors from './pages/Doctors';
import Footer from './components/Footer';
import Hospital from './pages/Hospital';
import PerticularHospitalDoctor from './pages/Perticular-Hospital-Doctor';
import { ToastContainer, toast } from 'react-toastify';
  


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%] '>
      <ToastContainer/>
      <Navbar/>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/hospital' element={<Hospital/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<MyProfile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointments/:docId' element={<Appointments/>}/>
        <Route path='/hospital/:hospital_name' element={<PerticularHospitalDoctor/>}/>
      </Routes>
      <Footer />
      
    </div>
  )
}

export default App

