import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        setLoading(true);
        const result = await getRedirectResult(auth);
        if (result) {
          // User is signed in, navigate to home
          navigate('/');
        }
      } catch (error) {
        setError(error.message);
        console.error('Error with redirect sign-in: ', error);
      } finally {
        setLoading(false);
      }
    };

    checkRedirectResult();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, googleProvider);
      // The page will redirect to Google and then back to the app
    } catch (error) {
      setError(error.message);
      console.error('Error starting Google sign-in: ', error);
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Amazon Affiliate Links</h1>
        <p>Manage your affiliate links in one place</p>
        
        <button 
          className="google-sign-in" 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          {loading ? (
            'Signing in...'
          ) : (
            <>
              <img 
                src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" 
                alt="Google logo" 
              />
              Sign in with Google
            </>
          )}
        </button>
        
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;