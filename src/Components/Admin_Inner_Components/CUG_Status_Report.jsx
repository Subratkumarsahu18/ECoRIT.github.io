import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, getDocs } from 'firebase/firestore';

function CUG_Status_Report() {
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);
  const rowsPerPage = 10; // Number of rows per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Cug'));
        let data = [];
        querySnapshot.forEach((doc) => {
          const rowData = {
            cugNo: doc.data().selectedCUG,
            employeeId: doc.data().employeeNumber,
            userName: doc.data().employeeName,
            activationDate: new Date(doc.data().timestamp.toDate()).toLocaleDateString(),
            deactivationDate: doc.data().status === 'Inactive' ? new Date(doc.data().deactivatedAt.toDate()).toLocaleDateString() : '-',
            status: doc.data().status,
          };
          data.push(rowData);
        });
        
        data.sort((a, b) => new Date(b.activationDate.split('/').reverse().join('-')) - new Date(a.activationDate.split('/').reverse().join('-')));
        setTableData(data);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
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
