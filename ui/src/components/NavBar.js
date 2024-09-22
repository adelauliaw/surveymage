// NavBar.js
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../App';
import { signOut } from 'firebase/auth';
import SignIn from './SignIn';

function NavBar() {
  const [user] = useAuthState(auth);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const handleSignInClick = () => {
    setShowSignIn(true);
  };

  const getUserDisplayName = () => {
    if (user) {
      if (user.displayName) {
        return user.displayName;
      } else if (user.email) {
        // Trim the email up to @gmail.com
        const trimmedEmail = user.email.split('@')[0];
        return trimmedEmail;
      }
      return 'User';
    }
    return '';
  };

  return (
    <nav className="bg-cool-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Survey Mage</div>
        <div className="flex items-center">
          {user && !user.isAnonymous && (
            <span className="text-cool-blue-100 mr-4">Hi, {getUserDisplayName()}</span>
          )}
          {user && !user.isAnonymous ? (
            <button
              onClick={handleSignOut}
              className="bg-cool-blue-600 hover:bg-cool-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={handleSignInClick}
              className="bg-cool-blue-500 hover:bg-cool-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
      {showSignIn && (
        <SignIn onClose={() => setShowSignIn(false)} />
      )}
    </nav>
  );
}

export default NavBar;
