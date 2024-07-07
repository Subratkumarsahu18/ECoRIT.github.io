import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig'; // Adjust the path if your firebaseConfig.js is in a different directory
import { doc, getDoc } from 'firebase/firestore';

function LandingPage() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = localStorage.getItem('eid'); // Assuming the user ID is stored in localStorage
        if (userId) {
          const userDoc = await getDoc(doc(db, 'Admin', userId));
          if (userDoc.exists()) {
            setUserName(userDoc.data().employeeName);
          } else {
            console.log('No such document!');
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserName();
  }, []);

  const goToDashboard = () => {
    navigate('/Admin_dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-black">
      <h1 className="text-4xl mb-2">Hey {userName} 👋</h1>
      <h2 className="text-2xl">Welcome to CUG Application</h2>

    </div>
  );
}

export default LandingPage;
