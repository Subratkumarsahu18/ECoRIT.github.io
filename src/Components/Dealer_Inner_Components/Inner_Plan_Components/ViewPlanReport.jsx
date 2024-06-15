import React from 'react';

const data = [
  { talkTime: '100.00rs/-', dataAmount: '37.00rs/-', smsAmount: '92.00rs/-' },
  { talkTime: '150.60rs/-', dataAmount: '24.00rs/-', smsAmount: '84.00rs/-' },
];

const ViewPlanReport = ({disableviewfn}) => {
  return (
    <div className="flex flex-col items-center p-6 text-black">
      <h1 className="text-xl font-bold mb-6">Plan Wise Billing Report</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 w-full max-w-4xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">CUG No:</label>
          <input
            type="text"
            placeholder="Enter 10 Digit Number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Employee No:</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 w-full max-w-4xl">
        <div className="flex items-center mb-4 md:mb-0">
          <label className="block text-sm font-medium text-gray-700 mr-4">Plan:</label>
          <button className="bg-gray-200 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed">A</button>
          <button className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
            Show Plan Details
          </button>
        </div>
        <div className="flex items-center">
          <label className="block text-sm font-medium text-gray-700 mr-4">Show for:</label>
          <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option>1 Month</option>
            <option>2 Month</option>
            <option>3 Month</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white border-2 border-blue-500">
        <thead>
          <tr className=''>
            <th className="px-6 py-2 border">Talk-time Amount</th>
            <th className="px-6 py-2 border">Data Amount</th>
            <th className="px-6 py-2 border">SMS Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-2 text-center border">{item.talkTime}</td>
              <td className="px-6 text-center py-2 border">{item.dataAmount}</td>
              <td className="px-6 text-center py-2 border">{item.smsAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={disableviewfn} className='text-white rounded-md  mr-auto mt-2 px-4 py-2  bg-blue-500'>go back</button>
    </div>
  );
};

export default ViewPlanReport;
