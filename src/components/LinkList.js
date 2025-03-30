import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { getLinks, initializeMockData } from '../data/mockData';
import './LinkList.css';

function LinkList() {
  const { currentUser } = useContext(UserContext);
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // Initialize mock data in local storage
    initializeMockData();
    
    // Load links from local storage
    setLinks(getLinks());
    setLoading(false);
  }, []);

  const filteredLinks = filter 
    ? links.filter(link => 
        link.productName.toLowerCase().includes(filter.toLowerCase()) ||
        (link.productDescription && link.productDescription.toLowerCase().includes(filter.toLowerCase())) ||
        (link.category && link.category.toLowerCase().includes(filter.toLowerCase()))
      )
    : links;

  if (loading) {
    return <div className="loading">Loading affiliate links...</div>;
  }

  return (
    <div className="link-list-container">
      {/* <div className="link-list-header">
        <h1>Your Affiliate Links</h1>
        <Link to="/add-link" className="add-link-btn" style={{ marginBottom: '20px' }}>Add New Link</Link>
      </div> */}
      
      <div className="link-list-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search links..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            Grid View
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List View
          </button>
        </div>
      </div>
      
      {filteredLinks.length === 0 ? (
        <div className="no-links">
          <p>You haven't added any affiliate links yet.</p>
          <Link to="/add-link" className="add-link-btn">
            Add Your First Link
          </Link>
        </div>
      ) : (
        <div className={`links-container ${viewMode}`}>
          {filteredLinks.map(link => (
            <div key={link.id} className="link-item">
              <div className="link-image">
                {link.productImage ? (
                  <img src={link.productImage} alt={link.productName} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              
              <div className="link-details">
                <h2>{link.productName}</h2>
                {link.category && <span className="link-category">{link.category}</span>}
                <p className="link-description">{link.productDescription || 'No description provided'}</p>
                
                <div className="link-actions">
                  <a 
                    href={link.productUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="buy-now-btn"
                    style={{ width: "100%" }}
                  >
                    Buy Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LinkList;