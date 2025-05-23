import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div>

      {/* Updated Contact Us Heading */}
      <div className="flex flex-col items-center pt-14 pb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 tracking-wide">
          📞 Contact <span className="text-gray-800">Us</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base text-center w-full sm:w-2/3">
          We’re here to help! Reach out to us with any questions, suggestions, or opportunities.
        </p>
      </div>

      {/* Content Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm px-4 sm:px-10'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="Contact EasyDoc" />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-700'>OUR OFFICE</p>
          <p className='text-gray-500'>
            VIM-739, Sailashree Vihar<br />
            Bhubaneswar, Odisha, PINCode - 751021
          </p>
          <p className='text-gray-500'>
            Tel: +91 9556757717<br />
            Email: easydoc@gmail.com
          </p>

          <p className='font-semibold text-lg text-gray-700'>CAREERS AT EASYDOC</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-3 text-sm rounded-full hover:bg-black hover:text-white transition-all duration-500'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
