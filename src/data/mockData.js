// Mock data for affiliate links
export const mockAffiliateLinks = [
    {
      id: '1',
      productUrl: 'https://www.amazon.in/dp/B0DQCV2ZHV?th=1&linkCode=ll1&tag=thereviewne0b-21&linkId=dc4f0897f32abe237e8d531e90109c05&language=en_IN&ref_=as_li_ss_tl',
      productName: 'PANCA Stainless Steel Paneer Maker ',
      productDescription: 'PANCA Stainless Steel Paneer Maker Mould Medium Size, Paneer Press With Lid, Tofu Press Mould Maker, Whey Seperator (Square, 450ml Capacity)',
      productImage: 'https://m.media-amazon.com/images/I/71eRy+IG1NL._SX679_.jpg',
      category: 'Kitchen & Dining',
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
  
  // Simplified mock user data - just an ID for linking affiliate products
  export const mockUserData = {
    uid: 'mock-user-123'
  };
  
  // Local storage keys - only need links now
  export const STORAGE_KEYS = {
    LINKS: 'affiliate_links'
  };
  
  // Initialize local storage with mock data if empty
  export const initializeMockData = () => {
    if (!localStorage.getItem(STORAGE_KEYS.LINKS)) {
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(mockAffiliateLinks));
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
  
  // Get mock user data - simplified version
  export const getUserData = () => {
    return mockUserData;
  };