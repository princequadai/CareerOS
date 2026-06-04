// One-time seed script — imports colleges.json and writes to Cloud Firestore
// Call seedDatabaseIfEmpty() once from your app to populate the database.

import { db } from '../firebase'
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore'
import colleges from '../data/colleges.json'

/**
 * Seeds the colleges collection in Firestore if it's currently empty.
 * Safe to call multiple times — only writes on first run.
 */
export const seedDatabaseIfEmpty = async () => {
  try {
    const snapshot = await getDocs(collection(db, 'colleges'))
    if (!snapshot.empty) {
      console.log('ℹ️ Colleges already exist in Firestore — skipping seed.')
      return false
    }

    const batch = writeBatch(db)
    colleges.forEach(college => {
      const docRef = doc(db, 'colleges', String(college.id))
      batch.set(docRef, college)
    })
    await batch.commit()
    console.log('✅ Seeded', colleges.length, 'colleges into Cloud Firestore')
    return true
  } catch (error) {
    console.error('❌ Failed to seed database:', error)
    return false
  }
}
