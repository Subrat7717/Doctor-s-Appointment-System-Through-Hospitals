import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        about: profileData.about,
        available: profileData.available,
      };

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
        headers: { dToken },
      });

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <div className="max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-6">
          {/* Profile Image */}
          <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
            <img
              src={profileData.image}
              alt="Doctor"
              className="w-full rounded-xl object-cover aspect-square bg-primary/10"
            />
          </div>

          {/* Profile Details */}
          <div className="bg-white shadow rounded-xl p-6 space-y-4">
            {/* Name, Degree, Speciality */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{profileData.name}</h2>
              <div className="text-gray-600 text-sm mt-1">
                {profileData.degree} - {profileData.speciality}
              </div>
              <div className="text-xs inline-block mt-1 px-2 py-0.5 border border-gray-300 rounded-full">
                {profileData.experience}
              </div>
            </div>

            {/* About */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">About</h3>
              {isEdit ? (
                <textarea
                  rows={5}
                  value={profileData.about}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, about: e.target.value }))}
                  className="w-full p-2 border rounded outline-primary text-sm"
                />
              ) : (
                <p className="text-sm text-gray-600">{profileData.about}</p>
              )}
            </div>

            {/* Fees */}
            <div className="text-sm">
              <span className="font-medium text-gray-700">Appointment Fee:</span>{' '}
              {isEdit ? (
                <input
                  type="number"
                  className="ml-2 border px-2 py-1 rounded text-sm outline-primary w-24"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                />
              ) : (
                <span className="text-gray-800">{currency} {profileData.fees}</span>
              )}
            </div>

            {/* Address */}
            <div className="text-sm">
              <h4 className="font-medium text-gray-700 mb-1">Address</h4>
              {isEdit ? (
                <>
                  <input
                    type="text"
                    placeholder="Line 1"
                    className="w-full mb-2 border rounded p-2 text-sm outline-primary"
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                  <input
                    type="text"
                    placeholder="Line 2"
                    className="w-full border rounded p-2 text-sm outline-primary"
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                </>
              ) : (
                <p className="text-gray-600">
                  {profileData.address.line1}
                  <br />
                  {profileData.address.line2}
                </p>
              )}
            </div>

            {/* Availability */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                disabled={!isEdit}
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({ ...prev, available: !prev.available }))
                }
              />
              <label className="text-gray-700">Available</label>
            </div>

            {/* Buttons */}
            <div className="pt-3">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="px-4 py-1.5 text-sm rounded-full bg-primary text-white hover:bg-primary/90 transition"
                >
                  Save Changes
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="px-4 py-1.5 text-sm rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
