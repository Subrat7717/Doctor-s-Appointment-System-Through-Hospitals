import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
    if (dToken) {
      setDToken('');
      localStorage.removeItem('dToken');
    }
  };

  return (
    <div className="w-full bg-white shadow-md border-b border-gray-200 px-4 sm:px-8 py-3 flex justify-between items-center flex-wrap gap-3">
      {/* Logo & Role */}
      <div className="flex items-center gap-4">
        <img
          src={assets.admin_logo}
          alt="Admin Logo"
          className="w-36 sm:w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {aToken ? 'Admin' : 'Doctor'}
        </span>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm px-6 py-2 rounded-full shadow transition-all duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
