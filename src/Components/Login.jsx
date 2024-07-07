import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { db } from "../firebaseConfig"; // Adjust the path if your firebaseConfig.js is in a different directory
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

function Login() {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userQuery = query(
        collection(db, "Admin"),
        where("email", "==", username),
        where("password", "==", password) // Ensure password is hashed & securely stored in production
      );
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        let userLevel = null;
        querySnapshot.forEach((doc) => {
          userLevel = doc.data().level;
          localStorage.setItem("user", userLevel);
          localStorage.setItem("eid", doc.data().employeeID);
        });

        if (isAdmin && userLevel === 0) {
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/Admin_dashboard");
          }, 1500);
        } else if (!isAdmin && userLevel === 1) {
          toast.success("Login successful");
          setTimeout(() => {
            navigate("/Dealer_dashboard");
          }, 1500);
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        toast.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while logging in.");
    }
    setLoading(false);
  };

  const handleAdminClick = () => {
    setIsAdmin(true);
    setUsername(""); // Clear username field on mode switch
    setPassword(""); // Clear password field on mode switch
  };

  const handleDealerClick = () => {
    setIsAdmin(false);
    setUsername(""); // Clear username field on mode switch
    setPassword(""); // Clear password field on mode switch
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    handleLogin(); // Call your login function
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Toaster />
      <div className="flex flex-1 md:w-1/2 flex-col justify-center items-center bg-white text-center p-8">
        <h1 className={`text-3xl mb-4 ${isAdmin ? "text-blue-600" : "text-blue-600"}`}>
          East Coast Railway Bhubaneswar
        </h1>
        <img
          src="https://i.ibb.co/jWKX6w9/Screenshot-2024-06-08-122556.png"
          alt="Login Illustration"
          className="max-w-full h-auto mb-4 mix-blend-auto"
        />
        <h2 className={`text-2xl ${isAdmin ? "text-blue-500" : "text-blue-500"}`}>
          Closed User Group (CUG)
        </h2>
        <p className="text-gray-600">Stay Connected Stay in Loop</p>
      </div>
      <div className="flex justify-center items-center md:w-1/2 text-white p-8">
        <form
          onSubmit={handleFormSubmit} // Handle form submission
          className={`relative p-20 rounded-lg transition-all duration-500 transform ${
            isAdmin ? "bg-blue-500" : "bg-blue-500"
          }`}
        >
          <div className="absolute top-5 right-5 flex space-x-4">
            <span
              id="Admin"
              className={`cursor-pointer transition-colors duration-300 ${
                isAdmin ? "text-white" : "text-blue-200"
              }`}
              onClick={handleAdminClick}
            >
              Admin
            </span>
            <span
              id="Dealer"
              className={`cursor-pointer transition-colors duration-300 ml-4 ${
                !isAdmin ? "text-white" : "text-blue-200"
              }`}
              onClick={handleDealerClick}
            >
              Dealer
            </span>
          </div>
          <h2 className="text-2xl mb-4 cursor-pointer" id="formTitle">
            {isAdmin ? "Admin" : "Dealer"}
          </h2>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="User Name"
                className="w-full px-4 py-2 rounded-lg text-black"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 rounded-lg text-black"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-black"
              >
                {showPassword ? < FaEye/> : <FaEyeSlash/>}
              </button>
            </div>
            <div className="flex justify-between space-x-10 items-center mb-4 text-sm">
              <div>
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="text-blue-200 hover:underline">
                
              </a>
            </div>
            <button
              type="submit" // Change button type to submit
              className={`w-full py-2 rounded-lg transition-all duration-300 transform ${
                isAdmin
                  ? "bg-blue-800 hover:bg-blue-900 hover:scale-105"
                  : "bg-blue-800 hover:bg-blue-900 hover:scale-105"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
