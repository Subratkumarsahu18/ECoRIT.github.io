import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from '../../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";

const Add_new_CUG = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedCUG, setSelectedCUG] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedAllocation, setSelectedAllocation] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [billUnit, setBillUnit] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [selectedOperator, setSelectedOperator] = useState("");

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleCUGChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setSelectedCUG(value);
    }
  };

  const handleDesignationChange = (event) => {
    setSelectedDesignation(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleAllocationChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,8}$/.test(value)) {
      setSelectedAllocation(value);
    }
  };

  const handleEmployeeNumberChange = (event) => {
    const value = event.target.value;
    if (/^[0-9a-zA-Z]{0,11}$/.test(value)) {
      setEmployeeNumber(value);
    }
  };

  const handleBillUnitChange = (event) => {
    const value = event.target.value;
    if (/^\d{0,7}$/.test(value)) {
      setBillUnit(value);
    }
  };

  const handleEmployeeNameChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleOperatorChange = (event) => {
    setSelectedOperator(event.target.value);
  };

  const handleSubmit = async () => {
    // Validation checks
    if (!selectedCUG) {
      toast.error("Please enter a CUG Number.");
      return;
    }

    if (!/^\d{10}$/.test(selectedCUG)) {
      toast.error("CUG Number should be a valid 10-digit number.");
      setSelectedCUG("");
      return;
    }

    if (!employeeNumber) {
      toast.error("Please enter an Employee Number.");
      return;
    }

    if (!/^[0-9a-zA-Z]{11}$/.test(employeeNumber)) {
      toast.error("Employee Number should be 11 characters alphanumeric.");
      setEmployeeNumber("");
      return;
    }

    if (!selectedDesignation) {
      toast.error("Please enter a Designation.");
      return;
    }

    if (!selectedDepartment) {
      toast.error("Please select a Department.");
      return;
    }

    if (!selectedAllocation) {
      toast.error("Please enter an Allocation.");
      return;
    }

    if (!billUnit) {
      toast.error("Please enter a Bill Unit.");
      return;
    }

    if (!employeeName) {
      toast.error("Please enter Employee Name.");
      return;
    }

    if (!selectedOperator) {
      toast.error("Please select an Operator.");
      return;
    }

    try {
      // Check if the selectedCUG already exists in the database with status 'Active'
      const cugQuerySnapshot = await getDocs(query(collection(db, "demo"), where("CUG NO", "==", selectedCUG), where("status", "==", "Active")));
      
      if (!cugQuerySnapshot.empty) {
        toast.error("CUG number already exists and is Active.");
        return;
      }

      // Check if the employeeNumber already exists in the database
      const empQuerySnapshot = await getDocs(query(collection(db, "demo"), where("EMP NO", "==", employeeNumber)));
      
      if (!empQuerySnapshot.empty) {
        toast.error("Employee Number already exists.");
        return;
      }

      // Proceed to add the new CUG member
      const newCUGData = {
        "CUG NO": selectedCUG,
        "EMP NO": employeeNumber,
        "NAME": employeeName,
        "DESIGNATION": selectedDesignation,
        "DEPARTMENT": selectedDepartment,
        "BILL UNIT": billUnit,
        "ALLOCATION": selectedAllocation,
        "OPERATOR": selectedOperator,
        "PLAN": selectedPlan,
        status: "Active", // Default status when activated
        activation_date: new Date().toLocaleString(),
      };

      await addDoc(collection(db, "demo"), newCUGData);
      toast.success("New CUG member added successfully");
      setSelectedCUG("");
      setSelectedDesignation("");
      setSelectedDepartment("");
      setSelectedAllocation("");
      setEmployeeNumber("");
      setBillUnit("");
      setEmployeeName("");
      setSelectedPlan("");
      setSelectedOperator("");

    } catch (error) {
      toast.error("Error adding document: " + error.message);
    }
  };

  const departments = [
    "S & T" , "ENGG" , "ELECT" , "ACCTS" , "OPTG" , "PERS" , "SECURITY" , "AUDIT" , "COMM" , "MED", "GA" , "SAFETY" , "MECH","STORES","RRB"
  ];

  const planAmounts = {
    "Plan A": "₹ 10",
    "Plan B": "₹ 20",
    "Plan C": "₹ 30",
  };

  return (
    <>
      <Toaster />
      <div className="flex flex-col items-center min-h-screen bg-white">
        <div className="w-full bg-blue-700 py-4 flex mb-10 justify-between items-center px-4 md:px-8">
          <h1 className="text-2xl md:text-3xl text-white">Activate New CUG</h1>
        </div>
        <div className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Enter CUG Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={selectedCUG}
              onChange={handleCUGChange}
              placeholder="Enter 10 Digit Number"
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              onClick={handleSubmit}
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </div>

        {selectedCUG && (
          <div className="flex flex-col items-center p-6 h-fit bg-gray-100 text-blue-600">
            <h1 className="text-xl font-bold mb-6">Activate New CUG</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
              <div className="col-span-1 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  CUG Number
                </label>
                <input
                  type="text"
                  value={selectedCUG}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={employeeNumber}
                  onChange={handleEmployeeNumberChange}
                  placeholder="Enter 11 Digit Alpha-Numeric"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={handleEmployeeNameChange}
                  placeholder="Enter Employee Name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Designation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedDesignation}
                  onChange={handleDesignationChange}
                  placeholder="Enter Designation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bill Unit <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={billUnit}
                  onChange={handleBillUnitChange}
                  placeholder="Enter Bill Unit"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Allocation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={selectedAllocation}
                  onChange={handleAllocationChange}
                  placeholder="Enter Allocation"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Operator <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedOperator}
                  onChange={handleOperatorChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Operator</option>
                  <option value="AIRTEL">AIRTEL</option>
                  <option value="VODAFONE">VODAFONE</option>
                  <option value="BSNL">JIO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plan <span className="text-red-500">*</span>
                </label>
                <select
                  value={selectedPlan}
                  onChange={handlePlanChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Plan</option>
                  {Object.keys(planAmounts).map((plan) => (
                    <option key={plan} value={plan}>
                      {plan} - {planAmounts[plan]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1 md:col-span-3">
                <button
                  onClick={handleSubmit}
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
                >
                  Activate New CUG
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Add_new_CUG;

