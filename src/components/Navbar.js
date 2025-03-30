import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../App';
import { getUserData } from '../data/mockData';
import './Navbar.css';

function Navbar() {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const userData = getUserData();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Amazon Affiliate Links
        </Link>
        
        <div className="navbar-menu">
          {/* <Link 
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
          </Link> */}

          
          {/* <div className="navbar-right">
            <div className="navbar-user">
              <span className="navbar-username">Demo Mode</span>
            </div>
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;