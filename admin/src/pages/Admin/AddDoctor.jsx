import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {
  User, Mail, Lock, Calendar,
  IndianRupee, GraduationCap, Hospital,
  MapPin, FileText, Stethoscope, ImagePlus
} from 'lucide-react'

const AddDoctor = () => {

  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [hospital, setHospital] = useState('Sum')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl } = useContext(AppContext)
  const { aToken, hospitals } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    try {
      if (!docImg) return toast.error('Image Not Selected')

      const formData = new FormData();
      formData.append('image', docImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('experience', experience)
      formData.append('fees', Number(fees))
      formData.append('about', about)
      formData.append('speciality', speciality)
      formData.append('degree', degree)
      formData.append('hospital', hospital)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setHospital('')
        setAbout('')
        setFees('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-8 w-full'>
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img
              className='w-16 bg-gray-100 rounded-full cursor-pointer'
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>

          <input
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
                if (!validImageTypes.includes(file.type)) {
                  alert('Please upload a valid image file (JPEG, PNG, WEBP)');
                  return;
                }

                setDocImg(file);
              }
            }}
            type="file"
            id="doc-img"
            hidden
            accept="image/*"
          />

          <div className='flex items-center gap-2'>
            <ImagePlus size={20} />
            <p>Upload doctor <br /> picture</p>
          </div>
        </div>



        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><User size={16} />Your name</label>
              <input onChange={e => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Doctor Name' required pattern="^(Dr\.?\s)?[A-Za-z\s]{2,50}$" title="Only letters allowed. Format: 'Dr. John Doe' or 'John Doe'. Numbers are not allowed." />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><Mail size={16} />Doctor Email</label>
              <input onChange={e => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><Lock size={16} />Set Password</label>
              <input onChange={e => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><Calendar size={16} />Experience</label>
              <select onChange={e => setExperience(e.target.value)} value={experience} className='border rounded px-2 py-2'>
                {[1, 2, 3, 4, 5, 6, 8, 9, 10].map(year => (
                  <option key={year} value={`${year} Year`}>{year} Year{year > 1 && 's'}</option>
                ))}
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><IndianRupee size={16} />Fees</label>
              <input onChange={e => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='Doctor fees' required min="30" title="Fees must be a positive number" />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><Stethoscope size={16} />Speciality</label>
              <select onChange={e => setSpeciality(e.target.value)} value={speciality} className='border rounded px-2 py-2'>
                {["General physician", "Gynecologist", "Dermatologist", "Pediatricians", "Neurologist", "Gastroenterologist"].map((s, i) =>
                  <option key={i} value={s}>{s}</option>
                )}
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><GraduationCap size={16} />Degree</label>
              <input onChange={e => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Degree' required pattern="^[A-Za-z.,\s]{2,50}$" title="Only letters, commas, periods, and spaces allowed (e.g., MBBS, MD, M.D., PhD,D.M.Sc-Med)" />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><Hospital size={16} />Hospital</label>
              <select onChange={e => setHospital(e.target.value)} value={hospital} className='border rounded px-2 py-2'>
                {
                  hospitals && hospitals.length > 0 ? (
                    hospitals.map((item, idx) => <option key={idx} value={item.name}>{item.name} Hospital</option>)
                  ) : null
                }
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label className='flex items-center gap-2'><MapPin size={16} />Address</label>
              <input onChange={e => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input onChange={e => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
            </div>

          </div>

        </div>

        <div>
          <label className='mt-4 mb-2 flex items-center gap-2'><FileText size={16} />About Doctor</label>
          <textarea onChange={e => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' rows={5} placeholder='write about doctor'></textarea>
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
