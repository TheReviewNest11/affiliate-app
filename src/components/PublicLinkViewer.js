import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import './PublicLinkViewer.css';

function PublicLinkViewer() {
  const { userId } = useParams();
  const [links, setLinks] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUserAndLinks = async () => {
      try {
        // Fetch user data
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }

        // Fetch user's affiliate links
        const q = query(
          collection(db, 'affiliateLinks'),
          where('userId', '==', userId)
        );
        
        const querySnapshot = await getDocs(q);
        const linksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setLinks(linksData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserAndLinks();
    }
  }, [userId]);

  const handleBuyNowClick = (productUrl) => {
    // On mobile, try to open the Amazon app
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // Convert web URL to app URL if needed
      let appUrl = productUrl;
      
      // Extract ASIN if present
      const asinMatch = productUrl.match(/\/dp\/([A-Z0-9]{10})/);
      if (asinMatch && asinMatch[1]) {
        const asin = asinMatch[1];
        
        // Create deep link URLs for different platforms
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          // iOS deep link
          appUrl = `com.amazon.mobile.shopping://www.amazon.com/dp/${asin}`;
        } else {
          // Android deep link
          appUrl = `amzn://apps/android?p=com.amazon.mShop.android.shopping&url=${encodeURIComponent(`https://www.amazon.com/dp/${asin}`)}`;
        }
      }
      
      // Try to open the app first, then fall back to the web URL
      window.location.href = appUrl;
      
      // Set a timeout to redirect to the web URL if the app doesn't open
      setTimeout(() => {
        window.location.href = productUrl;
      }, 1000);
    } else {
      // On desktop, just open the URL
      window.open(productUrl, '_blank');
    }
  };

  const filteredLinks = filter 
    ? links.filter(link => 
        link.productName.toLowerCase().includes(filter.toLowerCase()) ||
        link.productDescription?.toLowerCase().includes(filter.toLowerCase()) ||
        link.category?.toLowerCase().includes(filter.toLowerCase())
      )
    : links;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <div className="not-found">User not found</div>;
  }

  return (
    <div className="public-viewer-container">
      <div className="user-profile-banner">
        <div className="user-profile-info">
          {userData.photoURL ? (
            <img src={userData.photoURL} alt="Profile" className="user-profile-pic" />
          ) : (
            <div className="user-profile-pic-placeholder">
              {userData.displayName ? userData.displayName.charAt(0).toUpperCase() : '?'}
            </div>
          )}
          <h1>{userData.displayName || 'Amazon Affiliate Links'}</h1>
        </div>
      </div>
      
      <div className="filter-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
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
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            List
          </button>
        </div>
      </div>
      
      {filteredLinks.length === 0 ? (
        <div className="no-links">No products found</div>
      ) : (
        <div className={`public-links-container ${viewMode}`}>
          {filteredLinks.map(link => (
            <div key={link.id} className="public-link-item">
              <div className="public-link-image">
                {link.productImage ? (
                  <img src={link.productImage} alt={link.productName} />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              
              <div className="public-link-details">
                <h2>{link.productName}</h2>
                {link.category && <span className="public-link-category">{link.category}</span>}
                <p className="public-link-description">{link.productDescription || 'No description available'}</p>
                
                <button 
                  className="buy-now-btn" 
                  onClick={() => handleBuyNowClick(link.productUrl)}
                >
                  Buy Now on Amazon
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PublicLinkViewer;