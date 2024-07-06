import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

function DepartmentReport() {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [deduction, setDeduction] = useState(0);
  const [cgst, setCGST] = useState(0);
  const [sgst, setSGST] = useState(0);
  const [totalAmountPayable, setTotalAmountPayable] = useState(0);
  const [amountInWords, setAmountInWords] = useState('');
  const [loading, setLoading] = useState(true);
  
  const handleBackToReport = () => {
    navigate('/Department_Billing_Report');
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const departments = [
          'S & T', 'ENGG', 'ELECT', 'ACCTS', 'OPTG', 'PERS', 'SECURITY', 'AUDIT', 'COMM', 
          'MED', 'G A', 'SAFETY', 'MECH', 'STORES', 'RRB'
        ];

        const departmentData = [];

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

            // Fetch price logic (similar to Department_Billing_Report)
            const planQuery = query(
              collection(db, 'Plan Details'),
              where('OPERATOR', '==', data.OPERATOR),
              where('PLAN', '==', data.PLAN)
            );
            const planSnapshot = await getDocs(planQuery);

            if (!planSnapshot.empty) {
              const planData = planSnapshot.docs[0].data();
              departmentTotal += Number(planData.PRICE); // Ensure the PRICE is treated as a number
            } else {
              console.log('No price found for ${data.OPERATOR} ${data.PLAN}'); // Debug statement
            }
          }

          departmentData.push({ department, amount: departmentTotal });
        }

        setDepartmentData(departmentData);

        // Calculate grand total
        const total = departmentData.reduce((acc, curr) => acc + curr.amount, 0);
        setGrandTotal(total);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate Total Amount Payable whenever deduction, cgst, or sgst changes
    const calculateTotalAmountPayable = () => {
      const payable = grandTotal - deduction + cgst + sgst;
      setTotalAmountPayable(payable);

      // Convert amount to words
      const amountInWords = convertAmountToWords(payable);
      setAmountInWords(amountInWords);
    };

    calculateTotalAmountPayable();
  }, [grandTotal, deduction, cgst, sgst]);

  // Function to convert number to words
  const convertAmountToWords = (amount) => {
    // Implement your logic here to convert amount to words
  const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  const crore = Math.floor(amount / 10000000);
  const lakh = Math.floor((amount % 10000000) / 100000);
  const thousand = Math.floor((amount % 100000) / 1000);
  const hundreds = Math.floor((amount % 1000) / 100);
  const tensPlace = Math.floor((amount % 100) / 10);
  const onesPlace = Math.floor(amount % 10);

  let words = '';

  if (crore > 0) {
    words += convertNumberToWords(crore) + ' Crore ';
  }

  if (lakh > 0) {
    words += convertNumberToWords(lakh) + ' Lakh ';
  }

  if (thousand > 0) {
    words += convertNumberToWords(thousand) + ' Thousand ';
  }

  if (hundreds > 0) {
    words += convertNumberToWords(hundreds) + ' Hundred ';
  }

  if (tensPlace === 1) {
    words += teens[onesPlace] || units[onesPlace];
  } else if (tensPlace > 1) {
    words += tens[tensPlace] + ' ' + units[onesPlace];
  } else {
    words += units[onesPlace];
  }

  words += ' only';

  return words.trim();
};
   // return `(Rupees ${amount} only)`; // Example implementation
 // };
 const convertNumberToWords = (number) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  
    if (number === 0) {
      return '';
    }
  
    let words = '';
  
    if (number >= 100) {
      words += units[Math.floor(number / 100)] + ' Hundred ';
      number %= 100;
    }
  
    if (number >= 20) {
      words += tens[Math.floor(number / 10)];
      number %= 10;
      if (number > 0) {
        words += ' ' + units[number];
      }
    } else if (number >= 10) {
      words += teens[number - 10];
    } else {
      words += units[number];
    }
  
    return words.trim();
  };

  const handleDeductionChange = (e) => {
    setDeduction(Number(e.target.value));
  };

  const handleCGSTChange = (e) => {
    setCGST(Number(e.target.value));
  };

  const handleSGSTChange = (e) => {
    setSGST(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-gray-800">
      <div className="no-print w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white flex-1">Department Report</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mx-2"
        >
          Back to Report
        </button>
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Print
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
        ) : (

      <div className="w-full flex flex-col items-center space-y-4 my-4 px-4">
        <p className="text-center text-lg md:text-xl font-bold">
          East Coast Railway, Bhubaneswar
          <br />
          Statement Showing Bill Passing Register
        </p>
        <div className="w-full text-left">
          <p className="text-lg font-bold">Division: HQ</p>
        </div>

        <div className="overflow-x-auto w-full mt-8">
          <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-2 py-2 text-sm md:text-base text-left">Department</th>
                <th className="px-2 py-2 text-sm md:text-base text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map(({ department, amount }) => (
                <tr key={department}>
                  <td className="px-2 py-2 border border-gray-200 text-sm md:text-base">{department}</td>
                  <td className="px-2 py-2 border border-gray-200 text-sm md:text-base">₹{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full mt-4 flex flex-col items-end space-y-4">
          <p className="text-sm">Grand Total =₹{grandTotal}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
          <div className="flex items-center">
            <label className="text-sm">Deduction:</label>
            <input
              type="number"
              className="px-4 py-2  rounded-md ml-2 text-sm"
              value={deduction}
              onChange={handleDeductionChange}
            />
          </div>
          <div className="flex items-center">
            <label className="text-sm">CGST:</label>
            <input
              type="number"
              className="px-4 py-2  rounded-md ml-2 text-sm"
              value={cgst}
              onChange={handleCGSTChange}
            />
          </div>
          <div className="flex items-center">
            <label className="text-sm">SGST:</label>
            <input
              type="number"
              className="px-4 py-2  rounded-md ml-2 text-sm"
              value={sgst}
              onChange={handleSGSTChange}
            />
          </div>
          <p className="text-sm">Total Amount Payable = ₹{totalAmountPayable}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        </div>
        <div className="w-full mt-4 text-left">
          <p className="text-sm">
            Voucher No. : ECoIR/S&T/BBS/TELE/CUG<br />
            Bill Passed for Rs.{totalAmountPayable}.00 (Rupees {amountInWords})<br />
            and forwarded to FA&CAO/ECoR/BBS along with individual Bills and Dept. summary for audit arranging payment through cheque in favour of JIO , AIRTEL & VODAFONE , through NEFT/RTGS . Certified that amount drawn through this bill was not drawn previously and will not be drawn in future.
          </p>
        </div>

        <br /><br /><br />


        <div className="w-full text-right">
          <p className="text-lg">
            Dy. CSTE/Tele & NW/ECoR/BBS<br />
            For PCSTE/ECoR/BBS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </p>
        </div>

      </div>
        )}
    </div>
  );
}

export default DepartmentReport;
