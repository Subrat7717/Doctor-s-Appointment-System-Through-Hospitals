import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]= useState([])
    const [hospitals,setHospitals]= useState([])
    const [appointments,setAppointments]= useState([])
    const [dashData,setDashData] = useState(false)
    const backendUrl = 'http://localhost:4000';

    const getAllDoctors = async () => {

        try{
            const {data} = await axios.post(backendUrl +'/api/admin/all-doctors',{},{headers: {aToken}})
            if (data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }


    }

    const getAllHospitals = async () => {

        try{
            const {data} = await axios.post(backendUrl +'/api/admin/all-hospitals',{},{headers: {aToken}})
            if (data.success){
                setHospitals(data.hospitals)
                console.log(data.hospitals)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }


    }
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

     // Getting all appointment data from Database using API
     const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

     // Getting Admin Dashboard data from Database using API
     const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(()=>{
        getAllHospitals();
    },[])


    const value = {
        aToken,setAToken,
        backendUrl,doctors,hospitals,
        getAllDoctors,getAllHospitals,changeAvailability,
        appointments,setAppointments,
        getAllAppointments,cancelAppointment,
        dashData,getDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider