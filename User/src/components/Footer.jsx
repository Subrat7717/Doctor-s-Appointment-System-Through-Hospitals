import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { Mail, PhoneCall, Home, Info, ShieldCheck, Contact } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-t-3xl shadow-inner px-6 md:px-20 pt-20 pb-10 text-sm text-gray-700">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
        
        
        <div>
          <img className="mb-4 w-36" src={assets.logo} alt="Logo" />
          <p className="leading-6">
            A doctor appointment scheduling platform that simplifies booking, enhances patient experience,
            and connects healthcare providers with ease.
          </p>
        </div>

        
        <div>
          <p className="text-xl font-semibold text-blue-800 mb-4">🏢 Company</p>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center gap-2">
                <Home size={16} /> Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="flex items-center gap-2">
                <Info size={16} /> About us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="flex items-center gap-2">
                <Contact size={16} /> Contact us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="flex items-center gap-2">
                <ShieldCheck size={16} /> Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        
        <div>
          <p className="text-xl font-semibold text-blue-800 mb-4">📞 Get in Touch</p>
          <ul className="space-y-2">
            <li className="flex items-center gap-2"><PhoneCall size={16} /> ‪+91 9556757717‬</li>
            <li className="flex items-center gap-2"><Mail size={16} /> easydoc@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr className="my-4" />

      <p className="text-center text-sm text-gray-500">
        © 2025 EasyDoc — All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;