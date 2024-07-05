import React, { useState } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, query, where, getDocs } from 'firebase/firestore';

function PlanWiseReportBilling() {
  const [viewTable, setViewTable] = useState(false);
  const [operator, setOperator] = useState('');
  const [plan, setPlan] = useState('');
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); // Number of rows per page

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };

  // Function to handle form submission and query the database
  const handleSubmit = async () => {
    if (operator && plan) {
      console.log(operator, plan);
      const q = query(
        collection(db, 'demo'),
        where('OPERATOR', '==', operator),
        where('PLAN', '==', plan),
        where('status', '==', 'Active') // Ensure only active employees are included
      );

      try {
        const querySnapshot = await getDocs(q);
        const rows = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log(data);
          rows.push({
            selectedCUG: data['CUG NO'],
            employeeId: data['EMP NO'],
            employeeName: data['NAME'],
            selectedDepartment: data['DEPARTMENT'],
            selectedDivision: data['BILL UNIT'], // Assuming 'BILL UNIT' is analogous to 'Division'
            selectedAllocation: data['ALLOCATION'],
          });
        });
        console.log(rows);
        setData(rows);
        setViewTable(true);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle error appropriately (e.g., show error message)
      }
    } else {
      alert('Please select an operator and a plan.');
    }
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper function to create pagination numbers with ellipses
  const getPaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(currentPage - 1, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift('...');
    }
    if (endPage < totalPages) {
      pages.push('...');
    }

    return pages;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Plan Wise Report</h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Form */}
        <form className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl mb-4 text-blue-700">Select Operator and Plan</h2>
          <div className="flex space-x-4">
            <select
              value={operator}
              onChange={handleOperatorChange}
              className="bg-blue-100 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Operator
              </option>
              <option value="JIO">JIO</option>
              <option value="AIRTEL">AIRTEL</option>
              <option value="VODAFONE">VODAFONE</option>
            </select>
            <select
              value={plan}
              onChange={handlePlanChange}
              className="bg-blue-100 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select Plan
              </option>
              <option value="Plan A">Plan A</option>
              <option value="Plan B">Plan B</option>
              <option value="Plan C">Plan C</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800"
          >
            Submit
          </button>
        </form>

        {/* Table */}
        {viewTable && (
          <div className="overflow-x-auto w-full">
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="w-full bg-blue-700 text-white">
                  <th className="p-3 text-left">Serial No.</th>
                  <th className="p-3 text-left">CUG Number</th>
                  <th className="p-3 text-left">Employee ID</th>
                  <th className="p-3 text-left">Employee Name</th>
                  <th className="p-3 text-left">Department</th>
                  <th className="p-3 text-left">Division</th>
                  <th className="p-3 text-left">Allocation Number</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3">{indexOfFirstRow + index + 1}</td>
                    <td className="p-3">{row.selectedCUG}</td>
                    <td className="p-3">{row.employeeId}</td>
                    <td className="p-3">{row.employeeName}</td>
                    <td className="p-3">{row.selectedDepartment}</td>
                    <td className="p-3">{row.selectedDivision}</td>
                    <td className="p-3">{row.selectedAllocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

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
            {getPaginationNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && handlePageChange(page)}
                className={`py-1 px-3 rounded-lg mx-1 ${
                  currentPage === page ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                disabled={typeof page !== 'number'}
              >
                {page}
              </button>
            ))}
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
    </div>
  );
}

export default PlanWiseReportBilling;
