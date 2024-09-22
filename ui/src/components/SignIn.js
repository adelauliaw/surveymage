// SignIn.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { auth } from '../App';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  linkWithPopup,
  linkWithCredential,  // Add this line
  EmailAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithCredential
} from 'firebase/auth';

function SignIn({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  const handleClickOutside = useCallback((event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleAuthError = async (error) => {
    console.error("Authentication error:", error);
    if (error.code === 'auth/credential-already-in-use') {
      try {
        const credential = GoogleAuthProvider.credentialFromError(error);
        if (credential) {
          // Sign in with the existing Google credential
          await signInWithCredential(auth, credential);
          // If an anonymous user exists, delete it
          if (auth.currentUser && auth.currentUser.isAnonymous) {
            await auth.currentUser.delete();
          }
          onClose();
        } else {
          setError("Credential not found in error");
        }
      } catch (signInError) {
        setError(signInError.message);
      }
    } else {
      setError(error.message);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      if (auth.currentUser && auth.currentUser.isAnonymous) {
        // Link anonymous user with Google account
        await linkWithPopup(auth.currentUser, provider);
        onClose();
      } else {
        // Sign in with Google
        await signInWithPopup(auth, provider);
        onClose();
      }
    } catch (error) {
      if (error.code === 'auth/credential-already-in-use') {
        await handleAuthError(error);
      } else {
        setError(error.message);
      }
    }
  };

  const handleEmailPasswordAuth = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);

      if (auth.currentUser && auth.currentUser.isAnonymous) {
        const credential = EmailAuthProvider.credential(email, password);
        await linkWithCredential(auth.currentUser, credential);
      } else if (methods.length > 0) {
        // Email exists, sign in
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Email doesn't exist, create new account
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-cool-blue-900 bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-cool-blue-800">Sign In / Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-2 border rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded"
            />
            <button
              type="submit"
              className="bg-cool-blue-500 hover:bg-cool-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            >
              {isRegistering ? 'Register' : 'Sign In'}
            </button>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center bg-white border border-cool-blue-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-cool-blue-800 hover:bg-cool-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cool-blue-500"
          >
            {/* Google Icon */}
            <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <defs>
                <path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
              </defs>
              <clipPath id="b">
                <use xlinkHref="#a" overflow="visible"/>
              </clipPath>
              <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/>
              <path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/>
              <path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/>
              <path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/>
            </svg>
            Sign in with Google
          </button>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-cool-blue-600 hover:text-cool-blue-700 mt-4 w-full text-center"
          >
            {isRegistering ? 'Already have an account? Sign In' : 'Need an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
