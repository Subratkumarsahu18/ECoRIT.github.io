import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
//kjjguygfyuf
const Create_dealer = () => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Toaster />
      {!showDetails ? (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
          <h1 className="text-xl font-bold mb-6 text-blue-600">
            Create Dealer
          </h1>
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-3xl space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full max-w-sm">
              <label className="block text-sm font-medium text-gray-700">
                Enter CUG Number
              </label>
              <input
                type="text"
                placeholder="Enter 11 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => setShowDetails(true)}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
              >
                GO
              </button>
            </div>
            <div className="text-center md:mx-6">
              <span className="text-lg font-semibold">OR</span>
            </div>
            <div className="w-full max-w-sm">
              <label className="block text-sm font-medium text-gray-700">
                Enter CUG Number
              </label>
              <input
                type="text"
                placeholder="Enter 11 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => setShowDetails(true)}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
              >
                GO
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center p-6 min-h-screen bg-gray-100">
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-4 right-4 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            {/* Replace the text with an SVG vector */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
            >
              <path d="M15.5 19.5l-1.41-1.41L12.83 18H5v-2h7.83l-2.09-2.09L15.5 12l6 6-6 6-1.5-1.5zM18 0H6C2.69 0 0 2.69 0 6v12c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6V6c0-3.31-2.69-6-6-6zm0 20H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4z" />
            </svg>
          </button>
          <h1 className="text-xl font-bold mb-6 text-blue-600">
            Create Dealer
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                placeholder="Enter Name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                placeholder="Enter ID"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <input
                type="text"
                placeholder="Enter Division"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                placeholder="Enter Department"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plan
              </label>
              <input
                type="text"
                placeholder="A"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Operator
              </label>
              <input
                type="text"
                placeholder="Airtel"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter CUG Number
              </label>
              <input
                type="text"
                placeholder="Enter 11 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <input
                type="text"
                placeholder="Activate/Deactivate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={() => toast.success("Submitted")}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Create_dealer;
