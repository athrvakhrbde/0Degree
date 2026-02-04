import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SET,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate Firebase config
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('Firebase configuration is missing. Please set environment variables in Vercel.');
}

// Initialize Firebase
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Firebase initialization error:', error);
  // Create a minimal config to prevent crashes
  const fallbackConfig = {
    apiKey: 'demo',
    authDomain: 'demo.firebaseapp.com',
    projectId: 'demo',
    storageBucket: 'demo.appspot.com',
    messagingSenderId: '123456789',
    appId: '1:123456789:web:demo'
  };
  app = initializeApp(fallbackConfig, 'fallback');
}

const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
