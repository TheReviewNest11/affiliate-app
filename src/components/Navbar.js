import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Don't show navbar on login page or for public link viewer
  if (location.pathname === '/login' || location.pathname.startsWith('/view/')) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Amazon Affiliate Links
        </Link>
        
        {currentUser && (
          <div className="navbar-menu">
            <Link 
              to="/" 
              className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              My Links
            </Link>
            <Link 
              to="/add-link" 
              className={`navbar-item ${location.pathname === '/add-link' ? 'active' : ''}`}
            >
              Add Link
            </Link>
            <Link 
              to="/profile" 
              className={`navbar-item ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Profile
            </Link>
            
            <div className="navbar-right">
              <div className="navbar-user">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Profile" className="navbar-user-pic" />
                ) : (
                  <div className="navbar-user-pic-placeholder">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
                <span className="navbar-username">{currentUser.displayName || currentUser.email}</span>
              </div>
              
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;