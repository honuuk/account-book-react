import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  getDocs,
} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function queryAll<T = any>(
  collectionName: string,
  condition: Record<string, any>
) {
  const collectionRef = collection(db, collectionName);

  const q = firestoreQuery(
    collectionRef,
    ...conditionToFirestoreWhere(condition)
  );

  const result: T[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => result.push(doc.data() as T));

  return result;
}

function conditionToFirestoreWhere(condition: Record<string, any>) {
  return Object.entries(condition).map(([key, value]) =>
    where(key, "==", value)
  );
}
