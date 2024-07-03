import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, getDocs } from 'firebase/firestore';

function CUG_Status_Report() {
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('desc'); // Initial sort direction
  const [loading, setLoading] = useState(true); // Loading state
  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'cug'));
        let data = [];
        let latestDeactivationData = {};

        querySnapshot.forEach((doc) => {
          let timestamp = '-';
          if (doc.data().timestamp instanceof Date) {
            timestamp = doc.data().timestamp.toDate().toLocaleDateString();
          } else if (doc.data().timestamp && doc.data().timestamp.seconds) {
            timestamp = new Date(doc.data().timestamp.seconds * 1000).toLocaleDateString();
          } else if (doc.data().timestamp) {
            timestamp = new Date(doc.data().timestamp).toLocaleDateString();
          }

          let deactivatedAt = '-';
          if (doc.data().deactivatedAt instanceof Date) {
            deactivatedAt = doc.data().deactivatedAt.toDate().toLocaleDateString();
          } else if (doc.data().deactivatedAt && doc.data().deactivatedAt.seconds) {
            deactivatedAt = new Date(doc.data().deactivatedAt.seconds * 1000).toLocaleDateString();
          } else if (doc.data().deactivatedAt) {
            deactivatedAt = new Date(doc.data().deactivatedAt).toLocaleDateString();
          }

          const rowData = {
            selectedCUG: doc.data().selectedCUG || '',
            employeeNumber: doc.data().employeeNumber || '',
            employeeName: doc.data().employeeName || '',
            timestamp: timestamp,
            deactivatedAt: deactivatedAt,
            status: doc.data().status || '',
          };

          const cugNumber = rowData.selectedCUG;

          // Update to keep the latest deactivation date data
          if (!latestDeactivationData[cugNumber] || new Date(rowData.deactivatedAt) > new Date(latestDeactivationData[cugNumber].deactivatedAt)) {
            latestDeactivationData[cugNumber] = rowData;
          }
        });

        // Convert object to array
        data = Object.values(latestDeactivationData);

        // Sort data based on status and timestamp
        data.sort((a, b) => {
          if (a.status !== b.status) {
            return sortDirection === 'asc' ? a.status.localeCompare(b.status) : b.status.localeCompare(a.status);
          } else {
            return sortDirection === 'asc' ? new Date(a.timestamp) - new Date(b.timestamp) : new Date(b.timestamp) - new Date(a.timestamp);
          }
        });
        setTableData(data);
        setLoading(false); // Data fetching complete
      } catch (error) {
        console.error('Error fetching data: ', error.message);
        setLoading(false); // Data fetching complete even if there's an error
      }
    };

    fetchData();
  }, [sortDirection]); // Update useEffect dependency to re-fetch data when sortDirection changes

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = tableData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
  };

  // Function to generate pagination buttons
  const generatePaginationButtons = () => {
    const pageButtons = [];
    const maxVisiblePages = 3; // Maximum number of visible page buttons
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (totalPages > maxVisiblePages) {
      if (endPage === totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
      }
      if (startPage > 1) {
        pageButtons.push(
          <button key={1} onClick={() => handlePageChange(1)} className="py-1 px-3 rounded-lg mx-1 bg-gray-200 text-gray-700">
            1
          </button>
        );
        if (startPage > 2) {
          pageButtons.push(<span key="ellipsis-start">...</span>);
        }
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`py-1 px-3 rounded-lg mx-1 ${currentPage === i ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {i}
        </button>
      );
    }

    if (totalPages > maxVisiblePages && endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageButtons.push(<span key="ellipsis-end">...</span>);
      }
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`py-1 px-3 rounded-lg mx-1 ${currentPage === totalPages ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">CUG Status Report</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="loader border-t-4 border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="w-full">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg">
                  <thead>
                    <tr className="w-full bg-blue-700 text-white">
                      <th className="p-3 text-left">Serial No</th>
                      <th className="p-3 text-left">CUG No</th>
                      <th className="p-3 text-left">Employee ID</th>
                      <th className="p-3 text-left">User Name</th>
                      <th className="p-3 text-left">
                        Activation Date{' '}
                        <button onClick={toggleSortDirection}>
                          {sortDirection === 'asc' ? (
                            <span>&#9650;</span> // Upward arrow
                          ) : (
                            <span>&#9660;</span> // Downward arrow
                          )}
                        </button>
                      </th>
                      <th className="p-3 text-left">Deactivation Date</th>
                      <th className="p-3 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map((row, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="p-3">{indexOfFirstRow + index + 1}</td>
                        <td className="p-3">{row.selectedCUG}</td>
                        <td className="p-3">{row.employeeNumber}</td>
                        <td className="p-3">{row.employeeName}</td>
                        <td className="p-3">{row.timestamp}</td>
                        <td className="p-3">{row.deactivatedAt}</td>
                        <td className="p-3">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination controls */}
              {totalPages > 1 && (
                <div className="flex justify-end items-center mt-4">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`py-1 px-3 rounded-lg mx-1 ${
                      currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-700 text-white'
                    }`}
                  >
                    Prev
                  </button>
                  {generatePaginationButtons()}
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`py-1 px-3 rounded-lg mx-1 ${
                      currentPage === totalPages ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-700 text-white'
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CUG_Status_Report;
