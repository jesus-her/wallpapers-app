import { getDocs, collection } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

// Categories
export async function fetchAllCategories () {
  try {
    const querySnapshot = await getDocs(collection(FIREBASE_DB, 'categories'))
    const allCategories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return allCategories
  } catch (error) {
    console.error('Error fetching images:', error)

    console.log(error)
  }
}
