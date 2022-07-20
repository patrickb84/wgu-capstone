import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  // REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
  REACT_APP_MEASUREMENT_ID,
} = process.env

// const firebaseConfig = {
//   apiKey: 'AIzaSyBIqE7MggOd0yGnBovuwkMIDnNYEuWCjAs',
//   authDomain: 'wgu-capstone-e02b9.firebaseapp.com',
//   projectId: 'wgu-capstone-e02b9',
//   storageBucket: 'wgu-capstone-e02b9.appspot.com',
//   messagingSenderId: '275011168045',
//   appId: '1:275011168045:web:291fc99fa19953451395a4',
//   measurementId: 'G-41L8PZRB9W',
// }

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  // databaseURL: REACT_APP_DATABASE_URL,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  measurementId: REACT_APP_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const auth = getAuth(app)