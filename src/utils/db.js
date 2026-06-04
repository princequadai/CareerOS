// Database helper functions for Cloud Firestore
import { db } from '../firebase'
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore'

// ============================================
//  COLLEGES
// ============================================

/**
 * Write all colleges to Firestore (used for seeding)
 * Collection: colleges/{id}
 */
export const seedColleges = async (collegesArray) => {
  const batch = writeBatch(db)
  collegesArray.forEach(college => {
    const docRef = doc(db, 'colleges', String(college.id))
    batch.set(docRef, college)
  })
  await batch.commit()
  console.log('✅ Colleges seeded to Firestore')
}

/**
 * Get all colleges from Firestore
 * Returns an array of college objects
 */
export const getColleges = async () => {
  const snapshot = await getDocs(collection(db, 'colleges'))
  return snapshot.docs.map(d => ({ ...d.data(), docId: d.id }))
}

/**
 * Get a single college by ID
 */
export const getCollegeById = async (id) => {
  const docSnap = await getDoc(doc(db, 'colleges', String(id)))
  if (docSnap.exists()) {
    return { ...docSnap.data(), docId: docSnap.id }
  }
  return null
}

/**
 * Listen to all colleges in real-time
 * @param {Function} callback - receives colleges array
 * @returns {Function} unsubscribe function
 */
export const onCollegesChange = (callback) => {
  return onSnapshot(collection(db, 'colleges'), (snapshot) => {
    callback(snapshot.docs.map(d => ({ ...d.data(), docId: d.id })))
  })
}

// ============================================
//  USERS (stored in Firestore for profile data)
// ============================================

/**
 * Create or update a user profile in Firestore
 * Collection: users/{uid}
 */
export const saveUserProfile = async (uid, userData) => {
  await setDoc(doc(db, 'users', uid), {
    ...userData,
    updatedAt: serverTimestamp()
  }, { merge: true })
}

/**
 * Get a user profile by UID
 */
export const getUserProfile = async (uid) => {
  const docSnap = await getDoc(doc(db, 'users', uid))
  if (docSnap.exists()) {
    return docSnap.data()
  }
  return null
}

// ============================================
//  FAVORITES (per-user favorites in Firestore)
// ============================================

/**
 * Save user favorites to Firestore
 * Collection: favorites/{uid} → { collegeIds: [...] }
 */
export const saveFavorites = async (uid, favoritesArray) => {
  await setDoc(doc(db, 'favorites', uid), {
    collegeIds: favoritesArray,
    updatedAt: serverTimestamp()
  })
}

/**
 * Get user favorites from Firestore
 */
export const getFavorites = async (uid) => {
  const docSnap = await getDoc(doc(db, 'favorites', uid))
  if (docSnap.exists()) {
    return docSnap.data().collegeIds || []
  }
  return []
}

/**
 * Listen to user favorites in real-time
 */
export const onFavoritesChange = (uid, callback) => {
  return onSnapshot(doc(db, 'favorites', uid), (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().collegeIds || [])
    } else {
      callback([])
    }
  })
}

// ============================================
//  ENQUIRIES (college-specific enquiries)
// ============================================

/**
 * Submit an enquiry for a college
 * Collection: enquiries → { collegeId, name, email, phone, course, message, createdAt, status }
 */
export const submitEnquiry = async (collegeId, enquiryData) => {
  await addDoc(collection(db, 'enquiries'), {
    ...enquiryData,
    collegeId: Number(collegeId),
    createdAt: serverTimestamp(),
    status: 'new'
  })
}

/**
 * Get all enquiries for a college
 */
export const getEnquiriesByCollege = async (collegeId) => {
  const q = query(
    collection(db, 'enquiries'),
    where('collegeId', '==', Number(collegeId))
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

/**
 * Get all enquiries across all colleges (for admin)
 */
export const getAllEnquiries = async () => {
  const snapshot = await getDocs(collection(db, 'enquiries'))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ============================================
//  CONTACT MESSAGES (from Contact Us page)
// ============================================

/**
 * Submit a contact message
 * Collection: contactMessages → { name, email, subject, message, createdAt, status }
 */
export const submitContactMessage = async (messageData) => {
  await addDoc(collection(db, 'contactMessages'), {
    ...messageData,
    createdAt: serverTimestamp(),
    status: 'unread'
  })
}

/**
 * Get all contact messages (for admin)
 */
export const getContactMessages = async () => {
  const snapshot = await getDocs(collection(db, 'contactMessages'))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// ============================================
//  ADMIN STATS
// ============================================

/**
 * Get counts for admin dashboard
 */
export const getAdminStats = async () => {
  const [collegesSnap, usersSnap, enquiriesSnap, contactSnap] = await Promise.all([
    getDocs(collection(db, 'colleges')),
    getDocs(collection(db, 'users')),
    getDocs(collection(db, 'enquiries')),
    getDocs(collection(db, 'contactMessages'))
  ])

  return {
    totalColleges: collegesSnap.size,
    totalUsers: usersSnap.size,
    totalEnquiries: enquiriesSnap.size,
    totalMessages: contactSnap.size
  }
}
