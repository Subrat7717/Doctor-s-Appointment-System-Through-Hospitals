import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Hospital, Stethoscope } from 'lucide-react'

const RelatedDoctors = ({ speciality, docId }) => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)
  const [relDoc, setRelDoc] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDoc(doctorsData)
    }
  }, [doctors, speciality, docId])

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-indigo-700 text-center">Related Doctors</h2>
      <p className="text-sm text-gray-600 text-center max-w-xl mx-auto mt-1">
        Simply browse through our curated list of trusted doctors in the same specialty.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mt-10 px-4">
        {relDoc.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointments/${item._id}`)
              window.scrollTo(0, 0)
            }}
            className="cursor-pointer group bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-transform transform hover:-translate-y-1"
          >
            <img src={item.image} alt="Doctor" className="rounded-t-2xl h-48 w-full object-cover bg-indigo-100" />

            <div className="p-4 space-y-2">
              <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-600' : 'text-gray-400'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                <span>{item.available ? 'Available' : 'Not Available'}</span>
              </div>

              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Hospital className="w-4 h-4 text-indigo-500" />
                <span>{item.hospital} Hospital</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Stethoscope className="w-4 h-4 text-indigo-500" />
                <span>{item.speciality}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RelatedDoctors
