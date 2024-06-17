import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function Upload_new_CUG_Number() {
  const [cugNumber, setCugNumber] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key for resetting file input

  const handleCugSubmit = (e) => {
    e.preventDefault();
    toast.success('New Number Added');
    alert(`CUG Number Submitted: ${cugNumber}`);
    setCugNumber(''); // Reset input field
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();
    toast.success('Uploaded');
    alert(`Employee ID Submitted: ${employeeId}`);
    setEmployeeId(''); // Reset input field
    setFileInputKey(Date.now()); // Reset file input
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Toaster />
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-start px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Upload New CUG Number</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl flex justify-around">
          {/* CUG Number Form */}
          <form onSubmit={handleCugSubmit} className="flex flex-col items-center">
            <h2 className="text-xl mb-4 text-black">Enter New CUG Number</h2>
            <input
              type="text"
              placeholder="Enter 10 Digit Number"
              className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={cugNumber}
              onChange={(e) => setCugNumber(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
            >
              Add
            </button>
          </form>

          {/* Upload File Form */}
          <div className="text-black flex items-center mx-4">OR</div>
          <form onSubmit={handleEmployeeSubmit} className="flex flex-col items-center">
            <h2 className="text-xl mb-4 text-black">Upload File</h2>
            <input
              type="file"
              key={fileInputKey} // Key to reset input
              className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Upload_new_CUG_Number;
