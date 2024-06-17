import React, { useState, useEffect } from 'react';

function CUG_Status_Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const data = [
      { cugNo: '8390507688', employeeId: 'LA2B3cuD5t', userName: 'John Doe', activationDate: '04/05/2024' },
      { cugNo: '90781011837', employeeId: '9X10Y11W12', userName: 'Jane Smith', activationDate: '06/07/2019' },
      { cugNo: '4658989895', employeeId: '5FQFIU83bu', userName: 'Alice Johnson', activationDate: '07/05/2024' },
      { cugNo: '8390507689', employeeId: 'A2B3cuD5tL', userName: 'Bob Brown', activationDate: '01/02/2023' },
      { cugNo: '90781011838', employeeId: 'Y11W129X10', userName: 'Charlie Davis', activationDate: '08/09/2020' },
      { cugNo: '4658989896', employeeId: '3bu5FQFIU8', userName: 'Eve Martinez', activationDate: '12/11/2021' },
      { cugNo: '8390507690', employeeId: 'D5tLA2B3cu', userName: 'Frank White', activationDate: '03/04/2022' },
      { cugNo: '90781011839', employeeId: 'W129X10Y11', userName: 'Grace Green', activationDate: '05/06/2023' },
      { cugNo: '4658989897', employeeId: 'FIU83bu5FQ', userName: 'Hank Blue', activationDate: '09/07/2023' },
    ];
    const updatedData = data.map((row) => {
      const activationDate = new Date(row.activationDate.split('/').reverse().join('-'));
      const deactivationDate = new Date(activationDate);
      deactivationDate.setFullYear(deactivationDate.getFullYear() + 2);
      const isActive = activationDate >= new Date(new Date().setFullYear(new Date().getFullYear() - 2));
      return {
        ...row,
        deactivationDate: isActive ? '-' : deactivationDate.toLocaleDateString(),
        status: isActive ? 'Active' : 'Inactive',
      };
    });

    updatedData.sort((a, b) => new Date(b.activationDate.split('/').reverse().join('-')) - new Date(a.activationDate.split('/').reverse().join('-')));
    setTableData(updatedData);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">CUG Status Report</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="w-full bg-blue-700 text-white">
                <th className="p-3 text-left">CUG No</th>
                <th className="p-3 text-left">Employee ID</th>
                <th className="p-3 text-left">User Name</th>
                <th className="p-3 text-left">Activation Date</th>
                <th className="p-3 text-left">Deactivation Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="p-3">{row.cugNo}</td>
                  <td className="p-3">{row.employeeId}</td>
                  <td className="p-3">{row.userName}</td>
                  <td className="p-3">{row.activationDate}</td>
                  <td className="p-3">{row.deactivationDate}</td>
                  <td className="p-3">{row.status}</td>
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
      </div>
    </div>
  );
}

export default CUG_Status_Report;
