import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'

const Appointments = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const navigate = useNavigate()

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  useEffect(() => {
    const info = doctors.find((doc) => doc._id === docId)
    if (info) setDocInfo(info)
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo])

  const getAvailableSlots = () => {
    const today = new Date()
    const newSlots = []

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      if (i === 0) {
        currentDate.setHours(Math.max(10, currentDate.getHours() + 1))
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []
      while (currentDate < endTime) {
        const formatted = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`
        const available = !(docInfo.slots_booked?.[slotDate]?.includes(formatted))

        if (available) {
          timeSlots.push({ datetime: new Date(currentDate), time: formatted })
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      newSlots.push(timeSlots)
    }

    setDocSlots(newSlots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Please log in to book an appointment.')
      return navigate('/login')
    }

    const date = docSlots[slotIndex][0].datetime
    const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  if (!docInfo) return null

  return (
    <div className="p-6 sm:p-10 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      {/* Doctor Card */}
      <div className="bg-white rounded-3xl shadow-md border border-indigo-100 flex flex-col md:flex-row gap-6 p-6">
        <img src={docInfo.image} alt="Doctor" className="w-full md:w-60 h-60 object-cover rounded-2xl" />

        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} className="w-5" alt="verified" />
            </h2>
            <p className="text-gray-600">{docInfo.degree} • {docInfo.speciality}</p>
            <p className="text-sm text-gray-500 mt-1">{docInfo.experience}</p>
          </div>

          <div className="mt-4">
            <h4 className="text-gray-700 font-medium mb-1 flex items-center gap-1">
              About
              <img src={assets.info_icon} className="w-4" alt="info" />
            </h4>
            <p className="text-sm text-gray-600 leading-relaxed">{docInfo.about}</p>
          </div>

          <p className="mt-4 text-indigo-700 font-medium">
            Appointment Fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-indigo-700 mb-3">📅 Choose a Time Slot</h3>

        {/* Day Picker */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {docSlots.map((daySlots, i) => (
            <div
              key={i}
              onClick={() => setSlotIndex(i)}
              className={`min-w-[70px] text-center px-4 py-3 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200
                ${slotIndex === i
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-indigo-100'}`}
            >
              <p>{daysOfWeek[daySlots[0]?.datetime.getDay()]}</p>
              <p>{daySlots[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        <div className="mt-5 flex gap-3 overflow-x-auto pb-2">
          {docSlots[slotIndex]?.map((slot, idx) => (
            <button
              key={idx}
              onClick={() => setSlotTime(slot.time)}
              className={`px-5 py-2 text-sm rounded-full whitespace-nowrap transition-all font-medium ${
                slot.time === slotTime
                  ? 'bg-indigo-600 text-white shadow'
                  : 'border border-gray-300 text-gray-700 hover:bg-indigo-50'
              }`}
            >
              {slot.time}
            </button>
          ))}
        </div>

        {/* Book Button */}
        <button
          onClick={bookAppointment}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-full transition-all"
        >
          Book Appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-14">
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    </div>
  )
}

export default Appointments
