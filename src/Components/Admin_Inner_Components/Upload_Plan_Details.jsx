import React, { useState } from 'react';
import { storage, db } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, writeBatch, doc, addDoc, getDocs, query, where } from 'firebase/firestore';
import * as XLSX from 'xlsx';

function Upload_Plan_Details() {
  const [operator, setOperator] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        alert('Please upload a .xlsx file.');
        return;
      }

      setFile(selectedFile);
      setLoading(true);

      try {
        const fileRef = ref(storage, `Plan_report/${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        const fileURL = await getDownloadURL(fileRef);
        setUploadedFileURL(fileURL);
        setLoading(false);
      } catch (error) {
        console.error('Error uploading file: ', error);
        alert('Failed to upload file.');
        setLoading(false);
      }
    }
  };

  const validateRow = (row, rowIndex) => {
    const allowedFields = ['CUG NO', 'Periodic Charge', 'Amount Usage', 'Amount Data', 'Voice', 'Video', 'SMS', 'VAS'];
    const rowKeys = Object.keys(row);

    for (const key of rowKeys) {
      if (!allowedFields.includes(key)) {
        return `Error in row ${rowIndex + 1}: '${key}' is not allowed. Only the following fields are allowed: CUG NO, Periodic Charge, Amount Usage, Amount Data, Voice, Video, SMS, VAS.`;
      }
    }

    const cugNumber = row['CUG NO'] ?? '';
    if (!/^\d{10}$/.test(cugNumber)) {
      return `Error in row ${rowIndex + 1}, column 'CUG NO': Must contain exactly 10 numeric characters.`;
    }
  
    const numericFields = ['Periodic Charge', 'Amount Usage', 'Amount Data', 'Voice', 'Video', 'SMS', 'VAS'];
    for (const field of numericFields) {
      if (!/^\d+(\.\d+)?$/.test(row[field] ?? '') || parseFloat(row[field]) < 0) {
        return `Error in row ${rowIndex + 1}, column '${field}': Must contain only positive numbers or zero, including decimal values.`;
      }
    }
  
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !operator) {
      alert('Please select an operator and upload a file.');
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
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

          const batch = writeBatch(db);

          for (const [rowIndex, row] of jsonData.entries()) {
            const error = validateRow(row, rowIndex);
            if (error) {
              alert(error);
              window.location.reload();
              return;
            }

            const cugNumber = row['CUG NO'];
            const cugQuery = query(collection(db, 'bill'), where('CUG NO', '==', cugNumber));
            const querySnapshot = await getDocs(cugQuery);
            if (querySnapshot.empty) {
              const docRef = doc(collection(db, 'bill'));
              batch.set(docRef, {
                'CUG NO': cugNumber,
                'Periodic Charge': row['Periodic Charge'],
                'Amount Usage': row['Amount Usage'],
                'Amount Data': row['Amount Data'],
                'Voice': row['Voice'],
                'Video': row['Video'],
                'SMS': row['SMS'],
                'VAS': row['VAS'],
                operator: operator,
              });
            } else {
              console.log(`Skipping row with existing CUG NO: ${cugNumber}`);
            }
          }

          await batch.commit();

          await addDoc(collection(db, 'Plan_report_files'), {
            operator,
            fileName: file.name,
            fileURL: uploadedFileURL,
            uploadedAt: new Date(),
          });

          alert('File uploaded successfully!');
          setOperator('');
          setFile(null);
          setUploadedFileURL('');
          e.target.reset();
        } catch (err) {
          console.error('Error parsing or uploading file data: ', err);
          alert('Failed to process and upload file.');
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Failed to upload file.');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (uploadedFileURL) {
      window.open(uploadedFileURL, '_blank');
    } else {
      alert('No file uploaded.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full bg-blue-700 py-4 flex justify-start px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Upload Plan Details</h1>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl mb-4 text-black">Select Operator</h2>
          <select
            className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value="" disabled>Select Operator</option>
            <option value="JIO">JIO</option>
            <option value="AIRTEL">AIRTEL</option>
            <option value="VODAFONE">VODAFONE</option>
          </select>
          <h2 className="text-xl mb-4 text-black">Upload File</h2>
          <input
            type="file"
            accept=".xlsx"
            className="bg-gray-100 p-2 mb-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={handleFileChange}
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              onClick={handlePreview}
              disabled={!uploadedFileURL}
            >
              Preview
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mb-4 text-black">
        <h1 className="text-red-600" >INFORMATION</h1>
          <p><span className="text-red-600">*</span> CUG NO must be exactly 10 numeric characters.</p>
          <p><span className="text-red-600">*</span> Al the other fields will either accept 0 or positive value</p>
          <p><span className="text-red-600">*</span> willl on accept the fields mentioned below </p>
          <p><span className="text-red-600">*</span> CUG NO,	Periodic Charge,	Amount Usage,	Amount Data,	Voice,	Video,	SMS and 	VAS</p>
          
      </div>
    </div>
  );
}

export default Upload_Plan_Details;
