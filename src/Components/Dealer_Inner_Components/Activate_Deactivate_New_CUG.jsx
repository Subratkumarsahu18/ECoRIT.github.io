import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Activate_Deactivate_New_CUG = () => {
  const [dispacdc, setdispacdc] = useState(false);
  const [enteredCUG, setEnteredCUG] = useState("");
  const [cugDetails, setCugDetails] = useState(null);

  const validCUGs = {
    "1111111111": {
      employeeNumber: "1234567890",
      employeeName: "John Doe",
      division: "HQ",
      department: "ACCOUNTS",
      billUnit: "10",
      allocation: "1234567",
      plan: "A",
    },
    "2222222222": {
      employeeNumber: "0987654321",
      employeeName: "Jane Smith",
      division: "CON",
      department: "ENGINEERING",
      billUnit: "29",
      allocation: "7654321",
      plan: "B",
    },
  };

  const handleCUGChange = (event) => {
    setEnteredCUG(event.target.value);
  };

  const handleSubmit = () => {
    if (validCUGs[enteredCUG]) {
      setCugDetails(validCUGs[enteredCUG]);
      setdispacdc(true);
    } else {
      toast.error("Wrong input");
      setEnteredCUG("");
    }
  };

  return (
    <>
      <Toaster />
      {!dispacdc ? (
        <div className="flex flex-col items-center min-h-screen bg-white">
          <div className="w-full bg-blue-700 py-4 flex mb-10 justify-between items-center px-4 md:px-8">
            <h1 className="text-2xl md:text-3xl text-white">
              Activate/Deactivate CUG
            </h1>
          </div>
          <div className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter CUG Number
              </label>
              <input
                type="text"
                value={enteredCUG}
                onChange={handleCUGChange}
                placeholder="Enter 11 Digit Number"
                className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSubmit}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
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
                value={enteredCUG}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Number
              </label>
              <input
                type="text"
                value={cugDetails.employeeNumber}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                value={cugDetails.employeeName}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <input
                type="text"
                value={cugDetails.division}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                value={cugDetails.department}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill Unit
              </label>
              <input
                type="text"
                value={cugDetails.billUnit}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allocation
              </label>
              <input
                type="text"
                value={cugDetails.allocation}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div className="flex items-center mt-4">
              <label className="block text-sm font-medium text-gray-700 mr-4">
                Plan:
              </label>
              <button className="bg-gray-200 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed">
                {cugDetails.plan}
              </button>
              <button
                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                onClick={() => {
                  toast.success("Activated");
                }}
              >
                Activate
              </button>
              <button
                className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700"
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
