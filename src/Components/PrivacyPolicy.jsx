import React from "react";
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="bg-white shadow-md">
      </div>

      {/* Content Box */}
      <div className="max-w-3xl mx-auto mt-8 mb-8 bg-white p-6 rounded-lg shadow-lg"> {/* Added mb-8 class for margin-bottom */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <Link to="/Admin_dashboard" className="text-blue-500 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
        </div>
        <p className="mb-6">
          Welcome to the East Coast Railway Privacy Policy page. Your privacy is
          of utmost importance to us. This policy outlines how we collect, use,
          and protect your personal information.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Information Collection</h2>
        <p className="mb-4">
          We may collect personal information such as your name, contact
          details, and other relevant data through our services.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Use of Information</h2>
        <p className="mb-4">
          The information we collect is used to provide and improve our
          services, communicate with you, and ensure the security of our
          systems.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Data Protection</h2>
        <p className="mb-4">
          We implement various security measures to protect your personal
          information from unauthorized access and disclosure.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
        <p className="mb-4">
          Our website may use cookies to enhance your experience. You can choose
          to disable cookies through your browser settings.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
        <p className="mb-4">
          We may share your information with third-party service providers to
          assist us in operating our services. These providers are required to
          protect your information and use it only for the purposes we specify.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Changes to Privacy Policy</h2>
        <p className="mb-4">
          We may update this privacy policy periodically. Any changes will be
          posted on this page with an updated revision date.
        </p>

        <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about our privacy policy or how we handle
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
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
