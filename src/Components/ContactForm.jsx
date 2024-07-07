import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    

    emailjs.sendForm('service_ubangz8', 'template_3e3hexb', e.target, 'ysTp7gd5-wLU6GHB6')
  .then((result) => {
    console.log(result.text);
    setShowPopup(true);
    e.target.reset();

    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  }, (error) => {
    console.log(error.text);
  });

  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
    </div>
  );
};

export default ContactForm;
