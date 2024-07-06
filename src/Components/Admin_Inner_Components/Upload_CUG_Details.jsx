import React, { useState } from 'react';
import { storage, db } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, writeBatch, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

function Upload_CUG_Details() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        alert('Please upload a .xlsx file.');
        return;
      }
      setFile(selectedFile);
    }
  };

  const validateData = (data) => {
    const planPrices = {
      'A': 74.61,
      'B': 59.05,
      'C': 39.9,
    };

    const billUnits = ['3101002', '3101003', '3101004', '3101981'];
    const allocations = [
      "00873105", "00873106", "02030519", "03011319", "03021319", "03031319",
      "03041319", "03053319", "03061319", "03071319", "03081319", "03091319",
      "03092319", "03093319", "11021519", "12011619"
    ];
    const operators = ['JIO', 'AIRTEL', 'VODAFONE'];
    const departments = ['S & T', 'ENGG', 'ELECT', 'ACCTS', 'OPTG', 'PERS', 'SECURITY', 'AUDIT', 'COMM', 'MED', 'GA', 'SAFETY', 'MECH', 'STORES', 'RRB'];

    const requiredColumns = [
      "CUG NO", "EMP NO", "NAME", "DESIGNATION", "DEPARTMENT",
      "BILL UNIT", "ALLOCATION", "OPERATOR", "PLAN", "PRICE"
    ];

    // Check for required columns
    const columns = Object.keys(data[0]);
    for (const col of requiredColumns) {
      if (!columns.includes(col)) {
        return `Missing required column: ${col}. Please ensure all required columns are present.`;
      }
    }

    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      const cugNumber = row['CUG NO'] ? row['CUG NO'].toString() : '';
      const plan = row['PLAN'];
      const price = parseFloat(row['PRICE']);
      const billUnit = row['BILL UNIT'] ? row['BILL UNIT'].toString() : '';
      const allocation = row['ALLOCATION'] ? row['ALLOCATION'].toString() : '';
      const operator = row['OPERATOR'];
      const department = row['DEPARTMENT'];
      const empNo = row['EMP NO'] ? row['EMP NO'].toString() : '';

      if (cugNumber.length !== 10 || !/^\d+$/.test(cugNumber)) {
        return `Invalid CUG NO at row ${rowIndex + 2}. CUG NO must be exactly 10 digits.`;
      }
      if (!['A', 'B', 'C'].includes(plan)) {
        return `Invalid PLAN at row ${rowIndex + 2}. PLAN must be A, B, or C.`;
      }
      if (price !== planPrices[plan]) {
        return `Invalid PRICE at row ${rowIndex + 2}. PRICE must be ${planPrices[plan]} for PLAN ${plan}.`;
      }
      if (billUnit.length !== 7 || !/^\d+$/.test(billUnit)) {
        return `Invalid BILL UNIT at row ${rowIndex + 2}. BILL UNIT must be exactly 7 numeric characters.`;
      }
      if (allocation.length !== 8 || !/^\d+$/.test(allocation)) {
        return `Invalid ALLOCATION at row ${rowIndex + 2}. ALLOCATION must be exactly 8 numeric characters.`;
      }
      if (!operators.includes(operator)) {
        return `Invalid OPERATOR at row ${rowIndex + 2}. Allowed values are: ${operators.join(', ')}.`;
      }
      if (!departments.includes(department)) {
        return `Invalid DEPARTMENT at row ${rowIndex + 2}. Allowed values are: ${departments.join(', ')}.`;
      }
      if (empNo.length !== 10 || !/^[a-zA-Z0-9]+$/.test(empNo)) {
        return `Invalid EMP NO at row ${rowIndex + 2}. EMP NO must be exactly 10 digits Alpha-Numeric.`;
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setLoading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target.result;
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          const errorMessage = validateData(jsonData);
          if (errorMessage) {
            alert(errorMessage);
            setLoading(false);
            setFile(null);
            return;
          }

          const batch = writeBatch(db);
          jsonData.forEach((row) => {
            const docRef = doc(collection(db, 'demo'));
            const { PRICE, ...dataToUpload } = row; // Exclude PRICE from the data being uploaded

            // Ensure all fields are strings
            Object.keys(dataToUpload).forEach(key => {
              dataToUpload[key] = dataToUpload[key].toString();
            });

            // Add activation_date and status fields
            const activationDate = new Date();
            const activationDateString = activationDate.toLocaleString('en-US', { hour12: true });
            dataToUpload.activation_date = activationDateString;
            dataToUpload.status = 'Active';

            batch.set(docRef, dataToUpload);
          });
          await batch.commit();

          setLoading(false); // Hide loader before alert
          alert('File uploaded successfully!');
          setFile(null);
          e.target.reset(); // Reset the form fields
        } catch (err) {
          console.error('Error parsing or uploading file data: ', err);
          alert('Failed to process and upload file.');
          setLoading(false); // Hide loader if there is an error
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Failed to upload file.');
      setLoading(false); // Hide loader if there is an error
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-blue-700 py-4 flex justify-start px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Upload CUG Details</h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4">


        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-4 text-black">Upload File</h2>
          <input
            type="file"
            accept=".xlsx"
            className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
          {loading && <div className="loader mt-4"></div>}
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mb-4 text-black">
        <h1 className="text-red-600" >INFORMATION</h1>
          <p><span className="text-red-600">*</span> CUG NO must be exactly 10 digits.</p>
          <p><span className="text-red-600">*</span> PLAN must be A, B, or C.</p>
          <p><span className="text-red-600">*</span> BILL UNIT must be exactly 7 numeric characters.</p>
          <p><span className="text-red-600">*</span> ALLOCATION must be exactly 8 numeric characters.</p>
          <p><span className="text-red-600">*</span> Please ensure all required columns are present: "CUG NO", "EMP NO", "NAME", "DESIGNATION", "DEPARTMENT", "BILL UNIT", "ALLOCATION", "OPERATOR", "PLAN", "PRICE".</p>
          <p><span className="text-red-600">*</span> The DEPARTMENTS are 'S & T', 'ENGG', 'ELECT', 'ACCTS', 'OPTG', 'PERS', 'SECURITY', 'AUDIT', 'COMM', 'MED', 'GA', 'SAFETY', 'MECH', 'STORES', 'RRB'.</p>
          <p><span className="text-red-600">*</span> The OPERATORS are 'JIO', 'AIRTEL', 'VODAFONE'.</p>
          <p><span className="text-red-600">*</span> EMP NO must be exactly 10 digits Alpha-Numeric.</p>
        </div>
    </div>
  );
}

export default Upload_CUG_Details;
