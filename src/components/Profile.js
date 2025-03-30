import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import { getUserData, updateUserData } from '../data/mockData';
import './Profile.css';

function Profile() {
  const { currentUser } = useContext(UserContext);
  const [displayName, setDisplayName] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load user data from local storage
    const userData = getUserData();
    setDisplayName(userData.displayName || '');
    setProfilePicURL(userData.photoURL || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Update user data in local storage
      updateUserData({
        displayName,
        photoURL: profilePicURL
      });
      
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Your Profile</h1>
        
        <div className="profile-pic-container">
          <div className="profile-pic">
            {profilePicURL ? (
              <img src={profilePicURL} alt="Profile" />
            ) : (
              <div className="profile-pic-placeholder">
                {displayName ? displayName.charAt(0).toUpperCase() : '?'}
              </div>
            )}
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Profile Picture URL</label>
            <input
              type="url"
              value={profilePicURL}
              onChange={(e) => setProfilePicURL(e.target.value)}
              placeholder="https://example.com/profile.jpg"
            />
          </div>
          
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
            />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={currentUser?.email || 'demo@example.com'}
              disabled
              className="disabled"
            />
          </div>
          
          <button type="submit" disabled={loading} className="save-btn">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Profile;