// Firebase initialization for CareerOS
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBOcw-wKRHTvo7QHG3OosU_s-I7FZ7T6zU",
  authDomain: "careeros9.firebaseapp.com",
  databaseURL: "https://careeros9-default-rtdb.firebaseio.com",
  projectId: "careeros9",
  storageBucket: "careeros9.firebasestorage.app",
  messagingSenderId: "1061869845529",
  appId: "1:1061869845529:web:a18f36302e982d5e333e88",
  measurementId: "G-93DE68W0MX"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Cloud Firestore
export const db = getFirestore(app)

// Firebase Auth
export const auth = getAuth(app)

export default app
