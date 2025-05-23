import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Hospital, Stethoscope, User } from 'lucide-react';

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const doctorsToShow = Array.isArray(doctors) ? doctors.slice(10, 14) : [];

  return (
    <div className="px-4 sm:px-10 py-12 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-indigo-700 mb-2">👨‍⚕️ Meet Our Top Doctors</h1>
        <p className="text-gray-600 max-w-xl mx-auto text-sm">
          Simply browse through our curated list of highly rated doctors.
        </p>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {doctorsToShow.length > 0 ? (
          doctorsToShow.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointments/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-white border border-indigo-100 rounded-3xl shadow hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-4 space-y-1">
                <div className={`flex items-center gap-2 text-sm font-medium ${
                  item.available ? 'text-green-600' : 'text-gray-400'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${
                    item.available ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  {item.available ? 'Available' : 'Not Available'}
                </div>

                <p className="text-lg text-indigo-800 font-bold flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  {item.name}
                </p>

                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-blue-500" />
                  {item.hospital} Hospital
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-purple-500" />
                  {item.speciality}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No top doctors available.
          </p>
        )}
      </div>

      {/* More Doctors Button */}
      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            navigate('/doctors');
            window.scrollTo(0, 0);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-8 py-3 rounded-full shadow-lg transition-all"
        >
          View More Doctors
        </button>
      </div>
    </div>
  );
};

export default TopDoctors;
