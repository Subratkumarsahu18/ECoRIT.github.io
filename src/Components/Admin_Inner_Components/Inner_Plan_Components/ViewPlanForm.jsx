import React, { useState } from 'react';

function ViewPlanForm({ setviewfn }) {
  const [viewtable, setviewtable] = useState(false);
  const [operator, setOperator] = useState('');
  const [plan, setPlan] = useState('');
  const [data, setData] = useState([]);

  const handleOperatorChange = (e) => {
    setOperator(e.target.value);
  };

  const handlePlanChange = (e) => {
    setPlan(e.target.value);
  };

  const generateRandomNumber = (length) => {
    return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
  };

  const generateRandomData = () => {
    const employees = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Robert Brown', 'Michael Davis', 'Sarah Wilson', 'James Miller', 'Linda Taylor'];
    const departments = ['HR', 'Finance', 'IT', 'Sales', 'Marketing', 'Operations'];
    const divisions = ['North', 'South', 'East', 'West'];

    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push({
        serialNo: i + 1,
        cugNumber: generateRandomNumber(10),
        employeeId: generateRandomNumber(11),
        employeeName: employees[Math.floor(Math.random() * employees.length)],
        department: departments[Math.floor(Math.random() * departments.length)],
        division: divisions[Math.floor(Math.random() * divisions.length)],
        allocationNumber: generateRandomNumber(7)
      });
    }
    return rows;
  };

  const handleSubmit = () => {
    if (operator && plan) {
      setData(generateRandomData());
      setviewtable(true);
    } else {
      alert('Please select an operator and a plan.');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-white flex flex-col text-gray-800">
        {/* Header */}
        <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl text-white">Plan Wise Report</h1>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center flex-grow p-4">
          <form className="bg-gray-100 p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-xl mb-4 text-blue-700">Select Operator and Plan</h2>
            <div className="flex space-x-4">
              <select
                value={operator}
                onChange={handleOperatorChange}
                className="bg-blue-100 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Operator</option>
                <option value="JIO">JIO</option>
                <option value="AIRTEL">AIRTEL</option>
                <option value="VODAFONE">VODAFONE</option>
              </select>
              <select
                value={plan}
                onChange={handlePlanChange}
                className="bg-blue-100 p-2 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Plan</option>
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
          {viewtable && (
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
                  {data.map((row, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="p-3">{row.serialNo}</td>
                      <td className="p-3">{row.cugNumber}</td>
                      <td className="p-3">{row.employeeId}</td>
                      <td className="p-3">{row.employeeName}</td>
                      <td className="p-3">{row.department}</td>
                      <td className="p-3">{row.division}</td>
                      <td className="p-3">{row.allocationNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewPlanForm;
