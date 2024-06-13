import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query as firestoreQuery,
  where,
  getDocs,
  doc,
  setDoc,
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
  querySnapshot.forEach((doc) => {
    result.push({ id: doc.id, ...doc.data() } as T);
  });

  return result;
}

export async function query<T = any>(
  collectionName: string,
  condition: Record<string, any>
) {
  const collectionRef = collection(db, collectionName);

  const q = firestoreQuery(
    collectionRef,
    ...conditionToFirestoreWhere(condition)
  );

  const querySnapshot = await getDocs(q);
  const document = querySnapshot.docs[0];

  return document ? ({ id: document.id, ...document.data() } as T) : undefined;
}

export async function updateDocument<T extends { [key: string]: any }>(
  collectionName: string,
  documentId: string,
  payload: T
) {
  await setDoc(doc(db, collectionName, documentId), payload);
}

function conditionToFirestoreWhere(condition: Record<string, any>) {
  return Object.entries(condition).map(([key, value]) =>
    where(key, "==", value)
  );
}
