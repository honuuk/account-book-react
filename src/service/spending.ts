import { Spending, Year } from "~/types";
import * as firestore from "./firestore";

const COLLECTION_NAME = "spending";

export const spending: SpendingApi = {
  findAllByYear: (year: string) => {
    return firestore.queryAll(COLLECTION_NAME, { year });
  },
};

export interface SpendingApi {
  findAllByYear: (year: Year) => Promise<Spending[]>;
}
