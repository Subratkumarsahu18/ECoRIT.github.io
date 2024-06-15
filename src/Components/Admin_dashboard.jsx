import React, { useState } from "react";
import AllocationWiseReport from "./Admin_Inner_Components/Allocation_Wise_Report";
import PlanWiseBillingReport from "./Admin_Inner_Components/PlanWiseBillingReport";
import file from "../pics/file.png";
import profile from "../pics/profile.png";
//import PlanwisebillingReport2 from './Inner_Components/PlanwisebillingReport2';
import ViewPlanReport from "./Admin_Inner_Components/Inner_Plan_Components/ViewPlanReport";
import { Routes, Route, Link } from "react-router-dom";
import Activate_Deactivate_CUG from "./Admin_Inner_Components/Activate_Deactivate_CUG";
import Create_dealer from "./Admin_Inner_Components/Create_dealer";
import Add_new_CUG from "./Admin_Inner_Components/Add_new_CUG";
import Activate_Deactivate_Report from "./Admin_Inner_Components/Activate_Deactivate_Report";
import CUG_Status_Report from "./Admin_Inner_Components/CUG_Status_Report";
import Upload_CUG_Bill from "./Admin_Inner_Components/Upload_CUG_Bill";
import Upload_new_CUG_Number from "./Admin_Inner_Components/Upload_new_CUG_Number";
import Allotment_History from "./Admin_Inner_Components/Allotment_History";

function Admin_dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[##407cff] flex flex-col text-white">
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
          <a href="#" className="text-white ">
            Allotment
          </a>
          <a href="#" className="text-white">
            Deactivate CUG
          </a>
          <a href="#" className="text-white">
            Upload CUG
          </a>

          <div className="relative -mt-2">
            <svg
              onMouseOver={toggleDropdown}
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

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg py-2">
                <a
                  href="#my-profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  My Profile
                </a>
                <a href="/" className="block px-4 py-2 hover:bg-gray-200">
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <h2 className="text-2xl -mb-4 text-[#2664eb] font-semibold text-center mt-10">
        Welcome To Admin Dashboard
      </h2>
      {/* Main Content */}
      <div className="p-4 md:p-8 flex lg:flex-row flex-col ">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/6 flex flex-col space-y-4 mb-4 md:mb-0">
          <Link to={"createdealer"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Create Dealer
            </button>
          </Link>
          <Link to={"activecug"}>
            <button className="w-full h-20 bg-[#334A7F]  hover:scale-90 duration-500 rounded-lg">
              CUG DETAILS (Activate/Deactivate)
            </button>
          </Link>
          <Link to={"addcug"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Add New CUG
            </button>
          </Link>
          <Link to={"cugstatusreport"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              CUG Status Report
            </button>
          </Link>
          <Link to={"acdcreport"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Active/Deactivate Report
            </button>
          </Link>
          <Link to={"allotmenthistory"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Allotment History
            </button>
          </Link>
          <Link to={"allocreport"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Allocation-wise Report
            </button>
          </Link>
          <Link to={"planreport"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Plan-wise Report Billing
            </button>
          </Link>
          <Link to={"uploadcugbill"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Upload CUG Bill
            </button>
          </Link>
          <Link to={"uploadnewnumber"}>
            <button className="w-full h-20 bg-[#334A7F] hover:scale-90 duration-500 rounded-lg">
              Upload New CUG No
            </button>
          </Link>
        </div>

        {/* Right Content */}
        <div className="w-full md:ml-4">
          {/* Allotment of New CUG */}
          {/* {alllcationwisereport&&  <AllocationWiseReport/>}
         {Planwisereport&& <PlanWiseBillingReport/>} */}
          {/* <PlanWiseBillingReport/> */}
          {/* <ViewPlanReport/> */}

          <Routes>
            <Route path="activecug" element={<Activate_Deactivate_CUG />} />
            <Route path="acdcreport" element={<Activate_Deactivate_Report />} />
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
    </div>
  );
}

export default Admin_dashboard;
