import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./Components/Home";
import PlanWiseReportBillling from "./Components/Dealer_Inner_Components/Plan_Wise_Billing_Report";
import Login from "./Components/Login";
import Dealer_dashboard from "./Components/Dealer_dashboard";
import Admin_dashboard from "./Components/Admin_dashboard";
import Activate_Deactivate_New_CUG from "./Components/Dealer_Inner_Components/Activate_Deactivate_New_CUG";
import AllocationWiseReport from "./Components/Admin_Inner_Components/Allocation_Wise_Report";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Login/>} />
        <Route path = "/Dealer_dashboard" element={<Dealer_dashboard/>} />
        <Route path = "/Admin_dashboard/*" element={<Admin_dashboard/>} />
        <Route path="/Dealer_dashboard/acdcreport" element={<Activate_Deactivate_New_CUG/>} />
        {/* <Route path="addnewcug" element={<Add_new_CUG />} /> */}
        <Route path="/Dealer_dashboard/allocreport" element={<AllocationWiseReport/>} />
        <Route path="/Dealer_dashboard/planreport" element={<PlanWiseReportBillling/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
