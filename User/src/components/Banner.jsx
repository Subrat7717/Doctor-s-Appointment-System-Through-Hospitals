import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()
  return (
        <div className='flex bg-gradient-to-r from-sky-500 to-purple-200 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 '>
        {/*-------Left Side------*/}
            <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
                <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
                    <p>Book Appointment</p>
                    <p className='mt-4 '> With 100+ Trusted Doctors</p>
                </div>
                <button onClick={()=>{navigate('/login'); scrollTo(0,0)}}  className="inline-flex items-center gap-2 bg-white text-indigo-700 font-medium px-6 py-1 rounded-full shadow hover:scale-105 transition-transform w-fit mt-4">Create Account</button>
            </div>
        {/*-------Right Side------*/}
        <div className='hidden md:block md:w-1/2 lg:w-[360px]  relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md ' src={assets.appointment_img} alt="" />
        </div>
         
    </div>
  )
}

export default Banner