import { CashFlow, CashFlowType, Year, YearMonthString } from "~/types";
import { parseMonth, parseYear } from "~/utils/date";

import * as firestore from "./firestore";

const COLLECTION_NAME = "cashFlows";

async function update(type: CashFlowType, cashFlow: CashFlow, amount: number) {
  const { id, ...payload } = cashFlow;
  await firestore.updateDocument(COLLECTION_NAME, id, {
    ...payload,
    [type]: amount,
  });
}

async function create(
  type: CashFlowType,
  yearMonth: YearMonthString,
  amount: number
) {
  await firestore.createDocument(COLLECTION_NAME, {
    year: parseYear(yearMonth),
    month: parseMonth(yearMonth),
    [type]: amount,
  });
}

function getByYearMonth(yearMonth: YearMonthString) {
  return firestore.query<CashFlow>(COLLECTION_NAME, {
    year: parseYear(yearMonth),
    month: parseMonth(yearMonth),
  });
}

function getAllByYear(year: Year) {
  return firestore.queryAll<CashFlow>(COLLECTION_NAME, { year });
}

const cashFlowApi: CashFlowApi = {
  update,
  create,
  getAllByYear,
  getByYearMonth,
};

export default cashFlowApi;

export interface CashFlowApi {
  create: (
    type: CashFlowType,
    yearMonth: YearMonthString,
    amount: number
  ) => Promise<void>;
  update: (
    type: CashFlowType,
    cashFlow: CashFlow,
    amount: number
  ) => Promise<void>;
  getByYearMonth: (yearMonth: YearMonthString) => Promise<CashFlow | undefined>;
  getAllByYear: (year: Year) => Promise<CashFlow[]>;
}
