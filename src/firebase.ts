import { initializeApp } from 'firebase/app'
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, provider)
    const result = await getRedirectResult(auth)
    if (result) {
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      return token
    }
  } catch (error) {
    console.error('구글 로그인 중 오류 발생:', error)
    return null
  }
}
