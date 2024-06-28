import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { collection, query, where, getDocs, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ActivateDeactivateNewCUG = () => {
  const [dispacdc, setdispacdc] = useState(false);
  const [enteredCUG, setEnteredCUG] = useState("");
  const [cugDetails, setCugDetails] = useState(null);
  const [cugDocId, setCugDocId] = useState(null);

  const handleCUGChange = (event) => {
    const value = event.target.value;
    // Validate input to allow only 10 numeric digits
    if (/^\d{0,10}$/.test(value)) {
      setEnteredCUG(value);
    }
  };

  const handleSubmit = async () => {
    // Validate CUG format (10 numeric digits)
    if (!/^\d{10}$/.test(enteredCUG)) {
      toast.error("CUG number should be exactly 10 numeric digits.");
      setEnteredCUG("");
      return;
    }

    try {
      const cugCollection = collection(db, "cug");
      const cugQuery = query(cugCollection, where("selectedCUG", "==", enteredCUG), where("status", "==", "Active"));
      const querySnapshot = await getDocs(cugQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          setCugDetails(doc.data());
          setCugDocId(doc.id);
        });
        setdispacdc(true);
      } else {
        toast.error("No active CUG available.");
      }
    } catch (error) {
      toast.error("Error fetching CUG data.");
      console.error("Error fetching CUG data: ", error);
    }
  };

  const handleDeactivate = async () => {
    if (cugDocId) {
      try {
        const docRef = doc(db, "cug", cugDocId);
        const deactivationTimestamp = Timestamp.now();
        const formattedTimestamp = deactivationTimestamp.toDate().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });

        // Update the CUG document
        await updateDoc(docRef, {
          status: "Deactivated",
          deactivatedAt: formattedTimestamp,
        });

        setCugDetails(null);
        setdispacdc(false);
        toast.success("CUG deactivated successfully.");
      } catch (error) {
        toast.error("Error deactivating CUG.");
        console.error("Error deactivating CUG: ", error);
      }
    } else {
      toast.error("CUG not found for deactivation.");
    }
  };

  return (
    <>
      <Toaster />
      {!dispacdc ? (
        <div className="flex flex-col items-center min-h-screen bg-white">
          <div className="w-full bg-blue-700 py-4 flex mb-10 justify-between items-center px-4 md:px-8">
            <h1 className="text-2xl md:text-3xl text-white">Deactivate CUG</h1>
          </div>
          <div className="w-full max-w-sm">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter CUG Number (10 digits)
              </label>
              <input
                type="text"
                value={enteredCUG}
                onChange={handleCUGChange}
                placeholder="Enter 10 Digit Number"
                className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={handleSubmit}
                className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center p-6 min-h-screen bg-gray-100 text-blue-600">
          <button
            onClick={() => setdispacdc(false)}
            className="absolute top-4 right-4 p-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <h1 className="text-xl font-bold mb-6">Deactivate CUG</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
            <div className="col-span-1 md:col-span-3">
              <label className="block text-sm font-medium text-gray-700">
                CUG Number
              </label>
              <input
                type="text"
                value={enteredCUG}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Number
              </label>
              <input
                type="text"
                value={cugDetails ? cugDetails.employeeNumber : ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                value={cugDetails ? cugDetails.employeeName : ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <input
                type="text"
                value={cugDetails ? cugDetails.selectedDivision : ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                value={cugDetails ? cugDetails.selectedDepartment : ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Bill Unit
              </label>
              <input
                type="text"
                value={cugDetails ? cugDetails.billUnit : ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allocation
              </label>
              <input
                type="text"
                value={cugDetails ? cugDetails.selectedAllocation : ""}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div className="flex items-center mt-4">
              <div className="flex flex-col items-start mr-4">
                <label className="block text-sm font-medium text-gray-700">
                  Operator:
                </label>
                <button className="bg-gray-200 text-gray-500 py-5 px-4 rounded-md cursor-not-allowed">
                  {cugDetails ? cugDetails.selectedOperator : ""}
                </button>
              </div>
              <div className="flex flex-col items-start mr-4">
                <label className="block text-sm font-medium text-gray-700">
                  Plan:
                </label>
                <button className="bg-gray-200 text-gray-500 py-2 px-4 rounded-md cursor-not-allowed">
                  {cugDetails ? cugDetails.selectedPlan : ""}
                </button>
              </div>
              <button
                className="ml-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                onClick={handleDeactivate}
              >
                Deactivate
              </button>
            </div>
            {cugDetails?.deactivatedAt && (
              <div className="col-span-1 md:col-span-3 mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Deactivated At
                </label>
                <input
                  type="text"
                  value={cugDetails.deactivatedAt}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ActivateDeactivateNewCUG;
