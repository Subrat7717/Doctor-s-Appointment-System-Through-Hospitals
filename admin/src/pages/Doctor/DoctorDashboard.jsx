import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="m-5 space-y-10">

      {/* Top Stats Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl shadow-md border hover:shadow-lg transition-all">
          <img className="w-14 h-14" src={assets.earning_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-700">{currency} {dashData.earnings}</p>
            <p className="text-gray-500 text-sm">Earnings</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl shadow-md border hover:shadow-lg transition-all">
          <img className="w-14 h-14" src={assets.appointments_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-700">{dashData.appointments}</p>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white p-5 min-w-52 rounded-xl shadow-md border hover:shadow-lg transition-all">
          <img className="w-14 h-14" src={assets.patients_icon} alt="" />
          <div>
            <p className="text-xl font-semibold text-gray-700">{dashData.patients}</p>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white rounded-xl shadow-md border">
        <div className="flex items-center gap-3 px-6 py-5 border-b">
          <img src={assets.list_icon} alt="" className="w-6 h-6" />
          <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div>
          {dashData.latestAppointments.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center justify-between px-6 py-4 border-b hover:bg-gray-50 transition-all">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover" src={item.userData.image} alt="" />
                <div className="text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-500 text-xs">Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              <div>
                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-semibold">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-600 text-xs font-semibold">Completed</p>
                ) : (
                  <div className="flex gap-3">
                    <img onClick={() => cancelAppointment(item._id)} className="w-8 cursor-pointer hover:scale-110 transition" src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className="w-8 cursor-pointer hover:scale-110 transition" src={assets.tick_icon} alt="" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;
