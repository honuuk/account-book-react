import { CashFlow, Year } from "~/types";
import * as firestore from "./firestore";

const COLLECTION_NAME = "cashFlows";

const cashFlow: CashFlowApi = {
  findAllByYear: (year: string) => {
    return firestore.queryAll(COLLECTION_NAME, { year });
  },
};

export default cashFlow;

export interface CashFlowApi {
  findAllByYear: (year: Year) => Promise<CashFlow[]>;
}
