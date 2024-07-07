import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Adjust the path as needed


function GenerateReportPage() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const previousPath = location.state?.from || '/allocation-wise-report';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const demoSnapshot = await getDocs(collection(db, 'demo'));
        const demoData = demoSnapshot.docs
          .map(doc => doc.data())
          .filter(item => item.status === 'Active'); // Filter by status

        // Fetch prices from Plan Details collection
        const planDetailsSnapshot = await getDocs(collection(db, 'Plan Details'));
        const planDetailsData = planDetailsSnapshot.docs.map(doc => doc.data());

        // Calculate total employees for each allocation number and plans with operators
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

        // Calculate total amount for each allocation
        allocationsData.forEach(allocation => {
          let totalAmount = 0;
          Object.entries(allocation.plans).forEach(([planKey, count]) => {
            const price = allocation.prices[planKey];
            totalAmount += calculateTotalAmount(count, price);
          });
          allocation.totalAmount = totalAmount;
        });

        setData(allocationsData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  // Function to find price based on operator and plan from Plan Details data
  const findPrice = (planDetailsData, operator, plan) => {
    const foundPlan = planDetailsData.find(item => item.OPERATOR === operator && item.PLAN === plan);
    return foundPlan ? foundPlan.PRICE : 'N/A';
  };

  // Function to calculate total amount for a plan
  const calculateTotalAmount = (count, price) => {
    return count * price;
  };

  const handlePrint = () => {
    window.print();
  };

  const numberToWords = (num) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    let words = '';

    if (num > 999) {
      words += numberToWords(Math.floor(num / 1000)) + ' Thousand ';
      num %= 1000;
    }

    if (num > 99) {
      words += units[Math.floor(num / 100)] + ' Hundred ';
      num %= 100;
    }

    if (num > 19) {
      words += tens[Math.floor(num / 10)] + ' ';
      num %= 10;
    }

    if (num > 9) {
      words += teens[num - 10];
      num = 0;
    } else if (num > 0) {
      words += units[num];
    }

    return words.trim();
  };

  const ReportPage = () => {
    const currentDate = new Date().toLocaleDateString();

    const grandTotal = data.reduce((sum, row) => sum + row.totalAmount, 0);
    const cgst = grandTotal * 0.09;
    const sgst = grandTotal * 0.09;
    const totalPayable = grandTotal + cgst + sgst;

    // Convert total payable amount to words
    const totalPayableInWords = numberToWords(Math.floor(totalPayable)) + ' Rupees Only';

    // Template for the text below the totals
    const templateText = `Passed for ₹ ${totalPayable.toFixed(2)} (${totalPayableInWords}) and forwarded to FA & CAOIX/BBS for audit and arranging the payment of net amount of ₹ ${totalPayable.toFixed(2)} (${totalPayableInWords}).`;

    return (
      <div className="mt-8">
        <div className="overflow-x-auto w-full mt-4">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="w-full bg-blue-700 text-white">
                <th className="p-3 text-left">Allocation Number</th>
                <th className="p-3 text-left">Current Date</th>
                <th className="p-3 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={`${item.ALLOCATION}-${index}`}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                >
                  <td className="p-3">{item.ALLOCATION}</td>
                  <td className="p-3">{currentDate}</td> {/* Example for current date */}
                  <td className="p-3">{item.totalAmount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2" className="text-right pr-3 font-semibold border-t border-grey">Grand Total:</td>
                <td className="p-3 border-t border-grey">₹ {grandTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-right pr-3 font-semibold">CGST (9%):</td>
                <td className="p-3">₹{cgst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-right pr-3 font-semibold border-b border-black">SGST (9%):</td>
                <td className="p-3 border-b border-black">₹{sgst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="2" className="text-right pr-3 font-semibold border-b border-black">TOTAL PAYABLE AMOUNT:</td>
                <td className="p-3 border-b border-black">₹{totalPayable.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        
        <div className="flex flex-col items-start justify-end p-4">
        <div className="text mt-4">
        <div className="text-center mt-8">{templateText}</div><br /><br />
          <div className="border-t border-black w-1/3 ml-auto pt-2 mb-4 text-right pr-8">
            <p className="mt-2">For PCSTE/ECOR<br />ECo Rly, Bhubaneswar.</p>
          </div>
          <br />
          <p>Passed for ({totalPayableInWords} Only)</p>
          <div className="amount-details mt-4">
            <table className="w-full">
              <tbody>
                <tr className="border-t border-gray-200">
                  <td className="p-3"></td>
                  <td className="p-3 text-left font-semibold">Gross Amount:</td>
                  <td className="p-3 font-semibold">₹ {grandTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-3"></td>
                  <td className="p-3 text-left font-semibold">Deduction Amount:</td>
                  <td className="p-3 font-semibold">₹ 0</td>
                </tr>
                <tr>
                  <td className="p-3"></td>
                  <td className="p-3 text-left font-semibold">After Deduction:</td>
                  <td className="p-3 font-semibold">₹ {grandTotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-3"></td>
                  <td className="p-3 text-left font-semibold">CGST (9%):</td>
                  <td className="p-3 font-semibold">₹ {cgst.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="p-3"></td>
                  <td className="p-3 text-left font-semibold">SGST (9%):</td>
                  <td className="p-3 font-semibold">₹ {sgst.toFixed(2)}</td>
                </tr>
                <tr className="border-t border-gray-200">
                  <td className="p-3"></td>
                  <td className="p-3 text-left font-semibold">Total Payable Amount:</td>
                  <td className="p-3 font-semibold ">₹ {totalPayable.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <br />
          <div className="border-t border-black w-1/3 ml-auto pt-2 mb-4 text-right pr-8">
            <p className="mt-2">For FA & CAO ( Expenditure)<br />ECo Rly, Bhubaneswar.</p>
          </div>
        </div>
      </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <div className="flex justify-between p-4">
      <button
  onClick={() => navigate(-1)}
  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded no-print"
>
  Back
</button>
<button
  onClick={handlePrint}
  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded no-print"
>
  Print
</button>

      </div>
      <h2 className="text-2xl font-semibold text-center mb-4">
        East Coast Railway<br />Bhubaneswar<br />Consolidated CUG Bill
      </h2>
      <ReportPage />
    </div>
  );
}

export default GenerateReportPage;
