import React, { useState } from 'react';
import { db } from "../../firebaseConfig"; // Adjust the path based on your actual Firebase setup
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

function Clear_Details() {
  const [selectedOption, setSelectedOption] = useState('');
  const [dealerOption, setDealerOption] = useState('all');
  const [dealerId, setDealerId] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    setDealerOption('all');
    setDealerId('');
  };

  const handleDealerOptionChange = (event) => {
    setDealerOption(event.target.value);
  };

  const handleDealerIdChange = (event) => {
    const { value } = event.target;
    // Validate alphanumeric and length exactly 11 characters
    if (/^[a-zA-Z0-9]{11}$/.test(value)) {
      setDealerId(value);
    } else {
      alert('EmployeeID must be alphanumeric and exactly 11 characters.');
    }
  };

  const handleClear = async () => {
    if (!selectedOption) return;

    try {
      if (selectedOption === 'plan') {
        const planDetailsRef = collection(db, 'Plan Details');
        const snapshot = await getDocs(planDetailsRef);
        snapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      } else if (selectedOption === 'dealer') {
        if (dealerOption === 'all') {
          const adminRef = collection(db, 'Admin');
          const q = query(adminRef, where('level', '==', 1));
          const snapshot = await getDocs(q);
          snapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        } else if (dealerOption === 'particular' && dealerId) {
          const adminRef = collection(db, 'Admin');
          const q = query(adminRef, where('level', '==', 1), where('employeeID', '==', dealerId));
          const snapshot = await getDocs(q);
          if (snapshot.empty) {
            alert('Dealer with the provided EmployeeID does not exist.');
            return;
          }
          snapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        }
      } else if (selectedOption === 'cug') {
        const demoRef = collection(db, 'demo');
        const snapshot = await getDocs(demoRef);
        snapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
      }

      console.log('Documents deleted successfully.');
      alert('Details deleted successfully.');
      // Reset state after successful deletion
      setSelectedOption('');
      setDealerOption('all');
      setDealerId('');

    } catch (error) {
      console.error('Error deleting documents: ', error);
      alert('Error deleting Documents!!! ')
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Clear Details</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center mt-8">
        <div className="w-full max-w-sm mx-auto bg-gray-200 p-6 rounded-lg shadow-md">
          <label className="text-lg mb-2 text-blue-700 font-medium">Select what you want to clear:</label>
          <select 
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-blue-100 shadow-sm mb-4"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="" disabled>Select an option</option>
            <option value="plan">Plan details</option>
            <option value="dealer">Dealer details</option>
            <option value="cug">CUG details</option>
          </select>

          {selectedOption === 'dealer' && (
            <div>
              <label className="text-lg mb-2 text-blue-700 font-medium">Select dealer option:</label>
              <select
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black bg-blue-100 shadow-sm mb-4"
                value={dealerOption}
                onChange={handleDealerOptionChange}
              >
                <option value="all">All</option>
                <option value="particular">Particular dealer</option>
              </select>

              {dealerOption === 'particular' && (
                <div>
                  <label className="text-lg mb-2 text-blue-700 font-medium">Enter employee ID:</label>
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm mb-4"
                    value={dealerId}
                    onChange={handleDealerIdChange}
                  />
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={handleClear}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clear_Details;
