import React, { useState } from 'react';

function Allotment_History() {
  const [view, setView] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCUG, setSelectedCUG] = useState('');
  const [tableData, setTableData] = useState([]);

  const handleSubmit = () => {
    setErrorMessage('');
    if (selectedCUG === '1234567890') {
      setTableData([
        { cugNo: '8390507688', employeeId: 'LA2B3cuD5t', userName: 'John Doe', activationDate: '07/05/2024', deactivationDate: 'Present' },
        { cugNo: '90781011837', employeeId: '9X10Y11W12', userName: 'Jane Smith', activationDate: '06/07/2019', deactivationDate: '06/07/2020' },
        { cugNo: '4658989895', employeeId: '5FQFIU83bu', userName: 'Alice Johnson', activationDate: '04/05/2024', deactivationDate: '04/05/2025' },
      ]);
      setView(true);
    } else if (selectedCUG === '2345678901') {
      setTableData([
        { cugNo: '1234567890', employeeId: 'ABCD1234', userName: 'Emily White', activationDate: '10/11/2023', deactivationDate: 'Present' },
        { cugNo: '2345678901', employeeId: 'WXYZ5678', userName: 'Michael Brown', activationDate: '12/01/2022', deactivationDate: '12/01/2023' },
        { cugNo: '3456789012', employeeId: 'EFGH5678', userName: 'Sophia Lee', activationDate: '02/03/2021', deactivationDate: '02/03/2022' },
        { cugNo: '4567890123', employeeId: 'IJKL5678', userName: 'William Taylor', activationDate: '04/05/2020', deactivationDate: '04/05/2021' },
      ]);
      setView(true);
    } else {
      setView(false);
      setErrorMessage('Invalid CUG number. Please enter a valid 10-digit CUG number.');
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
                    <td className="p-3">{row.cugNo}</td>
                    <td className="p-3">{row.employeeId}</td>
                    <td className="p-3">{row.userName}</td>
                    <td className="p-3">{row.activationDate}</td>
                    <td className="p-3">{row.deactivationDate}</td>
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
