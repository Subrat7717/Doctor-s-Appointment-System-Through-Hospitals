import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const navItemClass = ({ isActive }) =>
  `flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200 
   ${isActive ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50 text-gray-700'}
  `;

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className="min-h-screen bg-white border-r shadow-sm p-4 w-full md:w-72">
      {(aToken || dToken) && (
        <h2 className="text-xl font-bold text-blue-800 mb-4 pl-2">📋 Menu</h2>
      )}

      {aToken && (
        <ul className="space-y-1">
          <NavLink to="/admin-dashboard" className={navItemClass}>
            <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/all-appointments" className={navItemClass}>
            <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
            <span>Appointments</span>
          </NavLink>

          <NavLink to="/add-doctor" className={navItemClass}>
            <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5" />
            <span>Add Doctor</span>
          </NavLink>

          <NavLink to="/add-hospital" className={navItemClass}>
            <img src={assets.add_hospital} alt="Add Hospital" className="w-5 h-5" />
            <span>Add Hospital</span>
          </NavLink>

          <NavLink to="/doctor-list" className={navItemClass}>
            <img src={assets.people_icon} alt="Doctors List" className="w-5 h-5" />
            <span>Doctors List</span>
          </NavLink>

          <NavLink to="/hospital-list" className={navItemClass}>
            <img src={assets.hospital_list} alt="Hospitals List" className="w-5 h-5" />
            <span>Hospitals List</span>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <>
          <hr className="my-6 border-gray-200" />
          <ul className="space-y-1">
            <NavLink to="/doctor-dashboard" className={navItemClass}>
              <img src={assets.home_icon} alt="Doctor Dashboard" className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>

            <NavLink to="/doctor-appointments" className={navItemClass}>
              <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5" />
              <span>Appointments</span>
            </NavLink>

            <NavLink to="/doctor-profile" className={navItemClass}>
              <img src={assets.people_icon} alt="Profile" className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;
