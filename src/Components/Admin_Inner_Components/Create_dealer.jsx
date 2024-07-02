import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "../../firebaseConfig";
import { collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
// import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';

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
      alert("Employee Name should contain only alphabets.");
      return;
    }
    

    if (name === "employeeID" && (!/^[a-zA-Z0-9]*$/.test(value)|| value.length > 11)) {
      alert("Employee ID should be alphanumeric and exactly 11 characters.");
      return;
    }

    if (name === "contactNumber" && (!/^\d*$/.test(value)||value.length > 10)) {
      alert("Contact Number should be numeric and exactly 10 digits.");
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
    if (employeeID.length !== 11 || !/^[a-zA-Z0-9]{11}$/.test(employeeID)) {
      toast.error("Employee ID should be alphanumeric and exactly 11 characters.");
      return;
    }

    if (contactNumber.length !== 10 || !/^\d{10}$/.test(contactNumber)) {
      toast.error("Contact Number should be exactly 10 digits.");
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
      // Check for existing dealer by employeeID
      const employeeIDQuery = query(
        collection(db, "Admin"),
        where("employeeID", "==", employeeID),
        where("level", "==", 1)
      );
      const employeeIDSnap = await getDocs(employeeIDQuery);

      if (!employeeIDSnap.empty) {
        toast.error(`Dealer with Employee ID ${employeeID} already exists.`);
        return;
      }

      // Check for existing dealer by contactNumber
      const contactNumberQuery = query(
        collection(db, "Admin"),
        where("contactNumber", "==", contactNumber),
        where("level", "==", 1)
      );
      const contactNumberSnap = await getDocs(contactNumberQuery);

      if (!contactNumberSnap.empty) {
        toast.error(`Dealer with Contact Number ${contactNumber} already exists.`);
        return;
      }

      // Check for existing dealer by email
      const emailQuery = query(
        collection(db, "Admin"),
        where("email", "==", email),
        where("level", "==", 1)
      );
      const emailSnap = await getDocs(emailQuery);

      if (!emailSnap.empty) {
        toast.error(`Dealer with Email ${email} already exists.`);
        return;
      }

      const adminDocRef = doc(db, "Admin", dealerDetails.employeeID);
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
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
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
