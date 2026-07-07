import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db, isMock, logoutUser } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({
  user: null,
  role: null,
  loading: true,
  logout: () => Promise.resolve()
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    if (isMock) {
      // Mock Auth Mode listener
      auth.onAuthStateChanged((mockUser) => {
        if (mockUser) {
          setUser(mockUser);
          setRole(localStorage.getItem('mock_admin_role') || 'volunteer');
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      });
    } else {
      // Real Firebase Auth Mode
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser && firebaseUser.email) {
          try {
            // Check whitelist in firestore collection "admins"
            const docRef = doc(db, 'admins', firebaseUser.email.toLowerCase());
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setUser(firebaseUser);
              setRole(docSnap.data().role || 'volunteer');
            } else {
              // Not present in whitelist -> Auto logout
              console.warn(`User ${firebaseUser.email} is not whitelisted. Access denied.`);
              await logoutUser();
              setUser(null);
              setRole(null);
            }
          } catch (err) {
            console.error('Error fetching admin permissions:', err);
            setUser(null);
            setRole(null);
          }
        } else {
          setUser(null);
          setRole(null);
        }
        setLoading(false);
      });
    }

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    role,
    loading,
    logout: logoutUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
