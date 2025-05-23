import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-r from-sky-500 to-purple-200 shadow-lg rounded-xl px-6 md:px-10 lg:px-20">
      
      {/* ----- Left Side Content ----- */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 py-10 m-auto md:py-[8vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
          Book Appointment <br /> with Trusted Doctors
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-light bg-white/10 p-4 rounded-xl backdrop-blur-md shadow-md">
          <img className="w-24" src={assets.group_profiles} alt="Group Profiles" />
          <p className="text-white">
            Browse our curated list of verified doctors and schedule your appointment with ease.
          </p>
        </div>

        <a
          href="#hospitals"
         className="inline-flex items-center gap-2 bg-white text-indigo-700 font-medium px-6 py-3 rounded-full shadow hover:scale-105 transition-transform w-fit"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* ----- Right Side Image (unchanged) ----- */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.he}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Header;
