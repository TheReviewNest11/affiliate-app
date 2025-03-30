import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import ShareLinks from './ShareLinks';
import './LinkList.css';

function LinkList() {
  const { currentUser } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      if (!currentUser) return;

      try {
        const q = query(
          collection(db, 'affiliateLinks'),
          where('userId', '==', currentUser.uid),
          orderBy('createdAt', 'desc')
        );
        
        const querySnapshot = await getDocs(q);
        const linksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLinks(linksData);
      } catch (error) {
        console.error('Error fetching affiliate links: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, [currentUser]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this affiliate link?')) {
      try {
        await deleteDoc(doc(db, 'affiliateLinks', id));
        setLinks(links.filter(link => link.id !== id));
      } catch (error) {
        console.error('Error deleting affiliate link: ', error);
      }
    }
  };

  const filteredLinks = filter 
    ? links.filter(link => 
        link.productName.toLowerCase().includes(filter.toLowerCase()) ||
        link.productDescription.toLowerCase().includes(filter.toLowerCase()) ||
        link.category.toLowerCase().includes(filter.toLowerCase())
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
          <button className="add-link-btn" onClick={() => window.location.href = '/add-link'}>
            Add Your First Link
          </button>
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