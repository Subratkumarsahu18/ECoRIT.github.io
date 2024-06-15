import React, { useState } from 'react'

function ViewPlanForm({setviewfn}) {
    const [viewtable, setviewtable] = useState(false);

    const handlesubmit=()=>{
        setviewtable(true);
    }
  return (
    <div> <div className="min-h-screen bg-white flex flex-col text-gray-800">
    {/* Header */}
    <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
      <h1 className="text-2xl md:text-3xl text-white">Plan Wise Report</h1>
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
      {viewtable && <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white rounded-lg shadow-lg">
          <thead>
            <tr className="w-full bg-blue-700 text-white">
              <th className="p-3 text-left">Employee ID</th>
              <th className="p-3 text-left">CUG Number</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Plan</th>
              <th className="p-3 text-left">Bill</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="p-3">LA2B3cuD5t</td>
              <td className="p-3">8390507688</td>
              <td className="p-3">Active</td>
              <td className="p-3">A</td>
              {<td  onClick={setviewfn} className="p-3 hover:text-blue-600 font-semibold cursor-pointer underline underline-offset-2 ">View</td>}
            </tr>
            {/* <tr className="border-b border-gray-200">
              <td className="p-3">9X10Y11W12</td>
              <td className="p-3">90781011837</td>
              <td className="p-3">Deactive</td>
              <td className="p-3">B</td>
              <td className="p-3">View</td>
            </tr>
            <tr className="border-b border-gray-200">
              <td className="p-3">5FQFIU83bu</td>
              <td className="p-3">4658989895</td>
              <td className="p-3">Active</td>
              <td className="p-3">C</td>
              <td className="p-3">View</td>
            </tr> */}
          </tbody>
        </table>
      </div>}
      
    </div>
  </div></div>
  )
}

export default ViewPlanForm