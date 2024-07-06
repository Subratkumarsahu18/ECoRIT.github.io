/*import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore'; // Correct import

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

    setEmployeeCounts(counts);
  };

  const fetchPrices = async () => {
    const prices = {};
    let grandTotal = 0;

    for (const department of departments) {
      const q = query(
        collection(db, 'demo'),
        where('DEPARTMENT', '==', department),
        where('status', '==', 'Active')
      );
      const querySnapshot = await getDocs(q);
      
      let departmentTotal = 0;

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        console.log(`Fetching price for Operator: ${data.OPERATOR}, Plan: ${data.PLAN}`); // Debug statement

        const planQuery = query(
          collection(db, 'Plan Details'),
          where('OPERATOR', '==', data.OPERATOR),
          where('PLAN', '==', data.PLAN)
        );
        const planSnapshot = await getDocs(planQuery);

        if (!planSnapshot.empty) {
          const planData = planSnapshot.docs[0].data();
          console.log(`Price found: ${planData.PRICE} for ${data.OPERATOR} ${data.PLAN}`); // Debug statement
          departmentTotal += Number(planData.PRICE); // Ensure the PRICE is treated as a number
        } else {
          console.log(`No price found for ${data.OPERATOR} ${data.PLAN}`); // Debug statement
        }
      }

      prices[department] = departmentTotal;
      grandTotal += departmentTotal;
    }

    setDepartmentPrices(prices);
    setGrandTotal(grandTotal);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'demo'));
      const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataArray);
      await fetchEmployeeCounts(); // Fetch employee counts after getting initial data
      await fetchPrices(); // Fetch prices after getting initial data
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

export default Department_Billing_Report;*/
import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

function Department_Billing_Report() {
  const [data, setData] = useState([]);
  const [employeeCounts, setEmployeeCounts] = useState({});
  const [departmentPrices, setDepartmentPrices] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

    setEmployeeCounts(counts);
  };

  const fetchPrices = async () => {
    const prices = {};
    let grandTotal = 0;

    for (const department of departments) {
      const q = query(
        collection(db, 'demo'),
        where('DEPARTMENT', '==', department),
        where('status', '==', 'Active')
      );
      const querySnapshot = await getDocs(q);
      
      let departmentTotal = 0;

      for (const doc of querySnapshot.docs) {
        const data = doc.data();
        console.log('Fetching price for Operator: ${data.OPERATOR}, Plan: ${data.PLAN}'); // Debug statement

        const planQuery = query(
          collection(db, 'Plan Details'),
          where('OPERATOR', '==', data.OPERATOR),
          where('PLAN', '==', data.PLAN)
        );
        const planSnapshot = await getDocs(planQuery);

        if (!planSnapshot.empty) {
          const planData = planSnapshot.docs[0].data();
          console.log('Price found: ${planData.PRICE} for ${data.OPERATOR} ${data.PLAN}'); // Debug statement
          departmentTotal += Number(planData.PRICE); // Ensure the PRICE is treated as a number
        } else {
          console.log('No price found for ${data.OPERATOR} ${data.PLAN}'); // Debug statement
        }
      }

      prices[department] = departmentTotal;
      grandTotal += departmentTotal;
    }

    setDepartmentPrices(prices);
    setGrandTotal(grandTotal);
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'demo'));
      const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(dataArray);
      await fetchEmployeeCounts(); // Fetch employee counts after getting initial data
      await fetchPrices(); // Fetch prices after getting initial data
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <div className="w-full bg-blue-700 py-4 flex justify-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Department Wise Report</h1>
      </div>


      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      ) : (
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

        <div className="mt-4 px-4 text-right">
          <Link to="/department-report">
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
              Generate Report
            </button>
          </Link>
        </div>
      </div>
      )}
    </div>
  );
}

export default Department_Billing_Report;