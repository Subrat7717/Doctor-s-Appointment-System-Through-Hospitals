import validator from "validator"
import bcrypt from 'bcrypt'
import { v2 as  cloudinary } from "cloudinary"
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"
import Hospital  from "../models/hospitalModel.js"
import hospitalModel from "../models/hospitalModel.js"



// API For adding doctor
const addDoctor = async (req,res) => {
    try {
        const { name, email, password, speciality, degree, hospital, experience, about, fees, address } = req.body
        const imageFile = req.file

        //checking for all data to add doctor
        if (!name || !email || !password || !speciality || !degree || !hospital || !experience || !about || !fees || !address) {
            return res.status(400).json({ success: false, message: "Missing Details" })
        }
         // validating email format
         if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Please enter a strong password" })
        }

         // hashing user password
         const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
         const hashedPassword = await bcrypt.hash(password, salt)

         // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url
        
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            hospital,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        res.status(200).json({ success: true, message: 'Doctor Added' })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
        
    }

}

//api for add hospital

const addHospital = async (req, res) => {
    try {
        const { name, address, contact } = req.body;
        const imageFile = req.file 
   

        if (!name || !address || !contact ) {
            return res.status(400).json({  message: "All fields are required" });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        const imageUrl = imageUpload.secure_url;

        const newHospital = new Hospital({
            name,
            address,
            contact,
            image : imageUrl
        });

        await newHospital.save();
        res.status(201).json({success : true, message: "Hospital added successfully", hospital: newHospital });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

//api for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

//API to get all doctors list for admin pannel
const allDoctors = async (req,res) => {
    try{

        const doctors = await doctorModel.find ({}).select('-password')
        res.json({success:true,doctors})

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

//API to get all hospital list for admin pannel
const allHospitals = async (req,res) => {
    try{

        const hospitals = await hospitalModel.find ({})
        res.json({success:true,hospitals})

    } catch (error){
        console.log(error)
        res.json({success:false,message:error.message})

    }
}

// Api to get all appointments list 
const appointmentsAdmin = async (req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}

// API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        res.json({ success: true, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
    try {

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})
        const hospitals = await hospitalModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            hospitals: hospitals.length,
            latestAppointments: appointments.reverse().slice()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export {addDoctor,addHospital,loginAdmin,allDoctors, allHospitals,appointmentsAdmin ,appointmentCancel,adminDashboard}