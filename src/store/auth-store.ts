import { create } from 'zustand'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { type User } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

interface State {
  loading: boolean
  user: User | null
  setUser: (user: User | null) => void
  error: any

  signIn: (email: string, password: string) => Promise<void>
  createUser: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const useAuthStore = create<State>(set => ({
  loading: false,
  user: null,
  setUser: (user: User | null) => {
    set({ user: user })
  },
  error: null,

  signIn: async (email: string, password: string) => {
    set({ loading: true })
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      )
      set({ user: userCredential.user })
    } catch (error) {
      set({ error })
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },

  createUser: async (email: string, password: string) => {
    set({ loading: true })

    try {
      // Crear el usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      )
      const user = userCredential.user
      set({ user })

      // Datos adicionales del usuario que quieres almacenar
      const additionalUserData = {
        userHistory: {
          /* ...datos del historial del usuario... */
        },
        likedProducts: {
          /* ...productos que le gustaron al usuario... */
        }
      }

      await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
        userId: user.uid,
        email: user.email,
        ...additionalUserData
      })

      // console.log('¡Usuario creado con éxito en Auth y Firestore!', user);
    } catch (error) {
      set({ error })
      console.log(error)
    } finally {
      set({ loading: false })
    }
  },

  signOut: async () => {
    try {
      await FIREBASE_AUTH.signOut()
      set({ user: null }) // Restablece el estado del usuario a null después de cerrar sesión
    } catch (error) {
      set({ error })
      console.log(error)
    }
  }
}))

export default useAuthStore
