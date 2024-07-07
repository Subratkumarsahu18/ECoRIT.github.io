import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

function AllocationWiseReport() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'totalEmployees', direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [grandTotal, setGrandTotal] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);

  const tableHeaderRef = useRef(null);
  const tableBodyRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demoSnapshot = await getDocs(collection(db, 'demo'));
        const demoData = demoSnapshot.docs
          .map(doc => doc.data())
          .filter(item => item.status === 'Active');
        
        const planDetailsSnapshot = await getDocs(collection(db, 'Plan Details'));
        const planDetailsData = planDetailsSnapshot.docs.map(doc => doc.data());
        
        const allocationsData = demoData.reduce((acc, item) => {
          const allocationIndex = acc.findIndex(a => a.ALLOCATION === item.ALLOCATION);
          const planKey = `${item.OPERATOR}-${item.PLAN}`;

          if (allocationIndex === -1) {
            acc.push({
              ALLOCATION: item.ALLOCATION,
              totalEmployees: 1,
              plans: {
                [planKey]: 1,
              },
              prices: {
                [planKey]: findPrice(planDetailsData, item.OPERATOR, item.PLAN),
              },
            });
          } else {
            acc[allocationIndex].totalEmployees += 1;
            if (acc[allocationIndex].plans[planKey]) {
              acc[allocationIndex].plans[planKey] += 1;
            } else {
              acc[allocationIndex].plans[planKey] = 1;
            }
            acc[allocationIndex].prices[planKey] = findPrice(planDetailsData, item.OPERATOR, item.PLAN);
          }
          return acc;
        }, []);
        
        allocationsData.forEach(allocation => {
          let totalAmount = 0;
          Object.entries(allocation.plans).forEach(([planKey, count]) => {
            const price = allocation.prices[planKey];
            totalAmount += calculateTotalAmount(count, price);
          });
          allocation.totalAmount = totalAmount;
        });

        const total = allocationsData.reduce((acc, curr) => acc + curr.totalAmount, 0);
        setGrandTotal(total);

        const totalEmps = allocationsData.reduce((acc, curr) => acc + curr.totalEmployees, 0);
        setTotalEmployees(totalEmps);
        
        setData(allocationsData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateRowsPerPage = () => {
      const screenHeight = window.innerHeight;
      const tableHeaderHeight = tableHeaderRef.current ? tableHeaderRef.current.clientHeight : 0;
      const tableFooterHeight = 120;
      const rowHeight = 50;
      const availableHeight = screenHeight - tableHeaderHeight - tableFooterHeight;
      const maxRowsPerPage = Math.floor(availableHeight / rowHeight);
      return maxRowsPerPage > 0 ? maxRowsPerPage : 1;
    };

    const handleResize = () => {
      setRowsPerPage(calculateRowsPerPage());
    };

    setRowsPerPage(calculateRowsPerPage());
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sortData = () => {
    const sortedData = [...data].sort((a, b) => {
      const amountA = a.totalEmployees || 0;
      const amountB = b.totalEmployees || 0;

      if (sortConfig.direction === 'ascending') {
        return amountA - amountB;
      } else {
        return amountB - amountA;
      }
    });
    return sortedData;
  };

  const filteredData = data.filter(item =>
    item.ALLOCATION && item.ALLOCATION.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = sortData()
    .filter(item => filteredData.includes(item))
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const requestSort = () => {
    let direction = 'ascending';
    if (sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key: 'totalEmployees', direction });
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const findPrice = (planDetailsData, operator, plan) => {
    const foundPlan = planDetailsData.find(item => item.OPERATOR === operator && item.PLAN === plan);
    return foundPlan ? foundPlan.PRICE : 'N/A';
  };

  const calculateTotalAmount = (count, price) => {
    return count * price;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <div
        className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8"
        style={{ marginBottom: '1rem' }}>
        <h1 className="text-2xl md:text-3xl text-white">Allocation Wise Report</h1>
        <div>
          <input
            type="text"
            placeholder="Search by Allocation Number"
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between w-full px-4 mb-4">
        <div className="text-lg font-bold">Total Employees: {totalEmployees}</div>
        <div className="text-lg font-bold">Grand Total: {grandTotal}</div>
      </div>

      <div className="overflow-x-auto w-full" ref={tableBodyRef}>
        <table className="min-w-full bg-white rounded-lg shadow-lg mt-4">
          <thead>
            <tr className="w-full bg-blue-700 text-white">
              <th className="p-3 text-left">Allocation Number</th>
              <th className="p-3 text-left">Employees</th>
              <th className="p-3 text-left">Plans (EMP)</th>
              <th className="p-3 text-left">Prices</th>
              <th className="p-3 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                  key={`${row.ALLOCATION}-${index}`}
                >
                  <td className="p-3">{row.ALLOCATION}</td>
                  <td className="p-3">{row.totalEmployees}</td>
                  <td className="p-3">
                    {Object.entries(row.plans)
                      .map(([plan, count]) => ({
                        operator: plan.split('-')[0],
                        plan: plan.split('-')[1],
                        count
                      }))
                      .sort((a, b) => a.operator.localeCompare(b.operator) || a.plan.localeCompare(b.plan))
                      .map(({ operator, plan, count }, index) => (
                        <div key={`${operator}-${plan}-${index}`}>
                          {operator} {plan}: {count}
                        </div>
                      ))}
                  </td>
                  <td className="p-3">
                    {Object.entries(row.prices)
                      .map(([plan, price]) => (
                        <div key={`${plan}`}>
                          {price}
                        </div>
                      ))}
                  </td>
                  <td className="p-3">{row.totalAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="p-3 text-center" colSpan="5">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-150">
          Previous
        </button>
        <div className="px-4 py-2 text-gray-600">
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredData.length / rowsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-150">
          Next
        </button>
      </div>
      <Link
        to={{
          pathname: "/generate-report",
          state: { previousPath: location.pathname }
        }}
        className="self-end mt-6 mr-4 px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-700 transition duration-150">
        Generate Report
      </Link>
    </div>
  );
}

export default AllocationWiseReport;
