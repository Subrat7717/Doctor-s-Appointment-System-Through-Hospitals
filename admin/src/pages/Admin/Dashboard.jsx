import React, { useContext, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="m-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: assets.doctor_icon, label: 'Doctors', count: dashData.doctors },
          { icon: assets.hospital_icon, label: 'Hospitals', count: dashData.hospitals },
          { icon: assets.appointments_icon, label: 'Appointments', count: dashData.appointments },
          { icon: assets.patients_icon, label: 'Patients', count: dashData.patients },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-5 flex items-center gap-4 hover:shadow-xl transition-shadow">
            <img className="w-14 h-14" src={item.icon} alt={item.label} />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{item.count}</h3>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Bookings */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <div className="flex items-center gap-3 px-6 py-4 border-b">
          <img src={assets.list_icon} alt="Latest Bookings" className="w-6" />
          <h2 className="font-semibold text-gray-700">Latest Bookings</h2>
        </div>

        <div>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover" src={item.docData.image} alt="Doctor" />
                <div>
                  <p className="text-gray-800 font-medium">{item.docData.name}</p>
                  <p className="text-xs text-gray-500">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>
              <div>
                {item.cancelled ? (
                  <span className="text-xs font-medium text-red-500">Cancelled</span>
                ) : item.isCompleted ? (
                  <span className="text-xs font-medium text-green-500">Completed</span>
                ) : (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 text-xs rounded-md"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
