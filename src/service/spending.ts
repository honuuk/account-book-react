import { Spending } from "~/types";
import * as firestore from "./firestore";

const COLLECTION_NAME = "spending";

export const spending: SpendingApi = {
  findAllByYearMonth: (year: string, month: string) => {
    return firestore.queryAll(COLLECTION_NAME, { year, month });
  },
};

export interface SpendingApi {
  findAllByYearMonth: (year: string, month: string) => Promise<Spending[]>;
}
