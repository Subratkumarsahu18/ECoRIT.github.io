import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Allocation_Wise_Report() {
  const [view, setView] = useState(false);
  const [cugNumber, setCugNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    setView(true);
    setCugNumber(''); // Reset the input field
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Allocation Wise Report</h1>
        <button
          onClick={() => navigate("/Dealer_dashboard")}
          className="text-white bg-blue-500 rounded-md p-2 hover:bg-blue-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M15.5 19.5l-1.41-1.41L12.83 18H5v-2h7.83l-2.09-2.09L15.5 12l6 6-6 6-1.5-1.5zM18 0H6C2.69 0 0 2.69 0 6v12c0 3.31 2.69 6 6 6h12c3.31 0 6-2.69 6-6V6c0-3.31-2.69-6-6-6zm0 20H6c-2.21 0-4-1.79-4-4V6c0-2.21 1.79-4 4-4h12c2.21 0 4 1.79 4 4v10c0 2.21-1.79 4-4 4z"/>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <form className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl mb-4 text-blue-700">Enter CUG Number</h2>
          <input
            type="text"
            placeholder="Enter 11 Digit Number"
            className="bg-blue-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={cugNumber}
            onChange={(e) => setCugNumber(e.target.value)}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </form>

        {/* Table */}
        {view && (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="w-full bg-blue-700 text-white">
                  <th className="p-3 text-left">Employee ID</th>
                  <th className="p-3 text-left">Issue Date</th>
                  <th className="p-3 text-left">Disposal Date</th>
                  <th className="p-3 text-left">Operator</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3">LA2B3cuD5t</td>
                  <td className="p-3">04/05/2024</td>
                  <td className="p-3">-</td>
                  <td className="p-3">Jio</td>
                </tr>
                {/* Uncomment and add more rows as needed */}
                {/* <tr className="border-b border-gray-200">
                  <td className="p-3">9X10Y11W12</td>
                  <td className="p-3">06/07/2019</td>
                  <td className="p-3">09/09/2023</td>
                  <td className="p-3">Airtel</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3">5FQFIU83bu</td>
                  <td className="p-3">07/05/2024</td>
                  <td className="p-3">-</td>
                  <td className="p-3">Jio</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allocation_Wise_Report;
