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
const isConfigValid = 
  firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId &&
  firebaseConfig.storageBucket &&
  firebaseConfig.messagingSenderId &&
  firebaseConfig.appId;

// Initialize Firebase only if config is valid
let app;
if (isConfigValid) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Firebase initialization error:', error);
    }
    // Create a minimal config to prevent crashes during build
    const fallbackConfig = {
      apiKey: 'demo-key',
      authDomain: 'demo.firebaseapp.com',
      projectId: 'demo',
      storageBucket: 'demo.appspot.com',
      messagingSenderId: '123456789',
      appId: '1:123456789:web:demo'
    };
    app = initializeApp(fallbackConfig, 'fallback');
  }
} else {
  // During build, create a dummy app to prevent crashes
  // This will be replaced with real config at runtime
  if (typeof window === 'undefined') {
    // Server-side (build time)
    const fallbackConfig = {
      apiKey: 'build-time-placeholder',
      authDomain: 'placeholder.firebaseapp.com',
      projectId: 'placeholder',
      storageBucket: 'placeholder.appspot.com',
      messagingSenderId: '000000000',
      appId: '1:000000000:web:placeholder'
    };
    try {
      app = !getApps().length ? initializeApp(fallbackConfig, 'build-time') : getApp('build-time');
    } catch (e) {
      // If already initialized, get it
      app = getApp('build-time');
    }
  } else {
    // Client-side - should have env vars
    if (process.env.NODE_ENV === 'development') {
      console.error('Firebase configuration is missing. Please set environment variables in Vercel.');
    }
    const fallbackConfig = {
      apiKey: 'demo-key',
      authDomain: 'demo.firebaseapp.com',
      projectId: 'demo',
      storageBucket: 'demo.appspot.com',
      messagingSenderId: '123456789',
      appId: '1:123456789:web:demo'
    };
    app = initializeApp(fallbackConfig, 'fallback');
  }
}

const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
