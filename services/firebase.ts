
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBGHQP26sTBZisEu-G5C5GTwYxBEx4vaiw",
  authDomain: "coffee-spark-ai-barista-8275b.firebaseapp.com",
  databaseURL: "https://coffee-spark-ai-barista-8275b-default-rtdb.firebaseio.com",
  projectId: "coffee-spark-ai-barista-8275b",
  storageBucket: "coffee-spark-ai-barista-8275b.firebasestorage.app",
  messagingSenderId: "715656059758",
  appId: "1:715656059758:web:f10d7c3722cc1736cb3f7f"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
