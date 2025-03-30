import React, { useState, useEffect } from 'react';
import { auth, db, storage } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(auth.currentUser);
  const [displayName, setDisplayName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setProfilePicURL(user.photoURL || '');
      
      // Fetch additional user data from Firestore
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            // You can set additional user data here if needed
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      
      fetchUserData();
    }
  }, [user]);

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      // Create a preview URL
      setProfilePicURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Upload profile picture if changed
      if (profilePic) {
        const storageRef = ref(storage, `profile_pics/${user.uid}`);
        await uploadBytes(storageRef, profilePic);
        const photoURL = await getDownloadURL(storageRef);
        
        // Update auth profile
        await updateProfile(auth.currentUser, {
          photoURL: photoURL
        });
        
        setProfilePicURL(photoURL);
      }
      
      // Update display name if changed
      if (displayName !== user.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: displayName
        });
      }
      
      // Update user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        photoURL: profilePicURL,
        lastUpdated: new Date()
      }, { merge: true });
      
      setMessage('Profile updated successfully!');
      // Update local user state
      setUser(auth.currentUser);
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
            <label htmlFor="profile-pic-upload" className="upload-btn">
              Change Profile Picture
              <input
                id="profile-pic-upload"
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                hidden
              />
            </label>
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
              value={user?.email || ''}
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