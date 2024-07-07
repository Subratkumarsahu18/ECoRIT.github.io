import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import file from "../pics/file.png";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const Header = () => {
  const ref = useRef();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [img, setimg] = useState("https://via.placeholder.com/150");

  const eid = localStorage.getItem("eid");
  const level = localStorage.getItem("user");
  const [id, setid] = useState();
  const [user, setUser] = useState();
  useEffect(() => {
    const fetchfata = async () => {
      const userQuery = query(
        collection(db, "Admin"),
        where("employeeID", "==", eid) // Ensure password is hashed & securely stored in production
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        let userLevel = null;
        querySnapshot.forEach((doc) => {
          setid(doc.data().employeeName);
          setimg(doc.data().profilePic);
        });
      }
    };
    fetchfata();
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full bg-blue-700 py-4 flex flex-wrap justify-between items-center px-4 md:px-8">
      <div className="flex items-center space-x-2">
        <Link to={`${(level==0) ?"/Admin_dashboard":"/Dealer_dashboard"}`}>
          <img src={file} alt="Logo" className="w-12 h-12" />
        </Link>
        <div className="flex flex-col items-start">
          <Link to={`${(level==0) ?"/Admin_dashboard":"/Dealer_dashboard"}`}>
            <h1 className="text-3xl text-white leading-none">
              East Coast Railway
            </h1>
            <h2 className="text-xl text-white leading-none">Bhubaneswar</h2>
          </Link>
        </div>
      </div>
      <div className="flex space-x-2 md:space-x-4 mt-4 md:mt-0 ml-auto">
        {" "}
        {/* Adjusted margin top for mobile and added ml-auto */}
        <div className="relative flex justify-center space-x-2 items-center">
          <p>Welcome, {id}</p>
          <span
            className="hover:cursor-pointer"
            onMouseOver={() => setDropdownOpen(true)}
          >
            <img
              ref={ref}
              src={img || "https://via.placeholder.com/150"}
              height={100}
              width={100}
              className="h-6 rounded-full  w-6"
            />
          </span>
          {dropdownOpen && (
            <div
              onMouseLeave={() => setDropdownOpen(false)}
              className="absolute right-0 top-full mt-1 w-48 bg-white text-black rounded-lg shadow-lg py-2"
            >
              <Link
                to="/ProfilePage"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                My Profile
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location = "/";
                }}
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
