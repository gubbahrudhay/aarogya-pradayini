import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID;

const isFirebaseConfigured = apiKey && apiKey !== 'YOUR_API_KEY' && projectId;

let authInstance = null;
let dbInstance = null;
let googleProviderInstance = null;
let mockMode = false;

if (isFirebaseConfigured) {
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };

  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);
  googleProviderInstance = new GoogleAuthProvider();
} else {
  // Missing or dummy keys -> Enable local testing mock mode
  mockMode = true;
  console.warn('Firebase environment variables missing. Operating in simulated MOCK Mode.');

  // Mock database storage
  const mockStorage = {
    admins: [
      { email: 'admin@sai.org', role: 'super-admin' },
      { email: 'editor@sai.org', role: 'editor' },
      { email: 'volunteer@sai.org', role: 'volunteer' }
    ],
    blogs: [],
    healthBlogs: []
  };

  authInstance = {
    currentUser: null,
    onAuthStateChanged: (callback) => {
      // Simulate listener trigger
      const savedUser = localStorage.getItem('mock_admin_user');
      const userObj = savedUser ? JSON.parse(savedUser) : null;
      authInstance.currentUser = userObj;
      callback(userObj);
      return () => {};
    }
  };

  // Mock signInWithPopup using whitelisted credentials
  window.signInMockUser = (email) => {
    const admin = mockStorage.admins.find(a => a.email === email);
    if (!admin) {
      alert('Email not present in admins whitelist!');
      return Promise.reject(new Error('Unauthorized'));
    }
    const userObj = {
      uid: `mock-uid-${admin.email}`,
      email: admin.email,
      displayName: admin.email.split('@')[0].toUpperCase(),
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150'
    };
    localStorage.setItem('mock_admin_user', JSON.stringify(userObj));
    localStorage.setItem('mock_admin_role', admin.role);
    window.location.reload();
    return Promise.resolve({ user: userObj });
  };
}

export const auth = authInstance;
export const db = dbInstance;
export const googleProvider = googleProviderInstance;
export const isMock = mockMode;

// Mock login helpers
export const mockLogin = (email) => {
  if (window.signInMockUser) {
    return window.signInMockUser(email);
  }
  return Promise.reject(new Error('Not in mock mode'));
};

export const logoutUser = () => {
  if (mockMode) {
    localStorage.removeItem('mock_admin_user');
    localStorage.removeItem('mock_admin_role');
    window.location.reload();
    return Promise.resolve();
  }
  return signOut(auth);
};
