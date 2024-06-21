import React, { useState } from 'react';

function AllocationWiseReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  const data = [
    {
      allocationNumber: '12345678',
      totalEmployees: 100,
      plans: { A: 50, B: 30, C: 20 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '87654321',
      totalEmployees: 200,
      plans: { A: 80, B: 60, C: 60 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '11223344',
      totalEmployees: 150,
      plans: { A: 70, B: 50, C: 30 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '22334455',
      totalEmployees: 180,
      plans: { A: 90, B: 60, C: 30 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '33445566',
      totalEmployees: 220,
      plans: { A: 120, B: 50, C: 50 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '44556677',
      totalEmployees: 130,
      plans: { A: 40, B: 50, C: 40 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '55667788',
      totalEmployees: 170,
      plans: { A: 60, B: 70, C: 40 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '66778899',
      totalEmployees: 140,
      plans: { A: 50, B: 50, C: 40 },
      prices: { A: 10, B: 20, C: 30 },
    },
    {
      allocationNumber: '77889900',
      totalEmployees: 190,
      plans: { A: 100, B: 40, C: 50 },
      prices: { A: 10, B: 20, C: 30 },
    },
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Allocation Wise Report</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="w-full bg-blue-700 text-white">
                <th className="p-3 text-left">Allocation Number</th>
                <th className="p-3 text-left">Employees</th>
                <th className="p-3 text-left">Plans (Emp)</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Grand Total</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row) => {
                const amountA = row.plans.A * row.prices.A;
                const amountB = row.plans.B * row.prices.B;
                const amountC = row.plans.C * row.prices.C;
                const grandTotal = amountA + amountB + amountC;
                return (
                  <tr className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out" key={row.allocationNumber}>
                    <td className="p-3">{row.allocationNumber}</td>
                    <td className="p-3">{row.totalEmployees}</td>
                    <td className="p-3">
                      <div>Plan A: {row.plans.A}</div>
                      <div>Plan B: {row.plans.B}</div>
                      <div>Plan C: {row.plans.C}</div>
                    </td>
                    <td className="p-3">
                      <div>₹ {row.prices.A}</div>
                      <div>₹ {row.prices.B}</div>
                      <div>₹ {row.prices.C}</div>
                    </td>
                    <td className="p-3">
                      <div>₹ {amountA}</div>
                      <div>₹ {amountB}</div>
                      <div>₹ {amountC}</div>
                    </td>
                    <td className="p-3">₹ {grandTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-4 w-full px-4">
          <button
            onClick={handlePreviousPage}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-blue-800 transition duration-150 ease-in-out'}`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from(
            { length: Math.ceil(data.length / rowsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-150 ease-in-out'
                }`}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === Math.ceil(data.length / rowsPerPage) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-700 text-white hover:bg-blue-800 transition duration-150 ease-in-out'}`}
            disabled={currentPage === Math.ceil(data.length / rowsPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AllocationWiseReport;
