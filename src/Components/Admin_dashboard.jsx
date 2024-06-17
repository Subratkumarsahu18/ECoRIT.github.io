import React, { useState } from "react"; // Import useState
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AllocationWiseReport from "./Admin_Inner_Components/Allocation_Wise_Report";
import PlanWiseBillingReport from "./Admin_Inner_Components/PlanWiseBillingReport";
import ViewPlanReport from "./Admin_Inner_Components/Inner_Plan_Components/ViewPlanReport";
import Activate_Deactivate_CUG from "./Admin_Inner_Components/Activate_Deactivate_CUG";
import Create_dealer from "./Admin_Inner_Components/Create_dealer";
import Add_new_CUG from "./Admin_Inner_Components/Add_new_CUG";
import CUG_Status_Report from "./Admin_Inner_Components/CUG_Status_Report";
import Upload_CUG_Bill from "./Admin_Inner_Components/Upload_CUG_Bill";
import Upload_new_CUG_Number from "./Admin_Inner_Components/Upload_new_CUG_Number";
import Allotment_History from "./Admin_Inner_Components/Allotment_History";
import PrivacyPolicy from './PrivacyPolicy'; // Import the PrivacyPolicy component
import file from "../pics/file.png";
import statisticsImage from "../pics/image.png"; // Ensure the path is correct

function Admin_dashboard() {
  const [activeLink, setActiveLink] = useState('createdealer');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-white">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex flex-wrap justify-between items-center px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <img src={file} alt="Logo" className="w-12 h-12" />
          <div className="flex flex-col items-start">
            <h1 className="text-3xl leading-none">East Coast Railway</h1>
            <h2 className="text-xl leading-none">Bhubaneswar</h2>
          </div>
        </div>
        <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-3">
          {/* <a href="#" className="text-white">Allotment</a>
          <a href="#" className="text-white">Deactivate CUG</a> */}
          <a href="#" className="text-white">Operator</a>
          <div className="relative -mt-2" onMouseOver={() => { setDropdownOpen(true); }} onMouseLeave={() => { setDropdownOpen(false); }}>
            <span className=" hover:cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            </span>
            {dropdownOpen && (
              <div className="absolute right-0 w-48 bg-white text-black rounded-lg shadow-lg py-2">
              <Link to="/ProfilePage" className="block px-4 py-2 hover:bg-gray-200">My Profile</Link>
                <a href="/" className="block px-4 py-2 hover:bg-gray-200">Log Out</a>
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-2xl -mb-4 text-[#2664eb] font-semibold text-center mt-10">Welcome To Admin Dashboard</h2>
      {/* Main Content */}
      <div className="p-4 md:p-8 flex lg:flex-row flex-col ">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/6 flex flex-col space-y-4 mb-4 md:mb-0">
          <NavLinkButton to="createdealer" activeLink={activeLink} onClick={handleNavLinkClick}>
            Create Dealer
          </NavLinkButton>
          <NavLinkButton to="activecug" activeLink={activeLink} onClick={handleNavLinkClick}>
            CUG DETAILS (Activate/Deactivate)
          </NavLinkButton>
          <NavLinkButton to="addcug" activeLink={activeLink} onClick={handleNavLinkClick}>
            Add New CUG
          </NavLinkButton>
          <NavLinkButton to="cugstatusreport" activeLink={activeLink} onClick={handleNavLinkClick}>
            CUG Status Report
          </NavLinkButton>
          <NavLinkButton to="allotmenthistory" activeLink={activeLink} onClick={handleNavLinkClick}>
            Allotment History
          </NavLinkButton>
          <NavLinkButton to="allocreport" activeLink={activeLink} onClick={handleNavLinkClick}>
            Allocation-wise Report
          </NavLinkButton>
          <NavLinkButton to="planreport" activeLink={activeLink} onClick={handleNavLinkClick}>
            Plan-wise Report Billing
          </NavLinkButton>
          <NavLinkButton to="uploadcugbill" activeLink={activeLink} onClick={handleNavLinkClick}>
            Upload CUG Bill
          </NavLinkButton>
          <NavLinkButton to="uploadnewnumber" activeLink={activeLink} onClick={handleNavLinkClick}>
            Upload New CUG No
          </NavLinkButton>
        </div>
        {/* Right Content */}
        <div className="w-full md:ml-4">
          {/* Statistics Image */}
          <Routes>
            <Route path="/" element={<img src={statisticsImage} alt="Statistics" className="w-full h-auto" />} />
            <Route path="activecug" element={<Activate_Deactivate_CUG />} />
            <Route path="addcug" element={<Add_new_CUG />} />
            <Route path="allocreport" element={<AllocationWiseReport />} />
            <Route path="allotmenthistory" element={<Allotment_History />} />
            <Route path="createdealer" element={<Create_dealer />} />
            <Route path="cugstatusreport" element={<CUG_Status_Report />} />
            <Route path="planreport" element={<PlanWiseBillingReport />} />
            <Route path="uploadcugbill" element={<Upload_CUG_Bill />} />
            <Route path="uploadnewnumber" element={<Upload_new_CUG_Number />} />
          </Routes>
        </div>
      </div>
      {/* Footer */}
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
              <li><Link to="/privacypolicy" className="hover:underline">Privacy Policy</Link></li> 
              <li><Link to="/TermsOfService" className="hover:underline">Terms Of Service</Link></li> 
              <li><Link to="/ContactForm" className="hover:underline">Contact Form</Link></li> 
            </ul>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-right">
            <p className="text-sm">&copy; 2024 East Coast Railway. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const NavLinkButton = ({ to, activeLink, onClick, children }) => {
  const isActive = activeLink === to;

  return (
    <Link to={to} onClick={() => onClick(to)}>
      <button className={`w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg ${isActive ? 'bg-cyan-500' : ''}`}>
        {children}
      </button>
    </Link>
  );
};

export default Admin_dashboard;
