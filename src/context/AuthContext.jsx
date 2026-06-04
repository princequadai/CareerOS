import { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { auth } from '../firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'
import { saveUserProfile, getUserProfile } from '../utils/db'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true until Firebase resolves auth state

  // Listen to Firebase auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in — fetch their profile from Firestore
        try {
          const profile = await getUserProfile(firebaseUser.uid)
          const userData = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: profile?.name || firebaseUser.displayName || 'User',
            role: profile?.role || 'student'
          }
          setUser(userData)
        } catch (err) {
          console.error('Failed to fetch user profile:', err)
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || 'User',
            role: 'student'
          })
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  /**
   * Sign up a new user with Firebase Auth and save profile to Firestore
   */
  const signup = async (email, password, name, role = 'student', phone = '') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Set displayName on the Firebase Auth profile
    await updateProfile(firebaseUser, { displayName: name })

    // Save extended profile to Firestore
    const profileData = {
      name,
      email,
      phone,
      role,
      createdAt: Date.now()
    }
    await saveUserProfile(firebaseUser.uid, profileData)

    const userData = {
      uid: firebaseUser.uid,
      email,
      name,
      role
    }
    setUser(userData)

    toast.success(`Welcome to CareerOS, ${name}!`, {
      icon: '🎉',
      theme: 'colored',
      style: { background: '#2563eb', color: '#fff' }
    })

    return userData
  }

  /**
   * Log in an existing user with Firebase Auth
   */
  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const firebaseUser = userCredential.user

    // Fetch profile from Firestore
    const profile = await getUserProfile(firebaseUser.uid)
    const userData = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      name: profile?.name || firebaseUser.displayName || 'User',
      role: profile?.role || 'student'
    }
    setUser(userData)

    toast.success(`Welcome back, ${userData.name}!`, {
      icon: '👋',
      theme: 'colored',
      style: { background: '#2563eb', color: '#fff' }
    })

    return userData
  }

  /**
   * Log out the current user
   */
  const logout = async () => {
    await signOut(auth)
    setUser(null)
    toast.info('Logged out successfully', {
      icon: '🔒',
      theme: 'colored',
      style: { background: '#1e293b', color: '#fff' }
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
