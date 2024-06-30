import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';

const Create_dealer = () => {
  console.log("Create_dealer component rendered");

  const [dealerDetails, setDealerDetails] = useState({
    employeeName: '',
    employeeID: '',
    contactNumber: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "employeeName" && !/^[a-zA-Z\s]*$/.test(value)) {
      toast.error("Employee Name should contain only alphabets.");
      return;
    }

    if (name === "employeeID" && !/^\d{0,11}$/.test(value)) {
      toast.error("Employee ID should be numeric and up to 11 digits.");
      return;
    }

    if (name === "contactNumber" && !/^\d{0,10}$/.test(value)) {
      toast.error("Contact Number should be numeric and up to 10 digits.");
      return;
    }

    setDealerDetails({ ...dealerDetails, [name]: value });
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return { minLength, hasUpperCase, hasLowerCase, hasDigit, hasSpecialChar };
  };

  const passwordValidation = validatePassword(dealerDetails.password);

  const handleSubmission = async () => {
    console.log("handleSubmission called");
    const { employeeName, employeeID, contactNumber, email, password } = dealerDetails;

    if (!employeeName || !employeeID || !contactNumber || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^\S+@(gmail\.com|yahoo\.com)$/.test(email)) {
      toast.error("Invalid email format. Please use only gmail.com or yahoo.com.");
      return;
    }

    if (!(passwordValidation.minLength && passwordValidation.hasUpperCase && passwordValidation.hasLowerCase && passwordValidation.hasDigit && passwordValidation.hasSpecialChar)) {
      toast.error("Password must meet all conditions.");
      return;
    }

    try {
      const adminDocRef = doc(db, "Admin", dealerDetails.employeeID);
      const adminDocSnap = await getDocs(query(collection(db, "Admin"), where("employeeID", "==", dealerDetails.employeeID)));

      if (!adminDocSnap.empty) {
        toast.error("Dealer already exists");
      } else {
        await setDoc(adminDocRef, {
          ...dealerDetails,
          level: 1
        });
        toast.success("Dealer is Created with level 1");

        // Reset form fields
        setDealerDetails({
          employeeName: '',
          employeeID: '',
          contactNumber: '',
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.error("Error in creating dealer:", error);
      toast.error(`An error occurred while creating the dealer: ${error.message}`);
    }
  };

  return (
    <>
      <Toaster />
      <div className="relative flex flex-col items-center p-6 min-h-screen bg-gray-100">
        <h1 className="text-xl font-bold mb-6 text-blue-600">Create Dealer</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee Name
            </label>
            <input
              type="text"
              name="employeeName"
              value={dealerDetails.employeeName}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              placeholder="Enter employee name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeID"
              value={dealerDetails.employeeID}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              placeholder="Enter employee ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={dealerDetails.contactNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              placeholder="Enter contact number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={dealerDetails.email}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              placeholder="Enter email address"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="flex items-center mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={dealerDetails.password}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                placeholder="Enter password"
              />
              <button
                type="button"
                className="ml-2 p-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              <ul>
                <li className={passwordValidation.minLength ? "text-green-500" : "text-red-500"}>
                  {passwordValidation.minLength ? "✔" : "✖"} Password must have at least 8 characters
                </li>
                <li className={passwordValidation.hasUpperCase ? "text-green-500" : "text-red-500"}>
                  {passwordValidation.hasUpperCase ? "✔" : "✖"} At least one uppercase letter
                </li>
                <li className={passwordValidation.hasLowerCase ? "text-green-500" : "text-red-500"}>
                  {passwordValidation.hasLowerCase ? "✔" : "✖"} At least one lowercase letter
                </li>
                <li className={passwordValidation.hasDigit ? "text-green-500" : "text-red-500"}>
                  {passwordValidation.hasDigit ? "✔" : "✖"} At least one digit
                </li>
                <li className={passwordValidation.hasSpecialChar ? "text-green-500" : "text-red-500"}>
                  {passwordValidation.hasSpecialChar ? "✔" : "✖"} At least one special character
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            onClick={handleSubmission}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Create_dealer;
