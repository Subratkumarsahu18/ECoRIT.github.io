import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Activate_Deactivate_New_CUG = () => {
  const [dispacdc, setdispacdc] = useState(false);

  return (
    <>
      <Toaster />
      {!dispacdc ? (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
          <h1 className="text-xl font-bold mb-6 text-blue-600">Activate/Deactivate CUG</h1>
          <div className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter CUG Number
              </label>
              <input
                type="text"
                placeholder="Enter 11 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() => setdispacdc(true)}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center p-6 min-h-screen bg-gray-100 text-blue-600">
          <button
            onClick={() => setdispacdc(false)}
            className="absolute top-4 right-4 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            {/* Replace the text with an SVG vector */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M15.5 19.5l-1.41-1.41L12.83 18H5v-2h7.83l-2.09-2.09L15.5 12l6 6-6 6-1.5-1.5zM18 0H6C2.69 0 0 2.69 0 6v12c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6V6c0-3.31-2.69-6-6-6zm0 20H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4z"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold mb-6">Activate/Deactivate CUG</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="col-span-1 md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                CUG Number
              </label>
              <input
                type="text"
                placeholder="Enter  11 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Number
              </label>
              <input
                type="text"
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <input
                type="text"
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill Unit
              </label>
              <input
                type="text"
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allocation
              </label>
              <input
                type="text"
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="col-span-1 md:col-span-3 flex justify-between items-center mt-4">
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-500"
                onClick={() => {
                  toast.success("Activated");
                }}
              >
                Activate
              </button>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan:
                </label>
                <button className="bg-blue-200 text-gray-700 py-2 px-4 rounded-md cursor-not-allowed">
                  A
                </button>
              </div>
              <button
                className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-500"
                onClick={() => {
                  toast.success("Deactivated");
                }}
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Activate_Deactivate_New_CUG;
