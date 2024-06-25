import React, { useState } from 'react';

function Upload_CUG_Bill() {
  const [operator, setOperator] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Uploaded');
    setOperator('');
    setFile(null);
    e.target.reset(); // Reset the form fields
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-start px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">CUG Activate/Deactivate</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-4 text-black">Select Operator</h2>
          <select
            className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="" disabled>Select Operator</option>
            <option value="JIO">JIO</option>
            <option value="AIRTEL">AIRTEL</option>
            <option value="VODAFONE">VODAFONE</option>
          </select>
          <h2 className="text-xl mb-4 text-black">Upload File</h2>
          <input
            type="file"
            className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={handleFileChange}
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
  );
}

export default Upload_CUG_Bill;
