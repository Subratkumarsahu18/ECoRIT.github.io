import React from 'react';
import { Link } from 'react-router-dom';
import file from "../pics/file.png";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white py-4 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <img src={file} alt="Logo" className="w-12 h-12" />
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold">East Coast Railway</h3>
            <p className="text-sm">Bhubaneswar, Odisha</p>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row md:space-x-4">
            <li><Link to="privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="terms" className="hover:underline">Terms Of Service</Link></li>
            <li><Link to="contact" className="hover:underline">Contact Form</Link></li>
          </ul>
        </div>
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="text-sm">&copy; 2024 East Coast Railway. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
