import React, { useState } from 'react';
import { storage, db } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, writeBatch, doc } from 'firebase/firestore';
import * as XLSX from 'xlsx';

function Upload_CUG_Details() {
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
        const fileRef = ref(storage, `cug_details/${selectedFile.name}`);
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

          const batch = writeBatch(db);
          jsonData.forEach((row) => {
            const docRef = doc(collection(db, 'cug_details'));
            batch.set(docRef, row);
          });
          await batch.commit();

          alert('File uploaded successfully!');
          setFile(null);
          setUploadedFileURL('');
          e.target.reset(); // Reset the form fields
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
    if (file) {
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert('No file uploaded.');
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
    </div>
  );
}

export default Upload_CUG_Details;
