import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import file from "../pics/file.png";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 w-full bg-blue-700 py-4 flex flex-wrap justify-between items-center px-4 md:px-8">
      <div className="flex items-center space-x-2">
        <Link to="/Admin_dashboard">
          <img src={file} alt="Logo" className="w-12 h-12" />
        </Link>
        <div className="flex flex-col items-start">
          <Link to="/Admin_dashboard">
            <h1 className="text-3xl text-white leading-none">East Coast Railway</h1>
            <h2 className="text-xl text-white leading-none">Bhubaneswar</h2>
          </Link>
        </div>
      </div>
      <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0"> {/* Adjusted margin top for mobile */}
        <Link to="/OperatorPage" className="text-white hover:underline">Operator</Link>
        <div className="relative">
          <span className="hover:cursor-pointer" onMouseOver={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6" // Adjusted size for mobile
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </span>
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white text-black rounded-lg shadow-lg py-2">
              <Link to="/ProfilePage" className="block px-4 py-2 hover:bg-gray-200">My Profile</Link>
              <a href="/" className="block px-4 py-2 hover:bg-gray-200">Log Out</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
