import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { User, Hospital, HeartPulse } from "lucide-react";

export default function ParticularHospitalDoctor() {
  const [doctorsByHospital, setDoctorsByHospital] = useState([]);
  const navigate = useNavigate();
  const { backendUrl } = useContext(AppContext);
  const { hospital_name } = useParams();

  const getDoctorsDataByHospitalName = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/user/getAllDoctor/${hospital_name}`
      );
      if (data.success) {
        setDoctorsByHospital(data?.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDoctorsDataByHospitalName();
  }, [hospital_name]);

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white min-h-screen">
      <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
        🏥 Doctors at <span className="text-indigo-500">{hospital_name}</span> Hospital
      </h1>

      {doctorsByHospital.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {doctorsByHospital.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointments/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-white border border-indigo-100 rounded-3xl shadow hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Fixed size image wrapper */}
              <div className="w-full h-52 overflow-hidden rounded-t-3xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3 space-y-1">
                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    item.available ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  {item.available ? "Available" : "Not Available"}
                </div>
                <p className="text-lg text-indigo-800 font-bold flex items-center gap-2">
                  <User className="w-4 h-4 text-indigo-500" />
                  {item.name}
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <Hospital className="w-4 h-4 text-indigo-400" />
                  {item.hospital} Hospital
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <HeartPulse className="w-4 h-4 text-pink-500" />
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No doctors found for <strong>{hospital_name}</strong> hospital.
        </p>
      )}
    </div>
  );
}
