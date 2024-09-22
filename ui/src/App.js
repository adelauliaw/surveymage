import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import './index.css';
import SurveyDesigner from './components/SurveyDesigner';
import NavBar from './components/NavBar';
import SignIn from './components/SignIn';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjAxPgezt1n2PRvc0uJcKYJd-NU8L-2kA",
  authDomain: "surveygame-d2d4c.firebaseapp.com",
  projectId: "surveygame-d2d4c",
  storageBucket: "surveygame-d2d4c.appspot.com",
  messagingSenderId: "759094652036",
  appId: "1:759094652036:web:cd19d077d76d537ded26d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

function App() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      if (user) {
        console.log('User logged in:', user);
      } else {
        console.log('No user logged in, signing in anonymously...');
        signInAnonymously(auth)
          .then((result) => {
            console.log('Anonymous user signed in:', result.user);
          })
          .catch((error) => {
            console.error('Error signing in anonymously:', error);
          });
      }
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="h-screen">
        {user ? (
          <SurveyDesigner />
        ) : (
          <div className="flex justify-center items-center h-full">
            <SignIn />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
