import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore'; // Correct import

const operators = [
  {
    name: 'Airtel',
    color: 'bg-red-500',
    url: 'https://www.airtel.in',
    plans: [
      { title: 'Plan A', description: 'Description of Airtel Plan A', price: 10 }, // Prices in INR
      { title: 'Plan B', description: 'Description of Airtel Plan B', price: 20 },
      { title: 'Plan C', description: 'Description of Airtel Plan C', price: 30 },
    ],
  },
  {
    name: 'JIO',
    color: 'bg-[#0e3dc9]',
    url: 'https://www.jio.com',
    plans: [
      { title: 'Plan A', description: 'Description of JIO Plan A', price: 15 },
      { title: 'Plan B', description: 'Description of JIO Plan B', price: 25 },
      { title: 'Plan C', description: 'Description of JIO Plan C', price: 35 },
    ],
  },
  {
    name: 'Vodafone',
    color: 'bg-[#e60000]',
    url: 'https://www.vodafone.com',
    plans: [
      { title: 'Plan A', description: 'Description of Vodafone Plan A', price: 12 },
      { title: 'Plan B', description: 'Description of Vodafone Plan B', price: 22 },
      { title: 'Plan C', description: 'Description of Vodafone Plan C', price: 32 },
    ],
  },
];

function Department_Billing_Report() {
  const [data, setData] = useState([]);
  const [employeeCounts, setEmployeeCounts] = useState({});
  const [departmentPrices, setDepartmentPrices] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);

  const departments = [
    'S & T', 'ENGG', 'ELECT', 'ACCTS', 'OPTG', 'PERS', 'SECURITY', 'AUDIT', 'COMM', 
    'MED', 'G A', 'SAFETY', 'MECH', 'STORES', 'RRB'
  ];

  const fetchEmployeeCounts = async () => {
    const counts = {};

    for (const department of departments) {
      const q = query(
        collection(db, 'demo'),
        where('DEPARTMENT', '==', department),
        where('status', '==', 'Active')
      );
      const querySnapshot = await getDocs(q);
      counts[department] = querySnapshot.size;
    }

    console.log("Employee Counts: ", counts); // Debugging log
    setEmployeeCounts(counts);
  };

  const fetchPrices = () => {
    const prices = {};
    let grandTotal = 0;

    data.forEach(item => {
      if (item.status === 'Active') { // Check if the status is 'Active'
        const operator = operators.find(op => op.name === item.OPERATOR);
        if (operator) {
          const plan = operator.plans.find(p => p.title === item.PLAN);
          if (plan) {
            const key = item.DEPARTMENT;
            if (!prices[key]) prices[key] = 0;
            prices[key] += plan.price;
            grandTotal += plan.price;
          }
        }
      }
    });

    console.log("Department Prices: ", prices); // Debugging log
    console.log("Grand Total: ", grandTotal); // Debugging log
    setDepartmentPrices(prices);
    setGrandTotal(grandTotal);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'demo'));
      const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataArray);
      await fetchEmployeeCounts(); // Fetch employee counts after getting initial data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchPrices(); // Fetch prices after data is fetched
  }, [data]);

  const renderRows = () => {
    const rows = [];

    departments.forEach(department => {
      rows.push(
        <tr key={department}>
          <td className="p-3 border border-blue-500">{department} (Employees: {employeeCounts[department] || 0})</td>
          <td className="p-3 border border-blue-500">₹{departmentPrices[department] || 0}</td>
        </tr>
      );
    });

    return rows;
  };

  const handleGenerateReport = () => {
    console.log('Generate Report button clicked');
    // Add your report generation logic here
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <div className="w-full bg-blue-700 py-4 flex justify-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Department Wise Report</h1>
      </div>

      <div className="w-full flex flex-col items-center space-y-4 my-4 px-4">
        <div className="overflow-x-auto w-full mt-8">
          <div className="mb-4 text-right">
            <strong>Grand Total: ₹{grandTotal}</strong>
          </div>
          <table className="min-w-full bg-white rounded-lg shadow-lg border border-blue-500">
            <thead>
              <tr className="w-full bg-blue-700 text-white">
                <th className="p-3 text-left border border-blue-500">Department [Employee count]</th>
                <th className="p-3 text-left border border-blue-500">Price</th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleGenerateReport}
          className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default Department_Billing_Report;
