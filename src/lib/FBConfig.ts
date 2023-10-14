import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAI_ORYeYvJVngHm7yGG0fsdL1Jjwd_kpY',
  authDomain: 'stop-adhd.firebaseapp.com',
  projectId: 'stop-adhd',
  storageBucket: 'stop-adhd.appspot.com',
  messagingSenderId: '629637061763',
  appId: '1:629637061763:web:81ea837fe78dea793ccfb6',
  measurementId: 'G-E3MT5712JD',
};

console.log(process.env);
console.table(firebaseConfig);

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
