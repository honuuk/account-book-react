import {
  addDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "@firebase/firestore";

import { RecordData } from "../types";
import { recordsCollection } from "./firestore";

export async function getRecords(month: string): Promise<RecordData[]> {
  const records: RecordData[] = [];

  const q = query(recordsCollection, where("month", "==", month));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) =>
    records.push({ id: doc.id, ...doc.data() } as RecordData)
  );

  return records;
}

export async function addRecord(record: RecordData) {
  await addDoc(recordsCollection, record);
}

export async function updateRecord(record: RecordData) {
  const { id, ...data } = record;
  const docRef = doc(recordsCollection, id);
  await setDoc(docRef, data, { merge: true });
}
