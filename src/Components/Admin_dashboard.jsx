import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import AllocationWiseReport from "./Admin_Inner_Components/Allocation_Wise_Report";
import PlanWiseBillingReport from "./Admin_Inner_Components/PlanWiseBillingReport";
import Activate_Deactivate_CUG from "./Admin_Inner_Components/Activate_Deactivate_CUG";
import Create_dealer from "./Admin_Inner_Components/Create_dealer";
import Add_new_CUG from "./Admin_Inner_Components/Add_new_CUG";
import CUG_Status_Report from "./Admin_Inner_Components/CUG_Status_Report";
import Upload_CUG_Details from "./Admin_Inner_Components/Upload_CUG_Details";
import Upload_Plan_Details from "./Admin_Inner_Components/Upload_Plan_Details";
import Allotment_History from "./Admin_Inner_Components/Allotment_History";
import Department_Billing_Report from "./Admin_Inner_Components/Department_Billing_Report";
import Update_Plan_Details from "./Admin_Inner_Components/Update_Plan_Details";
import Clear_Details from "./Admin_Inner_Components/Clear_Details";


import Header from "./Header";
import Footer from "./Footer";
import { toast, Toaster } from 'react-hot-toast';
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import ContactForm from "./ContactForm";
import LandingPage from "./Landingpage";

function Admin_dashboard() {
  const [activeLink, setActiveLink] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('user') == 0) {
      navigate('landing')
      setLoading(false);
    } else {
      toast.error('Action not allowed');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    }
    setLoading(false);
  }, []);

  if (loading) return <>Loading ...</>;

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-white">
      <Toaster/>
      <Header />
      <h2 className="text-2xl -mb-4 text-[#2664eb] font-semibold text-center mt-10">
        Welcome To Admin Dashboard
      </h2>
      <div className="p-4 md:p-8 flex lg:flex-row flex-col">
        <div className="relative flex flex-col mb-4 md:mb-0 lg:w-1/6">
          <button
            className="lg:hidden bg-[#334A7F] text-white p-2 rounded-md mb-4"
            onClick={toggleDropdown}
          >
            ☰ Menu
          </button>
          <div
            className={`${
              dropdownOpen ? "block" : "hidden"
            } lg:block lg:relative bg-[#334A7F] p-4 rounded-md lg:rounded-none lg:bg-transparent overflow-y-auto max-h-96 lg:max-h-[calc(100vh-80px)] w-full`}
          >
            <NavLinkButton
              to="createdealer"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Create Dealer
            </NavLinkButton>

            <NavLinkButton
              to="addcug"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Activate New CUG
            </NavLinkButton>

            <NavLinkButton
              to="activecug"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              View/Deactivate CUG 
            </NavLinkButton>
            
            <NavLinkButton
              to="cugstatusreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              CUG Status Report
            </NavLinkButton>
            <NavLinkButton
              to="allotmenthistory"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Allotment History
            </NavLinkButton>
            <NavLinkButton
              to="allocreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Allocation Report
            </NavLinkButton>
            <NavLinkButton
              to="planreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Plan-wise Report 
            </NavLinkButton>

            <NavLinkButton
              to="departmentbillingreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Department Report
            </NavLinkButton>

            <NavLinkButton
              to="uploadcugdetails"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Upload CUG Details
            </NavLinkButton>
            <NavLinkButton
              to="uploadplandetails"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Upload Plan Details
            </NavLinkButton>
            {/* <NavLinkButton
              to="demo"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Demo
            </NavLinkButton> */}
            
            <NavLinkButton
              to="updateplandetails"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Update Plan Details
            </NavLinkButton>
            <NavLinkButton
              to="cleardetails"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Clear Details
            </NavLinkButton>
          </div>
        </div>
        <div className="w-full lg:ml-4">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/Admin_dashboard/landing" />}
            />
            <Route path="activecug" element={<Activate_Deactivate_CUG />} />
            <Route path="landing" element={<LandingPage />} />
            <Route path="addcug" element={<Add_new_CUG />} />
            <Route path="allocreport" element={<AllocationWiseReport />} />
            <Route path="allotmenthistory" element={<Allotment_History />} />
            <Route path="createdealer" element={<Create_dealer />} />
            <Route path="cugstatusreport" element={<CUG_Status_Report />} />
            <Route path="planreport" element={<PlanWiseBillingReport />} />
            <Route path="uploadcugdetails" element={<Upload_CUG_Details />} />
            <Route path="uploadplandetails" element={<Upload_Plan_Details />} />
            <Route path="departmentbillingreport" element={<Department_Billing_Report />} />
            <Route path="updateplandetails" element={<Update_Plan_Details />} />
            <Route path="cleardetails" element={<Clear_Details />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="contact" element={<ContactForm />} />
            {/* <Route path="updateplandetails" element={<Update_Plan_Details />} />
            <Route path="updateplandetails" element={<Update_Plan_Details />} /> */}
            
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const NavLinkButton = ({ to, activeLink, onClick, children }) => {
  const isActive = activeLink === to;

  return (
    <Link to={to} onClick={() => onClick(to)}>
      <button
        className={`w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg ${
          isActive ? "bg-cyan-500" : ""
        } mb-2`}
      >
        {children}
      </button>
    </Link>
  );
};

export default Admin_dashboard;
