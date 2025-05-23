import React, { useContext } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, Phone, Hospital } from 'lucide-react';
import FindDirectionButton from '../components/FindDirectionButton'; // ✅ Import

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePageHospital = () => {
  const navigate = useNavigate();
  const { hospitals } = useContext(AppContext);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div id="hospitals" className="py-16 px-4 bg-gradient-to-br from-blue-50 to-white text-gray-800">
      <h1 className="text-3xl font-bold text-blue-800 text-center mb-4">🏥 Featured Hospitals</h1>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto text-sm">
        Explore top-rated hospitals near you and schedule appointments with trusted doctors.
      </p>

      <Slider {...settings}>
        {hospitals.slice(0, 6).map((item, index) => (
          <div key={index} className="px-3">
            <div className="h-[440px] backdrop-blur-md bg-white/80 border border-blue-100 rounded-3xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out flex flex-col">
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover rounded-t-3xl"
              />
              <div className="p-5 space-y-2 flex-1">
                <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2">
                  <Hospital className="w-5 h-5 text-blue-500" />
                  {item.name} Hospital
                </h2>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {item.address}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-400" />
                  {item.contact}
                </p>
              </div>
              <div className="px-5 pb-5 space-y-2">
                <button
                  onClick={() => navigate(`/hospital/${item.name}`)}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:from-blue-600 hover:to-indigo-600 transition flex items-center justify-center gap-2"
                >
                  🩺 Find Doctor
                </button>

                {/* ✅ New Find Direction Button */}
                <FindDirectionButton destination={item.address} />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/hospital')}
          className="text-blue-600 font-medium hover:text-blue-800 transition duration-200"
        >
          ➕ More Hospitals
        </button>
      </div>
    </div>
  );
};

export default HomePageHospital;