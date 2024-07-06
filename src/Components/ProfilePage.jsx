import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebaseConfig';
import Header from './Header';
import Footer from './Footer';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    bio: 'WELCOME TO CLOSED USER GROUP OF ECor',
    profilePic: 'https://via.placeholder.com/150',
  });

  const [image, setImage] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [cropMode, setCropMode] = useState(false);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImage(URL.createObjectURL(selectedFile));
      setCropMode(true);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const croppedImage = await getCroppedImg(image, croppedArea);
      const imageRef = ref(storage, `profile_pictures/${Date.now()}.jpg`);
      await uploadBytes(imageRef, croppedImage);
      const downloadURL = await getDownloadURL(imageRef);

      setUser((prevUser) => ({ ...prevUser, profilePic: downloadURL }));
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image: ', error);
      alert('Failed to upload image.');
    } finally {
      setUploading(false);
      setCropMode(false);
      setImage(null);
    }
  };

  const handleCancel = () => {
    setCropMode(false);
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="mb-4 relative">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                onClick={() => document.getElementById('fileInput').click()}
              />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {cropMode && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
                <div className="relative w-96 h-96">
                  <Cropper
                    image={image}
                    cropShape="round"
                    aspect={1}
                    onCropComplete={handleCropComplete}
                  />
                </div>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={handleUpload}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    disabled={uploading}
                  >
                    {uploading ? 'Uploading...' : 'Done'}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            <div className="w-full">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={user.phone}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={user.address}
                readOnly
                className="w-full px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              />
            </div>
            <div className="w-full">
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                value={user.bio}
                readOnly
                className="w-full h-32 px-3 py-2 mt-1 text-gray-700 bg-gray-200 border rounded-md focus:outline-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
