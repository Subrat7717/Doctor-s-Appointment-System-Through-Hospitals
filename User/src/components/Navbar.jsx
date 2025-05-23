import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { Menu, X, User, CalendarCheck, LogOut } from 'lucide-react'
import { assets } from '../assets/assets'

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    navigate('/')
  }

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Hospitals', path: '/hospital' },
    { name: 'All Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <img
          src={assets.logo}
          alt="Logo"
          className="w-40 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `relative group px-2 py-1 ${
                  isActive ? 'text-primary' : ''
                }`
              }
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
            </NavLink>
          ))}
        </nav>

        {/* Desktop - User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {token && userData ? (
            <div
              className="relative cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={userData.image}
                alt="User"
                className="w-9 h-9 rounded-full border-2 border-primary"
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg text-sm text-gray-700 py-2 z-50">
                  <button
                    onClick={() => navigate('/my-profile')}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <User size={16} /> My Profile
                  </button>
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                  >
                    <CalendarCheck size={16} /> My Appointments
                  </button>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary/90 transition"
            >
              Create Account
            </button>
          )}
        </div>

        {/* Mobile - Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(true)}>
          <Menu className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <img src={assets.logo} alt="Logo" className="w-36" />
          <button onClick={() => setMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col items-start px-6 py-4 gap-4 text-base font-medium">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="w-full py-2 border-b border-gray-200"
            >
              {link.name}
            </NavLink>
          ))}

          {token && userData ? (
            <>
              <button
                onClick={() => {
                  navigate('/my-profile')
                  setMenuOpen(false)
                }}
                className="py-2 border-b w-full text-left"
              >
                My Profile
              </button>
              <button
                onClick={() => {
                  navigate('/my-appointments')
                  setMenuOpen(false)
                }}
                className="py-2 border-b w-full text-left"
              >
                My Appointments
              </button>
              <button
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                className="py-2 text-red-500 w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate('/login')
                setMenuOpen(false)
              }}
              className="bg-primary text-white w-full text-center py-2 rounded mt-2"
            >
              Create Account
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
