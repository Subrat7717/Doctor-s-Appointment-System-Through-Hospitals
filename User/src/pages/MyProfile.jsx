import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { CalendarDays, Mail, MapPin, Phone, User, BadgeCheck, Pencil } from 'lucide-react'

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)

  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      if (image) formData.append('image', image)

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token }
      })

      if (data.success) {
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return userData ? (
    <div className="max-w-4xl mx-auto mt-12 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl p-6 shadow-md">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            {isEdit ? (
              <label htmlFor="image" className="cursor-pointer group">
                <img
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt="Profile"
                />
                {!image && (
                  <img
                    className="w-6 absolute bottom-1 right-1 opacity-80 group-hover:opacity-100"
                    src={assets.upload_icon}
                    alt=""
                  />
                )}
                <input type="file" id="image" hidden onChange={(e) => setImage(e.target.files[0])} />
              </label>
            ) : (
              <img
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                src={userData.image}
                alt="Profile"
              />
            )}
          </div>
          <div className="flex-1">
            {isEdit ? (
              <input
                className="text-2xl font-semibold text-white bg-transparent border-b border-white outline-none"
                value={userData.name}
                onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <h1 className="text-3xl font-bold flex items-center gap-2">
                {userData.name}
                <BadgeCheck className="w-5 h-5 text-green-300" />
              </h1>
            )}
            <p className="text-white text-sm flex items-center gap-2 mt-2">
              <Mail className="w-4 h-4" /> {userData.email}
            </p>
          </div>
          <button
            onClick={() => (isEdit ? updateUserProfileData() : setIsEdit(true))}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-indigo-600 hover:bg-indigo-100 transition"
          >
            <Pencil className="w-4 h-4" />
            {isEdit ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Contact Info Card */}
        <div className="bg-gradient-to-r from-indigo-300 to-indigo-300 text-white rounded-xl p-6 shadow-md">
          <h3 className="text-gray-700 font-semibold text-lg">Contact Information</h3>
          <div className="text-sm space-y-2 text-gray-700">
            <div className="flex gap-2 items-center">
              <Phone className="w-4 h-4 text-indigo-600" />
              {isEdit ? (
                <input
                  className="bg-gray-50 px-2 py-1 rounded w-full"
                  value={userData.phone}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                />
              ) : (
                <span>{userData.phone}</span>
              )}
            </div>
            <div className="flex gap-2 items-start">
              <MapPin className="w-4 h-4 mt-1 text-indigo-600" />
              {isEdit ? (
                <div className="space-y-1 w-full">
                  <input
                    className="bg-gray-50 px-2 py-1 rounded w-full"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value }
                      }))
                    }
                  />
                  <input
                    className="bg-gray-50 px-2 py-1 rounded w-full"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value }
                      }))
                    }
                  />
                </div>
              ) : (
                <span>
                  {userData.address.line1}
                  <br />
                  {userData.address.line2}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Basic Info Card */}
        <div className=" bg-indigo-300 rounded-xl shadow p-5 space-y-4">
          <h3 className="text-gray-700 font-semibold text-lg">Basic Information</h3>
          <div className="text-sm space-y-3 text-gray-700">
            <div className="flex gap-2 items-center">
              <User className="w-4 h-4 text-indigo-600" />
              {isEdit ? (
                <select
                  className="bg-gray-50 px-2 py-1 rounded"
                  value={userData.gender}
                  onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                >
                  <option value="Not Selected">Not Selected</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              ) : (
                <span>{userData.gender}</span>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <CalendarDays className="w-4 h-4 text-indigo-600" />
              {isEdit ? (
                <input
                  type="date"
                  className="bg-gray-50 px-2 py-1 rounded"
                  value={userData.dob}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                />
              ) : (
                <span>{new Date(userData.dob).toLocaleDateString()}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default MyProfile
