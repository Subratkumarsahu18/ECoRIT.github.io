import React from 'react';
import { useNavigate } from 'react-router-dom';
import './print-styles.css'; // Import the CSS file

const data = [
  { allocationNumber: '3100873105', totalAmount: 11025.00 },
  { allocationNumber: '3100873106', totalAmount: 11805.00 },
  { allocationNumber: '3102030519', totalAmount: 352.00 },
  { allocationNumber: '3103011319', totalAmount: 6615.00 },
  { allocationNumber: '3103021319', totalAmount: 9475.00 },
  { allocationNumber: '3103031319', totalAmount: 2270.00 },
  { allocationNumber: '3103041319', totalAmount: 2881.00 },
  { allocationNumber: '3103053319', totalAmount: 9495.00 },
  { allocationNumber: '3103061319', totalAmount: 2781.00 },
  { allocationNumber: '3103071319', totalAmount: 2821.00 },
  { allocationNumber: '3103081319', totalAmount: 5495.00 },
  { allocationNumber: '3103091319', totalAmount: 3151.00 },
  { allocationNumber: '3103092319', totalAmount: 4560.00 },
  { allocationNumber: '3103093319', totalAmount: 729.00 },
  { allocationNumber: '3111021519', totalAmount: 2702.00 },
  { allocationNumber: '3112011619', totalAmount: 3059.00 },
];

// Function to convert number to words
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
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString();

  const grandTotal = data.reduce((sum, row) => sum + row.totalAmount, 0);
  const cgst = grandTotal * 0.09;
  const sgst = grandTotal * 0.09;
  const totalPayable = grandTotal + cgst + sgst;

  // Convert total payable amount to words
  const totalPayableInWords = numberToWords(Math.floor(totalPayable)) + ' Rupees';

  const handlePrint = () => {
    window.print(); // Invoke browser print functionality
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Report</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-4"
        >
          Back to Report
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Print Report
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="overflow-x-auto w-full">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="w-full bg-blue-700 text-white">
                <th className="p-3 text-left">Allocation Number</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-150 ease-in-out"
                  key={row.allocationNumber}
                >
                  <td className="p-3">{row.allocationNumber}</td>
                  <td className="p-3">{currentDate}</td>
                  <td className="p-3">₹ {row.totalAmount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-t border-gray-200">
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">Grand Total:</td>
                <td className="p-3 font-semibold">₹ {grandTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">CGST (9%):</td>
                <td className="p-3 font-semibold">₹ {cgst.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">SGST (9%):</td>
                <td className="p-3 font-semibold">₹ {sgst.toFixed(2)}</td>
              </tr>
              <tr className="border-t border-b border-gray-200">
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">Total Payable Amount:</td>
                <td className="p-3 font-semibold">₹ {totalPayable.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-left justify-end p-4">
        <div className="text mt-4">
          <p>Passed for Rs. {totalPayable.toFixed(2)} ({totalPayableInWords} Only) and forwarded to FA & CAO/BBS for audit and arranging the payment of net amount of Rs. {totalPayable.toFixed(2)} ({totalPayableInWords} Only)</p>
          <br />
          <div className="border-t border-black w-1/6 ml-auto pt-2 mb-4 text-right pr-8">
            <p className="mt-2">For PCSTE/ECOR<br />ECo Rly, Bhubaneswar.</p>
          </div>
          <br />
          <p>Passed for ({totalPayableInWords} Only)</p>
          <table className="w-full">
            <tbody>
              <tr className="border-t border-gray-200">
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">Gross Amount:</td>
                <td className="p-3 font-semibold">₹ {grandTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">Deduction Amount:</td>
                <td className="p-3 font-semibold">₹ 0</td>
              </tr>
              <tr className="border-t border-gray-200">
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">After Deduction:</td>
                <td className="p-3 font-semibold">₹ {grandTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">CGST (9%):</td>
                <td className="p-3 font-semibold">₹ {cgst.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">SGST (9%):</td>
                <td className="p-3 font-semibold">₹ {sgst.toFixed(2)}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="p-3"></td>
                <td className="p-3 text-right font-semibold">Total Payable Amount:</td>
                <td className="p-3 font-semibold">₹ {totalPayable.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-4 text-sm text-gray-600 text-center">
        <p>This is an auto-generated report. Do not modify directly.</p>
      </div>
    </div>
  );
};

export default ReportPage;
