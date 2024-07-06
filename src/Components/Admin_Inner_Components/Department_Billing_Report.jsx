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
import { db } from '../../firebaseConfig'; // Adjust the import path as needed
import { collection, query, where, getDocs } from 'firebase/firestore'; // Correct import
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Department_Billing_Report() {
  const [data, setData] = useState([]);
  const [employeeCounts, setEmployeeCounts] = useState({});
  const [departmentPrices, setDepartmentPrices] = useState({});
  const [grandTotal, setGrandTotal] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [cgst, setCGST] = useState(0);
  const [sgst, setSGST] = useState(0);
  const [totalPayable, setTotalPayable] = useState(0);

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

        const planQuery = query(
          collection(db, 'Plan Details'),
          where('OPERATOR', '==', data.OPERATOR),
          where('PLAN', '==', data.PLAN)
        );
        const planSnapshot = await getDocs(planQuery);

        if (!planSnapshot.empty) {
          const planData = planSnapshot.docs[0].data();
          departmentTotal += Number(planData.PRICE);
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
      await fetchEmployeeCounts();
      await fetchPrices();
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const payableAmount = grandTotal - deduction + cgst + sgst;
    setTotalPayable(payableAmount);
  }, [grandTotal, deduction, cgst, sgst]);

  const generateReportPDF = () => {
    // Initialize jsPDF instance
    const doc = new jsPDF('p', 'pt', 'a4');
    
    // Set text alignment to center
    doc.text("East Coast Railway, Bhubaneswar", doc.internal.pageSize.getWidth() / 2, 40, { align: 'center' });
    doc.text("Statement Showing Bill Passing Register", doc.internal.pageSize.getWidth() / 2, 60, { align: 'center' });
    doc.text("\n", doc.internal.pageSize.getWidth() / 2, 80); // Empty line
    
    // Table data
    const tableData = departments.map(department => {
      return [department, `${departmentPrices[department] || 0}`]; // No ₹ symbol here
    });
    
    // Set table headers (renamed Price to Amount)
    const headers = [['Department', 'Amount']];
    
    // Add auto-generated table (centered)
    doc.autoTable({
      startY: 100,
      head: headers,
      body: tableData,
      theme: 'grid',
      styles: {
        cellPadding: 5,
        fontSize: 12,
        valign: 'middle',
        halign: 'center',
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' },
      },
    });
    
    // Summary section
    const summary = [
      ['Grand Total', `${grandTotal}`],
      ['Deduction', `${deduction}`],
      ['CGST', `${cgst}`],
      ['SGST', `${sgst}`],
      ['Total Amount Payable', `${totalPayable}`],
    ];
    
    // Add summary section
    doc.autoTable({
      startY: doc.previousAutoTable.finalY + 20,
      body: summary,
      theme: 'grid',
      styles: {
        cellPadding: 5,
        fontSize: 12,
        valign: 'middle',
        halign: 'center',
      },
      columnStyles: {
        0: { halign: 'left' },
        1: { halign: 'right' },
      },
    });
    
    // Save the PDF
    doc.save('department_billing_report.pdf');
  };

  const renderRows = () => {
    return departments.map(department => (
      <tr key={department}>
        <td className="p-3 border border-blue-500">{department} (Employees: {employeeCounts[department] || 0})</td>
        <td className="p-3 border border-blue-500">{departmentPrices[department] || 0}</td>
      </tr>
    ));
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
                <th className="p-3 text-left border border-blue-500">Amount</th>
              </tr>
            </thead>
            <tbody>
              {renderRows()}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <div>
            <label htmlFor="deduction" className="block text-sm font-medium text-gray-700">Deduction</label>
            <input
              id="deduction"
              type="number"
              value={deduction}
              onChange={(e) => setDeduction(Number(e.target.value))}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-20 sm:text-sm border-gray-300 rounded-md text-right"
            />
          </div>
          <div>
            <label htmlFor="cgst" className="block text-sm font-medium text-gray-700">CGST</label>
            <input
              id="cgst"
              type="number"
              value={cgst}
              onChange={(e) => setCGST(Number(e.target.value))}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-20 sm:text-sm border-gray-300 rounded-md text-right"
            />
          </div>
          <div>
            <label htmlFor="sgst" className="block text-sm font-medium text-gray-700">SGST</label>
            <input
              id="sgst"
              type="number"
              value={sgst}
              onChange={(e) => setSGST(Number(e.target.value))}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-20 sm:text-sm border-gray-300 rounded-md text-right"
            />
          </div>
        </div>

        <div className="mt-4 text-center">
          <strong>Total Payable Amount: ₹{totalPayable}</strong>
        </div>

        <button
          onClick={generateReportPDF}
          className="mt-4 px-6 py-2 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-blue-500"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}

export default Department_Billing_Report;
