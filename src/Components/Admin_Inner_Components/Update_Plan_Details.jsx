import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

function Update_Plan_Details() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'Plan Details'));
      const rows = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        rows.push({
          id: doc.id,
          operator: data['OPERATOR'],
          plan: data['PLAN'],
          price: data['PRICE'],
        });
      });
      setData(rows);
    };

    fetchData();
  }, []);

  // Group and sort the data by operator and then by plan (A, B, C)
  const groupedData = data.reduce((acc, item) => {
    const { operator, plan, price, id } = item;
    if (!acc[operator]) {
      acc[operator] = [];
    }
    acc[operator].push({ plan, price, id });
    acc[operator].sort((a, b) => {
      const planOrder = { A: 1, B: 2, C: 3 };
      return planOrder[a.plan] - planOrder[b.plan];
    });
    return acc;
  }, {});

  // Function to handle update action
  const handleUpdate = () => {
    setIsEditing(true);
  };

  // Function to handle save action
  const handleSave = async () => {
    setIsEditing(false);
    for (const operator of Object.keys(groupedData)) {
      for (const plan of groupedData[operator]) {
        const docRef = doc(db, 'Plan Details', plan.id);
        await updateDoc(docRef, { PRICE: plan.price });
      }
    }
  };

  // Function to handle price change
  const handlePriceChange = (operator, plan, newPrice) => {
    const updatedData = data.map((item) => {
      if (item.operator === operator && item.plan === plan) {
        return { ...item, price: newPrice };
      }
      return item;
    });
    setData(updatedData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col text-gray-800">
      {/* Header with Update Button */}
      <div className="w-full bg-blue-700 py-4 flex justify-between items-center px-4 md:px-8">
        <h1 className="text-2xl md:text-3xl text-white">Update Plan Details</h1>
        {!isEditing ? (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {/* Table */}
        <div className="overflow-x-auto w-full space-y-8">
          {Object.keys(groupedData).map((operator, index) => (
            <div key={index} className="w-full">
              <h2 className="text-xl mb-4 text-blue-700">{operator}</h2>
              <div className="max-w-screen-md mx-auto">
                <table className="w-full bg-white rounded-lg shadow-lg">
                  <thead>
                    <tr className="bg-blue-700 text-white">
                      <th className="px-4 py-2 text-left">Plan</th>
                      <th className="px-4 py-2 text-left">Price (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedData[operator].map((planData, idx) => (
                      <tr key={idx} className={`${idx % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                        <td className="px-4 py-2">{planData.plan}</td>
                        <td className="px-4 py-2">
                          {isEditing ? (
                            <input
                              type="number"
                              value={planData.price}
                              onChange={(e) => handlePriceChange(operator, planData.plan, e.target.value)}
                              className="w-full px-2 py-1 border rounded"
                            />
                          ) : (
                            planData.price
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Update_Plan_Details;
