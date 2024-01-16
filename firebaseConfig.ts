// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDFURfKo61rmHCIRdDERuaTP-VP3OMLyBk',
  authDomain: 'my-app-f7e29.firebaseapp.com',
  projectId: 'my-app-f7e29',
  storageBucket: 'my-app-f7e29.appspot.com',
  messagingSenderId: '207798615695',
  appId: '1:207798615695:web:e5260da6e090db6dee3afa',
  measurementId: 'G-58DDSMSF80'
}

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
// const analytics = getAnalytics(app);
