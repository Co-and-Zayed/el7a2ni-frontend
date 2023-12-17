import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCySV6dNI8FeV1k6Y0tnfakvQxvYvfGcUI",
  authDomain: "el7a2ni---acl-project.firebaseapp.com",
  projectId: "el7a2ni---acl-project",
  storageBucket: "el7a2ni---acl-project.appspot.com",
  messagingSenderId: "198563552127",
  appId: "1:198563552127:web:d71e393daf15ab6855d84a",
  measurementId: "G-HF4NY9D0EB",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const firestore = getFirestore();
