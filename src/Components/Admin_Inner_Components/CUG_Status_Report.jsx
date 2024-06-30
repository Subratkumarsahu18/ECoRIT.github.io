import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, getDocs } from 'firebase/firestore';

function CUG_Status_Report() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cug'));
        let data = [];
        querySnapshot.forEach((doc) => {
          const rowData = {
            selectedCUG: doc.data().selectedCUG,
            employeeNumber: doc.data().employeeNumber,
            employeeName: doc.data().employeeName,
            timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
            deactivatedAt: doc.data().deactivatedAt ? doc.data().deactivatedAt.toDate().toLocaleDateString() : '-',
          };
          data.push(rowData);
        });
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  const sortedTableData = tableData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedTableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(sortedTableData.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">CUG Status Report</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Table */}
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="w-full bg-blue-700 text-white">
                  <th className="p-3 text-left">CUG No</th>
                  <th className="p-3 text-left">Employee ID</th>
                  <th className="p-3 text-left">User Name</th>
                  <th className="p-3 text-left">Activation Date</th>
                  <th className="p-3 text-left">Deactivation Date</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{row.selectedCUG}</td>
                    <td className="p-3">{row.employeeNumber}</td>
                    <td className="p-3">{row.employeeName}</td>
                    <td className="p-3">{row.timestamp}</td>
                    <td className="p-3">{row.deactivatedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {sortedTableData.length > rowsPerPage && (
            <div className="flex justify-end items-center mt-4">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-lg mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              {[...Array(totalPages).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => handlePageChange(number + 1)}
                  className={`py-1 px-3 rounded-lg mx-1 ${currentPage === number + 1 ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {number + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-200 text-gray-700 py-1 px-3 rounded-lg mx-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CUG_Status_Report;
