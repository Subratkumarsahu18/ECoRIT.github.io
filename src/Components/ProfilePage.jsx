import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ProfilePage = () => {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    bio: 'WELCOME TO CLOSED USER GROUP OF ECor',
    profilePic: 'https://via.placeholder.com/150',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex items-center justify-center py-8">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
          <div className="flex flex-col items-center space-y-4">
            <div className="mb-4">
              <img
                src={user.profilePic}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
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
