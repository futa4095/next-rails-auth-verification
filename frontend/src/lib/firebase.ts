import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIKrZd-MZC_nafgEDJZxnUA65uY4GbZgk",
  authDomain: "next-rails-proto5959.firebaseapp.com",
  projectId: "next-rails-proto5959",
  storageBucket: "next-rails-proto5959.appspot.com",
  messagingSenderId: "720571506077",
  appId: "1:720571506077:web:87c5fc031605a380e96374"
};

const app = initializeApp(firebaseConfig);
export const auth = () => getAuth(app);
