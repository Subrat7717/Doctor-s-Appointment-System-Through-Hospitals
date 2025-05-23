import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { MapPin, Phone, Hospital } from 'lucide-react';

const HospitalsList = () => {
  const { hospitals, aToken, getAllHospitals } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (aToken) {
      getAllHospitals();
    }
  }, [aToken]);

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">🏥 All Hospitals</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search hospitals..."
          className="w-full max-w-lg px-5 py-3 border border-blue-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredHospitals.length > 0 ? (
          filteredHospitals.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-blue-100 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition duration-300 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-blue-500" />
                  {item.name}
                </h2>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {item.address}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  {item.contact}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">No hospitals found.</p>
        )}
      </div>
    </div>
  );
};

export default HospitalsList;
