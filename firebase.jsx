import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDFMgnBkhqNJy2ghENkbU8TtJoHUPYh3-U",
  authDomain: "notes-app-d4c16.firebaseapp.com",
  projectId: "notes-app-d4c16",
  storageBucket: "notes-app-d4c16.appspot.com",
  messagingSenderId: "242630438359",
  appId: "1:242630438359:web:cd99dc5645c4845222ef92"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")