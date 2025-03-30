import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ShareLinks() {
  const { currentUser } = useAuth();
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
    const shareUrl = `${window.location.origin}/view/${currentUser.uid}`;
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
                value={`${window.location.origin}/view/${currentUser.uid}`} 
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

export default ShareLinks;