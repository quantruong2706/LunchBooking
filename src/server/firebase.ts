import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const { VITE_BASE_API_KEY } = import.meta.env

const firebaseConfig = {
  apiKey: VITE_BASE_API_KEY,
  authDomain: 'an-lunch.firebaseapp.com',
  projectId: 'an-lunch',
  storageBucket: 'an-lunch.appspot.com',
  messagingSenderId: '593640378675',
  appId: '1:593640378675:web:aef77080d743c6ccfb2e46',
  measurementId: 'G-FD0279B6RW',
}

// const app = initializeApp(firebaseConfig)
// const db = initializeFirestore(app, {
//   experimentalForceLongPolling: true,
//   useFetchStreams: false,
// })

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = getFirestore(app)
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()

export { auth, db, googleAuthProvider }
