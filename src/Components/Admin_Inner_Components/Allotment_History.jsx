import React, { useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, query, where, getDocs } from 'firebase/firestore';

function Allotment_History() {
  const [view, setView] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCUG, setSelectedCUG] = useState('');
  const [tableData, setTableData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5; // Number of rows per page

  const handleSubmit = () => {
    setErrorMessage('');
    if (selectedCUG.trim() === '') {
      setErrorMessage('Please enter a valid 10-digit CUG number.');
      setTableData([]);
      setView(false);
      return;
    }

    fetchData(selectedCUG);
  };

  const fetchData = async (cugNumber) => {
    try {
      const q = query(collection(db, 'cug'), where('selectedCUG', '==', cugNumber));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setErrorMessage('No entries found for the entered CUG number.');
        setTableData([]);
        setView(false);
      } else {
        let data = [];
        querySnapshot.forEach((doc) => {
          const rowData = {
            selectedCUG: doc.data().selectedCUG,
            employeeNumber: doc.data().employeeNumber,
            employeeName: doc.data().employeeName,
            timestamp: doc.data().timestamp,
            deactivatedAt: doc.data().deactivatedAt || '-',
          };
          data.push(rowData);
        });
        setTableData(data);
        setView(true);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
      setErrorMessage('Error fetching data. Please try again later.');
      setTableData([]);
      setView(false);
    }
  };

  const handleCUGChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setSelectedCUG(value);
      setView(false); // Reset view when CUG changes
      setErrorMessage('');
    }
  };

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
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8 relative">
        <h1 className="text-2xl md:text-3xl text-white">Allotment History</h1>
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <form className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl mb-4 text-blue-700">Enter CUG number</h2>
          <input
            type="text"
            placeholder="Enter 10 Digit Number"
            className="bg-blue-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCUG}
            onChange={handleCUGChange}
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </form>

        {/* Table */}
        {view && (
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
        )}
      </div>
    </div>
  );
}

export default Allotment_History;
