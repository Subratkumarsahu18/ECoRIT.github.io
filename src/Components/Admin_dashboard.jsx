import React, { useState } from "react";
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
import PrivacyPolicy from './PrivacyPolicy';
import file from "../pics/file.png";
import statisticsImage from "../pics/image.png";
import Header from './Header';
import Footer from './Footer';

function Admin_dashboard() {
  const [activeLink, setActiveLink] = useState('createdealer');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-white">
      <Header />
      <h2 className="text-2xl -mb-4 text-[#2664eb] font-semibold text-center mt-10">Welcome To Admin Dashboard</h2>
      <div className="p-4 md:p-8 flex lg:flex-row flex-col">
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
        <div className="w-full md:ml-4">
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

export default Admin_dashboard;
