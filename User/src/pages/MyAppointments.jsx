import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token, getDoctorsData } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const formatDate = (dateStr) => {
        const [day, month, year] = dateStr.split('_')
        return `${day} ${months[Number(month)]} ${year}`
    }

    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } })
                    if (data.success) {
                        getUserAppointments()
                    }
                } catch (error) {
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) getUserAppointments()
    }, [token])

    return (
        <div className='py-12 px-4'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-6 border-b pb-3'>🗓️ My Appointments</h2>
            <div className='space-y-6'>
                {appointments.map((item, index) => (
                    <div key={index} className='relative bg-white border rounded-xl p-6 shadow-md hover:shadow-lg transition'>
                        <div className='absolute left-[-12px] top-6 h-6 w-6 bg-blue-100 border-2 border-blue-500 rounded-full'></div>

                        <div className='flex items-start gap-5 sm:flex-row flex-col'>
                            <img src={item.docData.image} alt="Doctor" className='w-24 h-24 object-cover rounded-lg border bg-blue-50' />

                            <div className='flex-1'>
                                <h3 className='text-lg font-bold text-gray-900'>{item.docData.name}</h3>
                                <p className='text-blue-600 font-medium'>{item.docData.speciality}</p>

                                <div className='mt-2 text-sm text-gray-600'>
                                    <p><span className='font-semibold'>📍 Address:</span> {item.docData.address.line1}, {item.docData.address.line2}</p>
                                    <p><span className='font-semibold'>🕒 Date & Time:</span> {formatDate(item.slotDate)} at {item.slotTime}</p>
                                </div>

                                <div className='mt-4 flex flex-wrap gap-3'>
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                        <button onClick={() => setPayment(item._id)} className='px-4 py-1.5 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition'>Pay Online</button>
                                    )}
                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                        <button onClick={() => appointmentRazorpay(item._id)} className='border border-gray-300 px-4 py-1.5 bg-white rounded-lg'>
                                            <img className='h-6' src={assets.razorpay_logo} alt="Razorpay" />
                                        </button>
                                    )}
                                    {!item.cancelled && item.payment && !item.isCompleted && (
                                        <span className='px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm'>✅ Paid</span>
                                    )}
                                    {item.isCompleted && (
                                        <span className='px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm'>✔️ Completed</span>
                                    )}
                                    {!item.cancelled && !item.isCompleted && (
                                        <button onClick={() => cancelAppointment(item._id)} className='px-4 py-1.5 border border-red-500 text-red-600 rounded-lg hover:bg-red-50'>Cancel</button>
                                    )}
                                    {item.cancelled && !item.isCompleted && (
                                        <span className='px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm'>❌ Cancelled</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
