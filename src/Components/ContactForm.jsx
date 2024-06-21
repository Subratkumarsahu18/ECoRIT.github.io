import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ContactForm = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform additional form validation or submission logic here
    
    // Show the popup notification
    setShowPopup(true);

    // Reset the form fields (optional)
    e.target.reset();

    // Hide the popup after a certain duration (e.g., 3 seconds)
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex items-center justify-center flex-grow">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Contact Us</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                name="message"
                className="w-full h-32 px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your message"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Send Message
            </button>
          </form>
          
          {/* Popup Notification */}
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-xl font-semibold">Message Sent!</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactForm;
