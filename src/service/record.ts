import { collection, getDocs, query } from "@firebase/firestore";

import db from "./firestore";

export async function getRecords() {
  const q = query(collection(db, "records"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });

  return "";
}
