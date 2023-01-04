import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'

const { VITE_BASE_API_KEY } = import.meta.env

const firebaseConfig = {
  apiKey: VITE_BASE_API_KEY,
  authDomain: 'lunchbooking-d4fbf.firebaseapp.com',
  projectId: 'lunchbooking-d4fbf',
  storageBucket: 'lunchbooking-d4fbf.appspot.com',
  messagingSenderId: '123054878462',
  appId: '1:123054878462:web:7673277f92786f742abfaf',
  measurementId: 'G-Q9MMWCJ82S',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export { auth, db, googleAuthProvider }
