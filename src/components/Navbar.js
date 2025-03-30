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
    <nav className="navbar" style={{ backgroundColor: '#232F3E' }}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="navbar-logo">
            {/* Using external SVG file */}
            <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="The Review Nest" style={{ width: '100%', height: '100%' }} />
          </div>
          <span style={{ color: 'white', fontWeight: '500', marginLeft: '12px' }}>
            Your Trusted Resource for Product Reviews
          </span>
        </Link>
        
        <div className="navbar-menu">
          {/* Navigation items removed as requested */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;