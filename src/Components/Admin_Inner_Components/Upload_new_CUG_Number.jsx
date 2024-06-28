import React, { useState } from 'react';
import { storage, db } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 

function Upload_new_CUG_Number() {
  const [operator, setOperator] = useState('');
  const [file, setFile] = useState(null);
  const [uploadedFileURL, setUploadedFileURL] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setLoading(true);
      try {
        const fileRef = ref(storage, `Plan_report/${selectedFile.name}`);
        await uploadBytes(fileRef, selectedFile);
        const fileURL = await getDownloadURL(fileRef);
        setUploadedFileURL(fileURL);
      } catch (error) {
        console.error("Error uploading file: ", error);
        alert('Failed to upload file.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !operator) {
      alert('Please select an operator and a file to upload.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'Plan_report'), {
        operator,
        fileName: file.name,
        fileURL: uploadedFileURL,
        uploadedAt: new Date(),
      });

      alert('File uploaded successfully!');
      setOperator('');
      setFile(null);
      setUploadedFileURL('');
      e.target.reset(); // Reset the form fields
    } catch (error) {
      console.error("Error uploading file: ", error);
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

export default Upload_new_CUG_Number;
