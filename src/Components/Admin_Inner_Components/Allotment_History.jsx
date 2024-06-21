import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, query, where, getDocs } from 'firebase/firestore';

function Allotment_History() {
  const [view, setView] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCUG, setSelectedCUG] = useState('');
  const [tableData, setTableData] = useState([]);

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
          data.push(doc.data());
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

  const sortedTableData = tableData.sort((a, b) => new Date(b.activationDate) - new Date(a.activationDate));

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
          <div className="overflow-x-auto w-full">
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
                {sortedTableData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{row.selectedCUG}</td>
                    <td className="p-3">{row.employeeNumber}</td>
                    <td className="p-3">{row.employeeName}</td>
                    <td className="p-3">{row.timestamp}</td>
                    <td className="p-3">{row.deactivationDate || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Allotment_History;
