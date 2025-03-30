// Mock data for affiliate links
export const mockAffiliateLinks = [
    {
      id: '1',
      productUrl: 'https://www.amazon.com/dp/B08N5KWB9H',
      productName: 'Wireless Earbuds',
      productDescription: 'Bluetooth 5.0 wireless earbuds with noise cancellation and long battery life.',
      productImage: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=600&auto=format&fit=crop',
      category: 'Electronics',
      createdAt: new Date('2023-01-15')
    },
    {
      id: '2',
      productUrl: 'https://www.amazon.com/dp/B07ZGLLWBT',
      productName: 'Smart Watch',
      productDescription: 'Fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications.',
      productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop',
      category: 'Wearables',
      createdAt: new Date('2023-02-10')
    },
    {
      id: '3',
      productUrl: 'https://www.amazon.com/dp/B08F7QTQRK',
      productName: 'Portable Charger',
      productDescription: '20000mAh power bank with fast charging for smartphones and tablets.',
      productImage: 'https://images.unsplash.com/photo-1583863788301-5151faa7a8d8?w=600&auto=format&fit=crop',
      category: 'Electronics',
      createdAt: new Date('2023-03-05')
    },
    {
      id: '4',
      productUrl: 'https://www.amazon.com/dp/B08J65DST5',
      productName: 'Smart Home Camera',
      productDescription: 'Indoor security camera with motion detection, two-way audio, and night vision.',
      productImage: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=600&auto=format&fit=crop',
      category: 'Home Security',
      createdAt: new Date('2023-03-12')
    },
    {
      id: '5',
      productUrl: 'https://www.amazon.com/dp/B07YFF3JCN',
      productName: 'Wireless Keyboard and Mouse',
      productDescription: 'Ergonomic keyboard and mouse combo with long battery life for work or gaming.',
      productImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop',
      category: 'Computer Accessories',
      createdAt: new Date('2023-04-20')
    }
  ];
  
  // Mock user data
  export const mockUserData = {
    uid: 'mock-user-123',
    email: 'demo@example.com',
    displayName: 'Demo User',
    photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop'
  };
  
  // Local storage keys
  export const STORAGE_KEYS = {
    LINKS: 'affiliate_links',
    USER: 'user_data'
  };
  
  // Initialize local storage with mock data if empty
  export const initializeMockData = () => {
    if (!localStorage.getItem(STORAGE_KEYS.LINKS)) {
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(mockAffiliateLinks));
    }
    
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(mockUserData));
    }
  };
  
  // Get all links
  export const getLinks = () => {
    const links = localStorage.getItem(STORAGE_KEYS.LINKS);
    return links ? JSON.parse(links) : [];
  };
  
  // Add a new link
  export const addLink = (link) => {
    const links = getLinks();
    const newLink = {
      ...link,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    links.push(newLink);
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
    return newLink;
  };
  
  // Delete a link
  export const deleteLink = (id) => {
    const links = getLinks();
    const updatedLinks = links.filter(link => link.id !== id);
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(updatedLinks));
  };
  
  // Update user data
  export const updateUserData = (userData) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify({
      ...mockUserData,
      ...userData
    }));
  };
  
  // Get user data
  export const getUserData = () => {
    const userData = localStorage.getItem(STORAGE_KEYS.USER);
    return userData ? JSON.parse(userData) : mockUserData;
  };