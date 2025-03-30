import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import './AddLink.css';

function AddLink() {
  const { currentUser } = useAuth();
  const [productUrl, setProductUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const extractAmazonProductInfo = (url) => {
    // This is a simplified example
    // In a real application, you might use Amazon's Product Advertising API
    // or parse more sophisticated data from the URL
    
    // Just setting some default values for now
    setProductName('');
    setProductDescription('');
    setProductImage('');
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setProductUrl(url);
    
    // Only try to extract info if it's an Amazon URL
    if (url.includes('amazon.com') || url.includes('amzn.to')) {
      extractAmazonProductInfo(url);
    }
  };

  const handleSubmit = async (e) => {
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
      await addDoc(collection(db, 'affiliateLinks'), {
        userId: currentUser.uid,
        productUrl,
        productName,
        productDescription,
        productImage,
        category,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      // Reset form
      setProductUrl('');
      setProductName('');
      setProductDescription('');
      setProductImage('');
      setCategory('');
      setMessage('Affiliate link added successfully!');
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
        <h1>Add Amazon Affiliate Link</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Amazon Product URL</label>
            <input
              type="url"
              value={productUrl}
              onChange={handleUrlChange}
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