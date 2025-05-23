import express from 'express'
import { doctorListForUser,registerUser,loginUser, getProfile, updateProfile , bookAppointment ,listAppointment,cancelAppointment,paymentRazorpay, verifyRazorpay,getAllHospitalForUser } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';



const userRouter = express.Router();


userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)


userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,listAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment)
userRouter.post('/payment-razorpay',authUser,paymentRazorpay)
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
userRouter.get('/getAllHospital',authUser,getAllHospitalForUser);
userRouter.get('/getAllDoctor/:hospital_name',doctorListForUser);


export default userRouter;