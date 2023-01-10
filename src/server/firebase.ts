import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const { VITE_BASE_API_KEY } = import.meta.env

const firebaseConfig = {
  apiKey: 'AIzaSyDBiz4TUFtdQTE9ISHK5S5dtP6GIUaF8AU',
  authDomain: 'lunchbooking-d4fbf.firebaseapp.com',
  projectId: 'lunchbooking-d4fbf',
  storageBucket: 'lunchbooking-d4fbf.appspot.com',
  messagingSenderId: '123054878462',
  appId: '1:123054878462:web:7673277f92786f742abfaf',
  measurementId: 'G-Q9MMWCJ82S',
  // apiKey: 'AIzaSyDcsGPXU5iaQXyr5fxxft0q9Bvf8wcNu9Q',
  // authDomain: 'an-lunch.firebaseapp.com',
  // databaseURL: 'https://an-lunch-default-rtdb.asia-southeast1.firebasedatabase.app',
  // projectId: 'an-lunch',
  // storageBucket: 'an-lunch.appspot.com',
  // messagingSenderId: '593640378675',
  // appId: '1:593640378675:web:aef77080d743c6ccfb2e46',
  // measurementId: 'G-FD0279B6RW',
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
