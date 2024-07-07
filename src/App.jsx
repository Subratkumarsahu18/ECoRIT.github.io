import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Dealer_dashboard from "./Components/Dealer_dashboard";
import Admin_dashboard from "./Components/Admin_dashboard";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsOfService from "./Components/TermsOfService";
import ContactForm from "./Components/ContactForm";
import ProfilePage from "./Components/ProfilePage";
import DepartmentReport from './Components/DepartmentReport';
import AllocationWiseReport from "./Components/Admin_Inner_Components/Allocation_Wise_Report";
import GenerateReportPage from "./Components/Admin_Inner_Components/GenerateReportPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dealer_dashboard/*" element={<Dealer_dashboard />} />
        <Route path="/Admin_dashboard/*" element={<Admin_dashboard />} />
        <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/TermsOfService" element={<TermsOfService />} />
        <Route path="/ContactForm" element={<ContactForm />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/department-report" element={<DepartmentReport/>} />
        <Route path="/report" element={<AllocationWiseReport />} />
        <Route path="/generate-report" element={<GenerateReportPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
