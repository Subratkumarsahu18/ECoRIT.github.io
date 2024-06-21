import React, { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import acc_icon from "../pics/acc_icon.png";
import file from "../pics/file.png";
import Header from './Header';
import Footer from './Footer';
import Add_New_CUG from "./Dealer_Inner_Components/Add_New_Cug";
import Activate_Deactivate_New_CUG from "./Dealer_Inner_Components/Activate_Deactivate_New_CUG";
import AllocationWiseReport from "./Admin_Inner_Components/Allocation_Wise_Report";
import PlanWiseBillingReport from "./Admin_Inner_Components/PlanWiseBillingReport";

function Dealer_dashboard() {
  const [activeLink, setActiveLink] = useState('acdcreport');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-white">
      <Header />

      <div className="p-4 md:p-8 flex lg:flex-row flex-col">
        <div className="w-full md:w-1/6 flex flex-col space-y-4 mb-4 md:mb-0">
          <NavLinkButton to="acdcreport" activeLink={activeLink} onClick={handleNavLinkClick}>
            Activate/Deactivate CUG
          </NavLinkButton>
          <NavLinkButton to="addnewcug" activeLink={activeLink} onClick={handleNavLinkClick}>
            Add New CUG
          </NavLinkButton>
          <NavLinkButton to="allocreport" activeLink={activeLink} onClick={handleNavLinkClick}>
            Allocation-wise Report
          </NavLinkButton>
          <NavLinkButton to="planreport" activeLink={activeLink} onClick={handleNavLinkClick}>
            Plan-wise Billing Report
          </NavLinkButton>
        </div>
        <div className="w-full md:ml-4">
          <Routes>
            <Route path="acdcreport" element={<Activate_Deactivate_New_CUG />} />
            <Route path="addnewcug" element={<Add_New_CUG />} />
            <Route path="allocreport" element={<AllocationWiseReport />} />
            <Route path="planreport" element={<PlanWiseBillingReport />} />
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
      <button className={`w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg ${isActive ? 'bg-cyan-500' : ''}`}>
        {children}
      </button>
    </Link>
  );
};

export default Dealer_dashboard;
