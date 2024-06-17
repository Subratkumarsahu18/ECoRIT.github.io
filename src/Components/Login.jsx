import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const dealer = {
    username: "cug@dealer",
    password: "1234",
  };
  const admin = {
    username: "cug@admin",
    password: "1234",
  };
  const [isAdmin, setIsAdmin] = useState(true);
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const handeAdminLogin = (e) => {

    if (isAdmin) {
      if (username == admin.username && password == admin.password) {
        toast.success("Login successful");
        console.log("success")
        setTimeout(() => {
          
          window.location = "/Admin_dashboard";
        }, 1500);
      } else {
        toast.error("Invalid credentials");
        window.location.reload();
      }
    } else if (username == dealer.username && password == dealer.password) {
      toast.success("Login successful");
      setTimeout(() => {
        window.location = "/Dealer_dashboard";
      }, 1500);
    } else {
      toast.error("Invalid credentials");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    }
  };

  const handleAdminClick = () => {
    setIsAdmin(true);
  };

  const handleDealerClick = () => {
    setIsAdmin(false);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <Toaster />

      {/* Left Section */}
      <div className="flex flex-1 ld:w-1/2 flex-col justify-center items-center bg-white text-center p-8">
        <h1 className="text-3xl text-blue-600 mb-4">
          East Coast Railway Bhubaneswar
        </h1>
        <img
          src="https://i.ibb.co/jWKX6w9/Screenshot-2024-06-08-122556.png"
          alt="Login Illustration"
          className="max-w-full h-auto mb-4 mix-blend-auto"
        />
        <h2 className="text-2xl text-blue-600">Closed User Group(CUG)</h2>
        <p className="text-gray-600">Stay Connected Stay in Loop</p>
      </div>
      {/* Right Section */}
      <div className="flex justify-center items-center lg:w-1/2 text-white p-8">
        <form className="relative bg-blue-500 p-20 rounded-lg">
          <div className="absolute top-5 right-5">
            <span
              id="Admin"
              className={`cursor-pointer ${
                isAdmin ? "text-white" : "text-blue-200"
              }`}
              onClick={handleAdminClick}
            >
              Admin
            </span>
            <span
              id="Dealer"
              className={`cursor-pointer ml-4 ${
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
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                placeholder="User Name"
                className="w-full px-4 py-2 rounded-lg text-black"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                placeholder="Enter Password"
                className="w-full px-4 py-2 rounded-lg text-black"
              />
            </div>
            <div className="flex justify-between space-x-10 items-center mb-4 text-sm">
              <div>
                <input type="checkbox" id="rememberMe" className="mr-2" />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="#" className="text-blue-200">
                Forgot Password?
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                handeAdminLogin();
              }}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-2 rounded-lg"
            >
              Log in
            </button>
            {/* <p className="mt-4 text-sm">
              Don't have an account?
              <a href="#" className="text-blue-200">
                Sign up
              </a>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
