import React, { useState } from 'react';

function AllocationWiseReport() {
const [view, setview] = useState(false)
  const handlesubmit=()=>{
    setview(true);
  }


  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Allocation Wise Report</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <form className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl mb-4 text-blue-700">Enter CUG Number</h2>
          <input
            type="text"
            placeholder="Enter 11 Digit Number"
            className="bg-blue-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={handlesubmit}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </form>

        {/* Table */}
   {view &&     <div className="overflow-x-auto w-full">
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
        </div>}
      </div>
    </div>
  );
}

export default AllocationWiseReport;
