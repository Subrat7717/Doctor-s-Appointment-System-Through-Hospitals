import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="flex flex-col items-center gap-6 py-16 text-gray-800 bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-blue-800">🔍 Find by Speciality</h1>
      <p className="sm:w-1/2 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto px-4 scrollbar-hide">
        {specialityData.map((item, index) => (
          <Link
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            key={index}
            className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-300 p-4 min-w-[100px] sm:min-w-[130px]"
          >
            <img className="w-16 sm:w-20 mb-2 object-contain" src={item.image} alt={item.speciality} />
            <p className="text-sm font-medium text-blue-700 text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
