import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
//import firebase from '../../firebaseConfig'; // Import firebase configuration
import { db } from "../../firebaseConfig";
import { collection, query,where, getDocs,setDoc,doc, updateDoc,addDoc} from 'firebase/firestore'; // Import Firestore methods


const Create_dealer = () => {
  console.log("Create_dealer component rendered");
  const [showDetails, setShowDetails] = useState(false);
  const [employeeID, setEmployeeID] = useState("");
  const [dealerDetails, setDealerDetails] = useState({
    employeeName: '',
    employeeID: '',
    selectedDivision: '',
    selectedDepartment: '',
    selectedCUG: '',
    email: ''
  });
  

  const handleEmployeeChange = (event) => {
    console.log("handleEmployeeChange called");
    const value = event.target.value.trim(); // Trim whitespace

    // Validate if input contains only alphanumeric and has max length of 11
    if (/^[0-9a-zA-Z]{0,11}$/.test(value)) {
      setEmployeeID(value);
    } else {
      toast.error("Employee ID should be alphanumeric and up to 11 characters.");
      setEmployeeID("");
    }
  };
  const handleEmailChange = (event) => {
    setDealerDetails({ ...dealerDetails, email: event.target.value });
  };

  const handleSubmit = async () => {
    console.log("handleSubmit called with employeeID:", employeeID);
    try{
      const cugRef = collection(db, "cug"); // Reference to the "cug" collection
      
      // Query the collection for documents where employeeNumber matches the entered employeeID
      const q = query(cugRef, where("employeeNumber", "==", employeeID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming there's only one document matching the employeeID
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        
        setDealerDetails({
          ...data,
          employeeID: employeeID, // Set employeeID explicitly
          email: '', // Reset email field
        });
        setShowDetails(true);
      } else {
        toast.error("Invalid Employee ID. Please enter a valid Employee ID.");
        setEmployeeID("");
        setDealerDetails({
          employeeName: '',
          employeeID: '',
          selectedDivision: '',
          selectedDepartment: '',
          selectedCUG: '',
          email: '', // Reset dealerDetails if invalid
        }); // Reset dealerDetails if invalid
      }
    }catch (error) {
      console.error("Error fetching employee details:", error);
      toast.error(`An error occurred while fetching employee details: ${error.message}`);
    }
    
  };

  const handleSubmission = async () => {
    console.log("handleSubmission called");
    if (!validateEmail(dealerDetails.email)) {
      toast.error("Invalid email format. Please enter a valid email.");
      return;
    }
    try{
      const dealerDocRef = doc(db, "Dealer",dealerDetails.employeeID); // Reference to the "Dealer" collection
      const dealerDocSnap = await getDocs(query(collection(db, "Dealer"), where("employeeID", "==", dealerDetails.employeeID)));
      
      if (!dealerDocSnap.empty) {
        toast.error("Dealer already exists");
      } else {
        await setDoc(dealerDocRef, dealerDetails); // Set document in Firestore
        toast.success("Dealer is Created");

        // Update the cug collection with the email
        const cugDocRef =  await addDoc(collection(db, "cug"), {
          employeeNumber: dealerDetails.employeeID,
          email: dealerDetails.email,
        });//doc(db, "cug", dealerDetails.employeeID);
        //await updateDoc(cugDocRef, { email: dealerDetails.email });
        toast.success("Email added to cug collection");
      }
    }catch (error) {
      console.error("Error creating dealer:", error);
      toast.error(`An error occurred while creating the dealer: ${error.message}`);
    }
    
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      <Toaster />
      {!showDetails ? (
        <div className="flex flex-col items-center  min-h-screen bg-white">
          <div className="w-full bg-blue-700 py-4 flex mb-10 justify-between items-center px-4 md:px-8">
            <h1 className="text-2xl md:text-3xl text-white">Create Dealer</h1>
          </div>
          <div className="w-full max-w-sm">
            <label className="block text-sm font-medium text-gray-700">
              Enter Employee ID
            </label>
            <input
              type="text"
              value={employeeID}
              onChange={handleEmployeeChange}
              placeholder="Enter 11 Alphanumeric Characters"
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              maxLength={11}
            />
            <button
              onClick={handleSubmit} // Event handler for validating employeeID against Firestore
              className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700"
            >
              GO
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center p-6 min-h-screen bg-gray-100">
          <button
            onClick={() => setShowDetails(false)}
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
          <h1 className="text-xl font-bold mb-6 text-blue-600">Create Dealer</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee Name
              </label>
              <input
                type="text"
                value={dealerDetails.employeeName || ''}
                readOnly
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Employee ID
              </label>
              <input
                type="text"
                value={dealerDetails.employeeID || ''}
                readOnly
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Division
              </label>
              <input
                type="text"
                value={dealerDetails.selectedDivision || ''} // Assuming "selectedDivision" is the correct field name 
                readOnly
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                value={dealerDetails.selectedDepartment || ''}
                readOnly
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CUG Nummber
              </label>
              <input
                type="text"
                value={dealerDetails.selectedCUG || ''}
                readOnly
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={dealerDetails.email}
                onChange={handleEmailChange}
                className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                placeholder="Enter email address"
              />
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
      )}
    </>
  );
};

export default Create_dealer;
