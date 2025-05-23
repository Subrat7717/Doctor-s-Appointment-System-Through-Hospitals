import React, { useEffect, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllAppointments = () => {
  const { aToken, appointments, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) getAllAppointments()
  }, [aToken])

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">All Appointments</h2>

      <div className="grid gap-4 max-h-[80vh] overflow-y-auto pr-1">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 border hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-4 w-full md:w-1/4">
              <img src={item.userData.image} className="w-12 h-12 rounded-full" alt="" />
              <div>
                <p className="font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-sm text-gray-500">Age: {calculateAge(item.userData.dob)}</p>
              </div>
            </div>

            <div className="text-sm md:text-base w-full md:w-1/4">
              <p className="text-gray-700">{slotDateFormat(item.slotDate)}</p>
              <p className="text-gray-500">{item.slotTime}</p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-1/4">
              <img src={item.docData.image} className="w-10 h-10 rounded-full bg-gray-200" alt="" />
              <div>
                <p className="font-medium text-gray-700">{item.docData.name}</p>
                <p className="text-xs text-gray-500">Fees: {currency}{item.amount}</p>
              </div>
            </div>

            <div className="w-full md:w-1/6 text-center md:text-right">
              {item.cancelled ? (
                <span className="text-red-500 font-medium text-sm">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-600 font-medium text-sm">Completed</span>
              ) : (
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 mx-auto cursor-pointer hover:scale-110"
                  src={assets.cancel_icon}
                  alt="Cancel"
                  title="Cancel Appointment"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
