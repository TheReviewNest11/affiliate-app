import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App';
import { addLink } from '../data/mockData';
import './AddLink.css';

function AddLink() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Basic validation
    if (!productUrl || !productName) {
      setMessage('Product URL and name are required');
      setLoading(false);
      return;
    }

    // Check if URL is from Amazon
    if (!productUrl.includes('amazon.com') && !productUrl.includes('amzn.to')) {
      setMessage('Please enter a valid Amazon product URL');
      setLoading(false);
      return;
    }

    try {
      // Add new link to local storage
      addLink({
        userId: currentUser.uid,
        productUrl,
        productName,
        productDescription,
        productImage,
        category
      });

      // Show success message
      setMessage('Affiliate link added successfully!');
      
      // Reset form after 1.5 seconds
      setTimeout(() => {
        // Reset form
        setProductUrl('');
        setProductName('');
        setProductDescription('');
        setProductImage('');
        setCategory('');
        
        // Navigate back to links page
        navigate('/');
      }, 1500);
      
    } catch (error) {
      console.error('Error adding affiliate link: ', error);
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-link-container">
      <div className="add-link-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>Add Amazon Affiliate Link</h1>
          <Link to="/" className="back-btn" style={{ padding: '8px 15px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', textDecoration: 'none', color: '#333' }}>Back to Links</Link>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amazon Product URL</label>
            <input
              type="url"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              placeholder="https://www.amazon.com/product-name/dp/ASIN"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Product Name"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Product Description</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Brief description of the product"
              rows={4}
            />
          </div>
          
          <div className="form-group">
            <label>Product Image URL</label>
            <input
              type="url"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
            {productImage && (
              <div className="image-preview">
                <img src={productImage} alt="Product preview" />
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Electronics, Books, Clothing"
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : 'Add Affiliate Link'}
          </button>
          
          {message && <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddLink;