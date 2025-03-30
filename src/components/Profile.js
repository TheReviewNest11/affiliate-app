import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { getUserData } from '../data/mockData';
import './Profile.css';

function Profile() {
  const { currentUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load user data
    const userData = getUserData();
    setDisplayName(userData.displayName || '');
    setProfilePicURL(userData.photoURL || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Since we removed updateUserData, just show a message
      setMessage('Profile functionality has been disabled in demo mode.');
    } catch (error) {
      console.error('Error:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Your Profile</h1>
        <p>Profile editing is disabled in demo mode.</p>
      </div>
    </div>
  );
}

export default Profile;