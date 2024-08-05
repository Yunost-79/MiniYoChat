import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: 'miniyochat-2.firebaseapp.com',
  projectId: 'miniyochat-2',
  storageBucket: 'miniyochat-2.appspot.com',
  messagingSenderId: '204537263377',
  appId: '1:204537263377:web:5f60981ab5f0b947a148b0',
};
console.log('VITE_TEST_KEY:', import.meta.env.VITE_TEST_KEY);

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

export { app, auth, storage, db };
