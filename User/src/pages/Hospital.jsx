import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, Phone, Hospital } from 'lucide-react';
import FindDirectionButton from '../components/FindDirectionButton'; // ✅ import

const Hospitals = () => {
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHospitals = hospitals?.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.contact.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto bg-gradient-to-br from-blue-50 to-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">🏥 Explore All Hospitals</h1>

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
        {filteredHospitals && filteredHospitals.length > 0 ? (
          filteredHospitals.map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/80 border border-blue-100 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition duration-300 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover rounded-t-3xl"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-blue-500" />
                  {item.name} Hospital
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
              <div className="px-5 pb-5 space-y-2">
                <button
                  onClick={() => navigate(`/hospital/${item.name}`)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 hover:shadow-md transition duration-200 flex items-center justify-center gap-2"
                >
                  🩺 Find Doctor
                </button>

                {/* ✅ Matching Find Direction Button */}
                <FindDirectionButton destination={item.address} />
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

export default Hospitals;