import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Hospital, HeartPulse } from 'lucide-react'; // Optional icons for styling

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ];

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4 text-center">
        👨‍⚕️ Browse Doctors by Speciality
      </h1>

      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Filter Sidebar */}
        <div className="sm:w-1/4 w-full">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className={`py-2 px-4 w-full border rounded-lg sm:hidden transition-all font-medium ${
              showFilter ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-600'
            }`}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>

          <div
            className={`flex-col gap-3 mt-4 sm:mt-0 ${
              showFilter ? 'flex' : 'hidden sm:flex'
            }`}
          >
            {specialities.map((spec, index) => (
              <p
                key={index}
                onClick={() =>
                  speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)
                }
                className={`px-4 py-2 rounded-lg border border-gray-300 cursor-pointer text-sm font-medium transition-all
                  ${
                    speciality === spec
                      ? 'bg-indigo-100 text-indigo-800 border-indigo-300'
                      : 'hover:bg-indigo-50 text-gray-700'
                  }`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 w-full">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
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
                  className="w-full h-52 object-cover rounded-t-3xl"
                />
                <div className="p-4 space-y-1">
                  <div
                    className={`flex items-center gap-2 text-sm font-medium ${
                      item.available ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available ? 'bg-green-500' : 'bg-gray-400'
                      }`}
                    ></span>
                    {item.available ? 'Available' : 'Not Available'}
                  </div>
                  <p className="text-lg text-indigo-800 font-bold flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-500" />
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Hospital className="w-4 h-4 text-indigo-400" />
                    {item.hospital} Hospital
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <HeartPulse className="w-4 h-4 text-pink-500" />
                    {item.speciality}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No doctors found for this speciality.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
