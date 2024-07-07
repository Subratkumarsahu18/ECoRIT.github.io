import React, { useEffect, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebaseConfig"; // Adjust the path as needed
import Header from "./Header";
import Footer from "./Footer";
import {
  collection,
  query,
  doc,
  where,
  getDocs,
  setDoc,
} from "firebase/firestore";

const ProfilePage = () => {
  const eid = localStorage.getItem("eid");
  const level = localStorage.getItem('user')
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
          setid(doc.id);
          setUser(doc.data());
        });
      }
    };
    fetchfata();
  }, []);

  const [uploading, setUploading] = useState(false);

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploading(true);

      try {
        console.log(id);
        if (id) {
          const imageRef = ref(
            storage,
            `profile_pictures/${selectedFile?.name}`
          );
          await uploadBytes(imageRef, selectedFile);
          const downloadURL = await getDownloadURL(imageRef);
          console.log(downloadURL);
          setUser((prevUser) => ({ ...prevUser, profilePic: downloadURL }));
          alert("Image uploaded successfully!");
          if(level ==0)
          localStorage.setItem("pimg", downloadURL);
          else
          localStorage.setItem("dimg", downloadURL);
          const userDocRef = doc(db, "Admin", id); // Replace "users" with your collection name and userId with actual user ID
          await setDoc(
            userDocRef,
            { profilePic: downloadURL },
            { merge: true }
          );
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
        alert("Failed to upload image.");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="mb-4 relative">
              <label className="cursor-pointer">
                <img
                  src={user?.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover cursor-pointer"
                />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user?.employeeName}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user?.email}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={user?.contactNumber}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={user?.employeeID}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
