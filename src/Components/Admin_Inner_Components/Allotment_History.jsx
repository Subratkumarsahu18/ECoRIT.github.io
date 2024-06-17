import React, { useState } from 'react';

function Allotment_History() {
  const [view, setView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAllocation, setSelectedAllocation] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleSubmit = () => {
    if (selectedAllocation === '1234567') {
      setTableData([
        { cugNo: '8390507688', employeeId: 'LA2B3cuD5t', userName: 'John Doe', dateOfIssue: '04/05/2024' },
        { cugNo: '90781011837', employeeId: '9X10Y11W12', userName: 'Jane Smith', dateOfIssue: '06/07/2019' },
        { cugNo: '4658989895', employeeId: '5FQFIU83bu', userName: 'Alice Johnson', dateOfIssue: '07/05/2024' },
        { cugNo: '8390507689', employeeId: 'A2B3cuD5tL', userName: 'Bob Brown', dateOfIssue: '01/02/2023' },
        { cugNo: '90781011838', employeeId: 'Y11W129X10', userName: 'Charlie Davis', dateOfIssue: '08/09/2020' },
        { cugNo: '4658989896', employeeId: '3bu5FQFIU8', userName: 'Eve Martinez', dateOfIssue: '12/11/2021' },
        { cugNo: '8390507690', employeeId: 'D5tLA2B3cu', userName: 'Frank White', dateOfIssue: '03/04/2022' },
        { cugNo: '90781011839', employeeId: 'W129X10Y11', userName: 'Grace Green', dateOfIssue: '05/06/2023' },
        { cugNo: '4658989897', employeeId: 'FIU83bu5FQ', userName: 'Hank Blue', dateOfIssue: '09/07/2023' },
      ]);
    } else if (selectedAllocation === '2345678') {
      setTableData([
        { cugNo: '1234567890', employeeId: 'ABCD1234', userName: 'Emily White', dateOfIssue: '10/11/2023' },
        { cugNo: '2345678901', employeeId: 'WXYZ5678', userName: 'Michael Brown', dateOfIssue: '12/01/2022' },
        { cugNo: '3456789012', employeeId: 'EFGH5678', userName: 'Sophia Lee', dateOfIssue: '02/03/2021' },
        { cugNo: '4567890123', employeeId: 'IJKL5678', userName: 'William Taylor', dateOfIssue: '04/05/2020' },
        { cugNo: '5678901234', employeeId: 'MNOP5678', userName: 'Olivia Johnson', dateOfIssue: '06/07/2019' },
      ]);
    }
    setView(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAllocationChange = (event) => {
    setSelectedAllocation(event.target.value);
    setView(false); // Reset view when allocation changes
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const rowsPerPage = 3;
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const displayData = tableData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8 relative">
        <h1 className="text-2xl md:text-3xl text-white">Allocation History</h1>
        {view && (
          <button
            onClick={() => setView(false)}
            className="absolute top-1/2 transform -translate-y-1/2 right-4 p-2 text-white bg-blue-700 hover:bg-blue-800 rounded-md"
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
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <form className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl mb-4 text-blue-700">Select Allocation number</h2>
          <select
            className="bg-blue-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleAllocationChange}
            value={selectedAllocation}
          >
            <option value="">Select number</option>
            <option value="1234567">1234567</option>
            <option value="2345678">2345678</option>
          </select>
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
                  <th className="p-3 text-left">CUG No</th>
                  <th className="p-3 text-left">Employee ID</th>
                  <th className="p-3 text-left">User Name</th>
                  <th className="p-3 text-left">Date of Issue</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{row.cugNo}</td>
                    <td className="p-3">{row.employeeId}</td>
                    <td className="p-3">{row.userName}</td>
                    <td className="p-3">{row.dateOfIssue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                &lt; Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`mx-1 px-3 py-1 rounded-lg ${
                    currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Next &gt;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allotment_History;
