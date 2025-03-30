// This is a mock implementation to replace Firebase dependencies
// It provides empty objects and functions that satisfy the imports without actual Firebase functionality

// Mock authentication
const auth = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      // Simulate a logged-in user
      setTimeout(() => {
        const mockUser = {
          uid: '123456',
          email: 'demo@example.com',
          displayName: 'Demo User',
          photoURL: null
        };
        auth.currentUser = mockUser;
        callback(mockUser);
      }, 1000);
      return () => {}; // Return unsubscribe function
    }
  };
  
  // Mock Firestore
  const db = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({
          exists: true,
          data: () => ({ /* mock data */ }),
          id: 'mock-id'
        }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve()
      }),
      where: () => ({
        orderBy: () => ({
          get: () => Promise.resolve({
            docs: []
          })
        })
      }),
      add: () => Promise.resolve({ id: 'new-doc-id' })
    })
  };
  
  // Mock Storage
  const storage = {
    ref: () => ({
      put: () => Promise.resolve(),
      getDownloadURL: () => Promise.resolve('https://example.com/placeholder.jpg')
    })
  };
  
  // Mock Google provider
  const googleProvider = {};
  
  // Mock sign-in functions
  const signInWithRedirect = () => Promise.resolve();
  const getRedirectResult = () => Promise.resolve({ user: auth.currentUser });
  const signOut = () => Promise.resolve();
  
  export { 
    auth, 
    db, 
    storage, 
    googleProvider, 
    signInWithRedirect, 
    getRedirectResult, 
    signOut 
  };
  export default { auth, db, storage };