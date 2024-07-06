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

import ReportPage from "./Components/ReportPage";

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

        <Route path="/report" element={<ReportPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
