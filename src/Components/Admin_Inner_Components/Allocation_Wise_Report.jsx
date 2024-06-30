import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Static data (example)
const data = [
  {
    allocationNumber: '3100873105',
    totalEmployees: 674, // Estimated based on 11,025.00 total amount
    plans: { A: 366, B: 170, C: 138 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3100873106',
    totalEmployees: 721, // Estimated based on 11,805.00 total amount
    plans: { A: 391, B: 185, C: 145 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3102030519',
    totalEmployees: 21, // Estimated based on 352.00 total amount
    plans: { A: 10, B: 5, C: 6 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103011319',
    totalEmployees: 403, // Estimated based on 6,615.00 total amount
    plans: { A: 218, B: 124, C: 61 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103021319',
    totalEmployees: 578, // Estimated based on 9,475.00 total amount
    plans: { A: 311, B: 185, C: 82 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103031319',
    totalEmployees: 138, // Estimated based on 2,270.00 total amount
    plans: { A: 75, B: 43, C: 20 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103041319',
    totalEmployees: 175, // Estimated based on 2,881.00 total amount
    plans: { A: 93, B: 56, C: 26 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103053319',
    totalEmployees: 579, // Estimated based on 9,495.00 total amount
    plans: { A: 312, B: 185, C: 82 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103061319',
    totalEmployees: 169, // Estimated based on 2,781.00 total amount
    plans: { A: 91, B: 54, C: 24 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103071319',
    totalEmployees: 172, // Estimated based on 2,821.00 total amount
    plans: { A: 93, B: 55, C: 24 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103081319',
    totalEmployees: 334, // Estimated based on 5,495.00 total amount
    plans: { A: 180, B: 107, C: 47 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103091319',
    totalEmployees: 192, // Estimated based on 3,151.00 total amount
    plans: { A: 104, B: 62, C: 26 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103092319',
    totalEmployees: 278, // Estimated based on 4,560.00 total amount
    plans: { A: 149, B: 88, C: 41 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3103093319',
    totalEmployees: 44, // Estimated based on 729.00 total amount
    plans: { A: 24, B: 14, C: 6 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3111021519',
    totalEmployees: 164, // Estimated based on 2,702.00 total amount
    plans: { A: 88, B: 53, C: 23 },
    prices: { A: 10, B: 20, C: 30 },
  },
  {
    allocationNumber: '3112011619',
    totalEmployees: 186, // Estimated based on 3,059.00 total amount
    plans: { A: 100, B: 60, C: 26 },
    prices: { A: 10, B: 20, C: 30 },
  },
];

function AllocationWiseReport() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'grandTotal', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(3); // Initial rows per page

  // Refs for table body and header
  const tableHeaderRef = useRef(null);
  const tableBodyRef = useRef(null);

  // Determine rowsPerPage dynamically based on screen size
  useEffect(() => {
    const calculateRowsPerPage = () => {
      const screenHeight = window.innerHeight;
      const tableHeaderHeight = tableHeaderRef.current.clientHeight;
      const tableFooterHeight = 120; // Height of pagination and search input
      const rowHeight = 50; // Estimated height per row
      const availableHeight = screenHeight - tableHeaderHeight - tableFooterHeight;
      const maxRowsPerPage = Math.floor(availableHeight / rowHeight);
      return maxRowsPerPage > 0 ? maxRowsPerPage : 1; // Ensure at least 1 row per page
    };

    setRowsPerPage(calculateRowsPerPage());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleResize = () => {
    setRowsPerPage(calculateRowsPerPage());
  };

  // Function to handle sorting based on grand total
  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      const amountA = a.plans.A * a.prices.A + a.plans.B * a.prices.B + a.plans.C * a.prices.C;
      const amountB = b.plans.A * b.prices.A + b.plans.B * b.prices.B + b.plans.C * b.prices.C;

      if (sortConfig.direction === 'ascending') {
        return amountA - amountB;
      } else {
        return amountB - amountA;
      }
    });
    return sortedData;
  };

  // Function to filter data based on search term
  const filteredData = data.filter((item) =>
    item.allocationNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Update paginatedData with sorted and filtered data
  const paginatedData = sortData()
    .filter((item) => filteredData.includes(item)) // Apply sorting first, then filter
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // Function to toggle sort direction for grand total
  const requestSort = () => {
    let direction = 'ascending';
    if (sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: 'grandTotal', direction });
  };

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  // Function to calculate grand total for a row
  const calculateGrandTotal = (row) => {
    const amountA = row.plans.A * row.prices.A;
    const amountB = row.plans.B * row.prices.B;
    const amountC = row.plans.C * row.prices.C;
    return amountA + amountB + amountC;
  };

  // Calculate total employees for filtered data
  const totalEmployees = filteredData.reduce((acc, curr) => acc + curr.totalEmployees, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div ref={tableHeaderRef} className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Allocation Wise Report</h1>
        <div>
          <input
            type="text"
            placeholder="Search by Allocation Number"
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="overflow-x-auto w-full" ref={tableBodyRef}>
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="w-full bg-blue-700 text-white">
                <th className="p-3 text-left">Allocation Number</th>
                <th className="p-3 text-left">Employees</th>
                <th className="p-3 text-left">Plans (Emp)</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left cursor-pointer" onClick={requestSort}>
                  Total{' '}
                  {sortConfig.direction === 'ascending' ? (
                    <span>▲</span>
                  ) : (
                    <span>▼</span>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const amountA = row.plans.A * row.prices.A;
                  const amountB = row.plans.B * row.prices.B;
                  const amountC = row.plans.C * row.prices.C;
                  const grandTotal = amountA + amountB + amountC;
                  return (
                    <tr
                      className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                      key={row.allocationNumber}
                    >
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
                      <td className="p-3">₹ {grandTotal}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-4">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4 w-full px-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
              currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous Page
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(filteredData.length / rowsPerPage)}
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 ${
              currentPage >= Math.ceil(filteredData.length / rowsPerPage) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Next Page
          </button>
        </div>
        <div className="flex justify-between mt-4 w-full px-4">
          <span className="text-gray-700">
            Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
          </span>
        </div>

        {/* Total Employees Section */}
        <div className="mt-4 px-4 text-right">
          <span className="text-lg font-bold">Total Employees: {totalEmployees}</span>
        </div>

        {/* Generate Report Button */}
        <div className="mt-4 px-4 text-right">
          <Link to="/report">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Generate Report
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllocationWiseReport;