import React from "react";
import { Link } from "react-router-dom";
import acc_icon from "../pics/acc_icon.png";
import file from "../pics/file.png";

function Dealer_dashboard() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-white">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <img src={file} alt="Logo" className="w-12 h-12" />
          <div className="flex flex-col items-start">
            <h1 className="text-3xl leading-none">East Coast Railway</h1>
            <h2 className="text-xl leading-none">Bhubaneswar</h2>
          </div>
        </div>

        <a
          href="/"
          className="text-lg rounded-lg border-white border-2 px-4 py-2"
        >
          Log Out
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center mt-8">
        <h2 className="text-2xl mb-8 text-[#2664eb] font-semibold mb-20">
          Welcome To Dealer Dashboard
        </h2>
        <div className="flex flex-wrap justify-center items-center space-x-8">
          {/* Profile Card */}
          <div className="bg-[#2664eb] relative p-4 pb-8 px-16 rounded-lg text-center ">
            <img
              className="w-32 h-32 bg-white rounded-full mx-auto mb-2"
              src={acc_icon}
              alt="Profile"
            />

            <p className="text-xl">Name: Iftikar Bhat</p>
            <p className="text-xl">Emp_Id: 83538027</p>
            <button className="">
            <Link
              to="/ProfilePage"
              className=" px-4 py-2 absolute right-20 bottom-2 bg-blue-100 text-blue-700 font-semibold rounded-lg"
            >
              Learn more
            </Link>
            </button>
            
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Link to="/acdcreport">
              <button className="w-48 h-32 bg-blue-600 rounded-lg hover:scale-90 duration-500 hover:bg-blue-500">
                Activate/Deactivate CUG
              </button>
            </Link>
            <Link to="/addnewcug">
              <button className="w-48 h-32 bg-blue-600 rounded-lg hover:scale-90 duration-500 hover:bg-blue-500">
                Add New CUG
              </button>
            </Link>
            <Link to="/allocreport">
              <button className="w-48 h-32 bg-blue-600 rounded-lg hover:scale-90 duration-500 hover:bg-blue-500">
                Allocation-wise Report
              </button>
            </Link>
            <Link to="/planreport">
              <button className="w-48 h-32 bg-blue-600 rounded-lg hover:scale-90 duration-500 hover:bg-blue-500">
                Plan-Wise Billing Report
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-700 text-white py-4 mt-auto w-full">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo and Contact Info */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src={file} alt="Logo" className="w-12 h-12" />
              <div className="text-center md:text-left">
                <h3 className="text-lg font-bold">East Coast Railway</h3>
                <p className="text-sm">Bhubaneswar, Odisha</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4">
              <ul className="flex flex-col md:flex-row md:space-x-4">
                <li>
                  <Link to="/privacypolicy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/termsofservice" className="hover:underline">
                    Terms Of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contactform" className="hover:underline">
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>

            {/* Copyright Notice */}
            <div className="text-center md:text-right">
              <p className="text-sm">
                &copy; 2024 East Coast Railway. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dealer_dashboard;
