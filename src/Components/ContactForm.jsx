import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send("service_ubangz8", "template_3e3hexb", formData, {
        publicKey: "ysTp7gd5-wLU6GHB6",
      })
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setShowPopup(true);
          setTimeout(() => setShowPopup(false), 3000); // Hide popup after 3 seconds
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex items-center justify-center flex-grow">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Contact Us</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
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