import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import { getLinks, deleteLink, initializeMockData } from '../data/mockData';
import './LinkList.css';

function ShareLinks() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
    setCopied(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    const shareUrl = `${window.location.origin}/affiliate-app`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <div className="share-links">
      <button className="share-btn" onClick={handleShowModal}>
        Share My Affiliate Links
      </button>
      
      {showModal && (
        <div className="share-modal">
          <div className="share-modal-content">
            <h2>Share Your Affiliate Links</h2>
            <p>Share this link with others to view your Amazon affiliate products:</p>
            
            <div className="share-link-input">
              <input 
                type="text" 
                value={`${window.location.origin}/affiliate-app`} 
                readOnly 
              />
              <button className="copy-btn" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
            
            {copied && <p className="copied-message">Link copied to clipboard!</p>}
            
            <button className="close-btn" onClick={handleCloseModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

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

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this affiliate link?')) {
      deleteLink(id);
      setLinks(links.filter(link => link.id !== id));
    }
  };

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
      <div className="link-list-header">
        <h1>Your Affiliate Links</h1>
        <ShareLinks />
        
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
                  >
                    Buy Now
                  </a>
                  <button 
                    onClick={() => handleDelete(link.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
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