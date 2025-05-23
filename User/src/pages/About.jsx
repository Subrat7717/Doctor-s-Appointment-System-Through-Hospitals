import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white px-6 md:px-20 py-16 text-gray-800">

      {/* Stylish Heading */}
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-wide mb-2">
          🚀 About <span className="text-gray-800">Us</span>
        </h1>
        <div className="w-24 h-1 bg-blue-600 rounded-full mb-2"></div>
        <p className="text-gray-500 text-sm sm:text-base text-center max-w-xl">
          Learn more about our mission, our values, and why we’re dedicated to making healthcare easier for everyone.
        </p>
      </div>

      {/* About Section */}
      <div className='my-10 flex flex-col md:flex-row gap-12 items-center'>
        <img className="w-full md:max-w-[400px] rounded-3xl shadow-md" src={assets.about_image} alt="About EasyDoc" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-[15px] text-gray-700 leading-relaxed'>
          <p>Welcome to <strong className="text-blue-600">EasyDoc</strong>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
          <p><strong>EasyDoc</strong> is committed to excellence in healthcare technology. We continuously enhance our platform, integrating the latest innovations to improve user experience and service delivery. Whether it's your first appointment or ongoing care, EasyDoc supports you every step of the way.</p>
          <b className='text-gray-800 text-lg mt-2'>Our Vision</b>
          <p>To create a seamless healthcare experience by bridging the gap between patients and healthcare providers, ensuring care is accessible when it's needed most.</p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-center text-2xl font-semibold text-blue-700 mb-8'>
        <p>WHY <span className='text-indigo-600'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-6 md:gap-10 mb-20'>
        <div className='bg-white border border-blue-100 px-10 md:px-16 py-10 rounded-3xl shadow-md text-center hover:bg-blue-100 transition-all duration-300'>
          <h3 className='text-lg font-bold text-blue-800 mb-2'>EFFICIENCY</h3>
          <p className='text-sm text-gray-600'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='bg-white border border-blue-100 px-10 md:px-16 py-10 rounded-3xl shadow-md text-center hover:bg-blue-100 transition-all duration-300'>
          <h3 className='text-lg font-bold text-blue-800 mb-2'>CONVENIENCE</h3>
          <p className='text-sm text-gray-600'>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='bg-white border border-blue-100 px-10 md:px-16 py-10 rounded-3xl shadow-md text-center hover:bg-blue-100 transition-all duration-300'>
          <h3 className='text-lg font-bold text-blue-800 mb-2'>PERSONALIZATION</h3>
          <p className='text-sm text-gray-600'>Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
