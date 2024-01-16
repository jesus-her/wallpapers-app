import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  DocumentData,
  DocumentReference
} from 'firebase/firestore'
import { type IProduct } from '../interfaces/product'
import { create } from 'zustand'
import { FIREBASE_DB } from '../../firebaseConfig'

interface FavouritesState {
  likedProducts: IProduct[]
  loading: boolean
  loadFavourites: (uid: string) => Promise<void>
  addProductToFavourites: (product: IProduct, uid: string) => Promise<void>
  removeProductFromFavourites: (productId: string, uid: string) => Promise<void>
  isFavourited: (productId: string) => boolean
}
const useFavouritesStore = create<FavouritesState>((set, get) => ({
  likedProducts: [],
  loading: false,
  loadFavourites: async (uid: string) => {
    const userRef = doc(FIREBASE_DB, 'users', uid)

    set(state => ({ ...state, loading: true }))

    try {
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        const userData = userDoc.data()
        const likedProductsRefs = userData.likedProducts || []

        // Asumiendo que los productos favoritos se almacenan como referencias de documentos
        const likedProductsPromises = likedProductsRefs.map(
          (ref: DocumentReference<unknown, DocumentData>) => getDoc(ref)
        )
        const likedProductsDocs = await Promise.all(likedProductsPromises)

        // Convertir los documentos en objetos de productos
        const likedProducts = likedProductsDocs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        set(state => ({ ...state, likedProducts: likedProducts as IProduct[] }))
      }
    } catch (error) {
      console.error('Error al cargar los favoritos', error)
    } finally {
      set(state => ({ ...state, loading: false }))
    }
  },

  addProductToFavourites: async (product: IProduct, uid: string) => {
    const userRef = doc(FIREBASE_DB, 'users', uid)
    const productRef = doc(FIREBASE_DB, 'products_data', product.id)

    set(state => ({ ...state, loading: true }))

    try {
      await updateDoc(userRef, {
        likedProducts: arrayUnion(productRef)
      })

      set(state => ({
        likedProducts: state.likedProducts.some(p => p.id === product.id)
          ? state.likedProducts
          : [...state.likedProducts, product],
        loading: false
      }))
    } catch (error) {
      console.error('Error al agregar a favoritos', error)
      set(state => ({ ...state, loading: false }))
    }
  },

  removeProductFromFavourites: async (productId: string, uid: string) => {
    const userRef = doc(FIREBASE_DB, 'users', uid)
    const productRef = doc(FIREBASE_DB, 'products_data', productId)

    set(state => ({ ...state, loading: true }))

    try {
      await updateDoc(userRef, {
        likedProducts: arrayRemove(productRef)
      })

      set(state => ({
        likedProducts: state.likedProducts.filter(p => p.id !== productId),
        loading: false
      }))
    } catch (error) {
      console.error('Error al eliminar de favoritos', error)
      set(state => ({ ...state, loading: false }))
    }
  },
  isFavourited: (productId: string) => {
    const { likedProducts } = get()
    return likedProducts.some(product => product.id === productId)
  }
}))

export default useFavouritesStore
