import React, { useEffect, useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

import Activate_Deactivate_New_CUG from "./Dealer_Inner_Components/Activate_Deactivate_New_CUG";
import AllocationWiseReport from "./Admin_Inner_Components/Allocation_Wise_Report";
import PlanWiseBillingReport from "./Admin_Inner_Components/PlanWiseBillingReport";
import {toast,Toaster} from 'react-hot-toast'
import Add_new_CUG from "./Dealer_Inner_Components/Add_New_Cug";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import ContactForm from "./ContactForm";

function Dealer_dashboard() {
  const [activeLink, setActiveLink] = useState("acdcreport");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [loading, setloading] = useState(true);
  const [user, setuser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("user") == 1) {
      setloading(false);
    } else {
      toast.error("action not allowed");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
    setloading(false);
  }, []);
  if (loading) return <>Loading ...</>;

  return (
    <div className="min-h-screen bg-white flex flex-col text-white">
      <Header />

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
              to="acdcreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              View/Deactivate CUG
            </NavLinkButton>
            <NavLinkButton
              to="addnewcug"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Activate New CUG
            </NavLinkButton>
            <NavLinkButton
              to="allocreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Allocation-wise Report
            </NavLinkButton>
            <NavLinkButton
              to="planreport"
              activeLink={activeLink}
              onClick={handleNavLinkClick}
            >
              Plan-wise Billing Report
            </NavLinkButton>
          </div>
        </div>
        <div className="w-full lg:ml-4">
          <Routes>
            <Route
              path="acdcreport"
              element={<Activate_Deactivate_New_CUG />}
            />
            <Route path="addnewcug" element={<Add_new_CUG />} />
            <Route path="allocreport" element={<AllocationWiseReport />} />
            <Route path="planreport" element={<PlanWiseBillingReport />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<TermsOfService />} />
            <Route path="contact" element={<ContactForm />} />
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

export default Dealer_dashboard;
