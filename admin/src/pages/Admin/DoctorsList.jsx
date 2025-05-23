import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { Hospital, Stethoscope } from 'lucide-react';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-50 to-white">
      <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">🩺 All Doctors</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="🔍 Search doctors..."
          className="w-full max-w-lg px-5 py-3 border border-purple-300 rounded-full shadow focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-purple-100 rounded-3xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition duration-300 ease-in-out"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
              <div className="p-5 space-y-2">
                <h2 className="text-xl font-bold text-purple-800">{item.name}</h2>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-purple-400" />
                  {item.speciality}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-purple-400" />
                  {item.hospital}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className="accent-purple-500"
                  />
                  <label className="text-sm text-gray-700">Available</label>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center text-lg">No doctors found.</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
