import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LinkList from './components/LinkList';
import AddLink from './components/AddLink';
import Profile from './components/Profile';
import './App.css';

// Mock user context to avoid needing Firebase
export const UserContext = React.createContext({
  currentUser: {
    uid: 'mock-user-123',
    email: 'demo@example.com',
    displayName: 'Demo User'
  }
});

function App() {
  // Always "logged in" with mock user
  const mockUser = {
    uid: 'mock-user-123',
    email: 'demo@example.com',
    displayName: 'Demo User'
  };

  return (
    <UserContext.Provider value={{ currentUser: mockUser }}>
      <Router basename="/affiliate-app">
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<LinkList />} />
              <Route path="/add-link" element={<AddLink />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;