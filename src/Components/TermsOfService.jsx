import React from "react";
import { Link } from "react-router-dom";


function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <div className="bg-white shadow-md">
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto mt-8 mb-8 bg-white p-6 rounded-lg shadow-lg text-black">
        
      <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            
          </div>
          <p className="mb-6">
            Welcome to the East Coast Railway Terms of Service page. These terms
            govern your use of our services. Please read them carefully.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing or using our services, you agree to be bound by these
            Terms of Service and our Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Use of Services</h2>
          <p className="mb-4">
            Our services are intended for personal and non-commercial use unless
            otherwise specified. You agree not to use our services for any
            unlawful purpose or in a way that disrupts our operations.
          </p>

          <h2 className="text-2xl font-semibold mb-2">User Responsibilities</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            account information and for all activities that occur under your
            account.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Modifications</h2>
          <p className="mb-4">
            We may update these Terms of Service from time to time. Any changes
            will be effective immediately upon posting the updated terms on this
            page.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Termination</h2>
          <p className="mb-4">
            We reserve the right to terminate or suspend access to our services
            without prior notice if these terms are violated.
          </p>

          <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our Terms of Service or how we handle
            your personal information, please contact us at{" "}
            <a
              href="mailto:support@eastcoastrailway.gov.in"
              className="text-blue-500 hover:underline"
            >
              support@eastcoastrailway.gov.in
            </a>
            .
          </p>
        
      </div>
   
    </div>
  );
}

export default TermsOfService;
