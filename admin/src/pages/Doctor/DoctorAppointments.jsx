import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Doctor's Appointments</h2>

      <div className="grid gap-4 max-h-[80vh] overflow-y-auto pr-1">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border hover:shadow-lg transition-all"
          >
            {/* Patient Info */}
            <div className="flex items-center gap-4 w-full md:w-1/4">
              <img src={item.userData.image} className="w-12 h-12 rounded-full" alt={item.userData.name} />
              <div>
                <p className="font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-sm text-gray-500">Age: {calculateAge(item.userData.dob)}</p>
              </div>
            </div>

            {/* Appointment Date */}
            <div className="text-sm md:text-base w-full md:w-1/4">
              <p className="text-gray-700">{slotDateFormat(item.slotDate)}</p>
              <p className="text-gray-500">{item.slotTime}</p>
            </div>

            {/* Fees & Payment */}
            <div className="w-full md:w-1/4 text-sm">
              <p className="text-gray-600">Fees: {currency}{item.amount}</p>
              <p className="inline-block text-xs px-2 py-1 mt-1 rounded-full border border-indigo-300 text-indigo-600">
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>

            {/* Action */}
            <div className="w-full md:w-1/6 text-center md:text-right">
              {item.cancelled ? (
                <span className="text-red-500 font-medium text-sm">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 font-medium text-sm">Completed</span>
              ) : (
                <div className="flex justify-center md:justify-end gap-2">
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-8 cursor-pointer hover:scale-110"
                    src={assets.cancel_icon}
                    alt="Cancel"
                    title="Cancel Appointment"
                  />
                  <img
                    onClick={() => completeAppointment(item._id)}
                    className="w-8 cursor-pointer hover:scale-110"
                    src={assets.tick_icon}
                    alt="Complete"
                    title="Mark as Completed"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
