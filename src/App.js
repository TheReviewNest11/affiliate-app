import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import LinkList from './components/LinkList';
import AddLink from './components/AddLink';
import PublicLinkViewer from './components/PublicLinkViewer';
import './App.css';

// Private route component
function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/login" element={<Login />} />
              
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <LinkList />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/add-link" 
                element={
                  <PrivateRoute>
                    <AddLink />
                  </PrivateRoute>
                } 
              />
              
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              
              <Route path="/view/:userId" element={<PublicLinkViewer />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;