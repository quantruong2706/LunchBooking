import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, connectAuthEmulator } from 'firebase/auth'
import { initializeFirestore, getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getStorage, connectStorageEmulator } from 'firebase/storage'

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

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
})
const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider()
const storage = getStorage(app)

// connectAuthEmulator(auth, "http://localhost:9099");
// if(window.location.hostname === 'localhost'){
//   connectFirestoreEmulator(db, 'localhost', 8080);
//   connectStorageEmulator(storage,'localhost',9199)
// }

export { auth, db, googleAuthProvider, storage }
