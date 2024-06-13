import { CashFlow, CashFlowType, Month, Year, YearMonthString } from "~/types";
import { getLastMonth, subYear } from "~/utils/date";

import * as firestore from "./firestore";

const COLLECTION_NAME = "cashFlows";

const getCashFlowService = async (year: Year) => {
  const cashFlows = await firestore.queryAll(COLLECTION_NAME, { year });
  const lastYearCashFlows = await firestore.queryAll(COLLECTION_NAME, {
    year: subYear(year),
  });

  return new CashFlowService(cashFlows, lastYearCashFlows);
};

export default getCashFlowService;

const updateCashFlow = async (id: string, payload: Omit<CashFlow, "id">) => {
  await firestore.updateDocument(COLLECTION_NAME, id, payload);
};

export class CashFlowService implements ICashFlowService {
  private cashFlows: CashFlow[] = [];
  private lastYearCashFlows: CashFlow[] = [];
  private cashFlowMap: Record<YearMonthString, CashFlow> = {};

  constructor(cashFlows: CashFlow[], lastYearCashFlows: CashFlow[]) {
    this.cashFlows = cashFlows;
    this.lastYearCashFlows = lastYearCashFlows;
    this.cashFlowMap = [...cashFlows, ...lastYearCashFlows].reduce(
      (acc, cashFlow) => ({
        ...acc,
        [`${cashFlow.year}-${cashFlow.month}`]: cashFlow,
      }),
      {}
    );
  }

  getCurrentMonthLabel(type: CashFlowType) {
    if (type === "spending") return "이번 달 지출";
    if (type === "income") return "이번 달 소득";
    if (type === "saving") return "이번 달 저축";
    return "something wrong";
  }

  getCurrentMonth(type: CashFlowType, yearMonth: YearMonthString) {
    const cashFlow = this.cashFlowMap[yearMonth];
    if (!cashFlow) return "-";
    if (type === "spending") return `- ${cashFlow.spending.toLocaleString()}원`;
    if (type === "income") return `${cashFlow.income.toLocaleString()}원`;
    if (type === "saving")
      return `${(cashFlow.income - cashFlow.spending).toLocaleString()}원`;
    return "something wrong";
  }

  getCurrentMonthValue(type: CashFlowType, yearMonth: YearMonthString) {
    const cashFlow = this.cashFlowMap[yearMonth];
    if (!cashFlow) return;
    if (type === "spending") return cashFlow.spending;
    if (type === "income") return cashFlow.income;
    if (type === "saving") return cashFlow.income - cashFlow.spending;
    return -Number.MAX_SAFE_INTEGER;
  }

  getMoM(type: CashFlowType, yearMonth: YearMonthString) {
    const current = this.cashFlowMap[yearMonth];
    const last = this.cashFlowMap[getLastMonth(yearMonth)];

    if (!current || !last) return "";

    const MoM = (() => {
      switch (type) {
        case "spending":
          return ((current.spending - last.spending) / last.spending) * 100;
        case "income":
          return ((current.income - last.income) / last.income) * 100;
        case "saving": {
          const currentSaving = current.income - current.spending;
          const lastSaving = last.income - last.spending;
          return ((currentSaving - lastSaving) / lastSaving) * 100;
        }
        default:
          return "something wrong";
      }
    })();

    if (typeof MoM === "string") return MoM;
    return MoM > 0
      ? `+${MoM.toFixed(2)}% from last month`
      : `${MoM.toFixed(2)}% from last month`;
  }

  getCurrentYearLabel(type: CashFlowType) {
    if (type === "spending") return "올해 총 지출";
    if (type === "income") return "올해 총 소득";
    if (type === "saving") return "올해 총 저축";
    return "something wrong";
  }

  getCurrentYear(type: CashFlowType) {
    if (type === "spending")
      return `- ${this.cashFlows
        .reduce((acc, { spending }) => acc + spending, 0)
        .toLocaleString()}원`;
    if (type === "income")
      return `${this.cashFlows
        .reduce((acc, { income }) => acc + income, 0)
        .toLocaleString()}원`;
    if (type === "saving")
      return `${this.cashFlows
        .reduce((acc, { income, spending }) => acc + (income - spending), 0)
        .toLocaleString()}원`;
    return "something wrong";
  }

  getYoY(type: CashFlowType) {
    const [current, last] = (() => {
      switch (type) {
        case "spending":
          return [
            this.cashFlows.reduce((acc, { spending }) => acc + spending, 0),
            this.lastYearCashFlows.reduce(
              (acc, { spending }) => acc + spending,
              0
            ),
          ];
        case "income":
          return [
            this.cashFlows.reduce((acc, { income }) => acc + income, 0),
            this.lastYearCashFlows.reduce((acc, { income }) => acc + income, 0),
          ];
        case "saving":
          return [
            this.cashFlows.reduce(
              (acc, { income, spending }) => acc + (income - spending),
              0
            ),
            this.lastYearCashFlows.reduce(
              (acc, { income, spending }) => acc + (income - spending),
              0
            ),
          ];
        default:
          return [];
      }
    })();

    if (!current || !last) return "";

    const YoY = ((current - last) / last) * 100;
    return YoY > 0
      ? `+${YoY.toFixed(2)}% from last year`
      : `${YoY.toFixed(2)}% from last year`;
  }

  getAnnualTrendLabel(type: CashFlowType) {
    if (type === "spending") return "월별 지출";
    if (type === "income") return "월별 소득";
    if (type === "saving") return "월별 저축";
    return "something wrong";
  }

  getAnnualData(type: CashFlowType) {
    if (type === "spending")
      return this.cashFlows.reduce(
        (acc, cashFlow) => ({ ...acc, [cashFlow.month]: cashFlow.spending }),
        {} as Record<Month, number>
      );
    if (type === "income")
      return this.cashFlows.reduce(
        (acc, cashFlow) => ({ ...acc, [cashFlow.month]: cashFlow.income }),
        {} as Record<Month, number>
      );
    if (type === "saving")
      return this.cashFlows.reduce(
        (acc, cashFlow) => ({
          ...acc,
          [cashFlow.month]: cashFlow.income - cashFlow.spending,
        }),
        {} as Record<Month, number>
      );

    return {} as Record<Month, number>;
  }

  async update(yearMonth: YearMonthString, type: CashFlowType, amount: number) {
    const cashFlow = this.cashFlowMap[yearMonth];
    if (!cashFlow || type === "saving") return;

    const { id, ...payload } = cashFlow;
    await updateCashFlow(id, { ...payload, [type]: amount });
  }
}

interface ICashFlowService {
  getCurrentMonthLabel: (type: CashFlowType) => string;
  getCurrentMonth: (type: CashFlowType, yearMonth: YearMonthString) => string;
  getCurrentMonthValue: (
    type: CashFlowType,
    yearMonth: YearMonthString
  ) => number | undefined;
  getMoM: (type: CashFlowType, yearMonth: YearMonthString) => string;
  getCurrentYearLabel: (type: CashFlowType) => string;
  getCurrentYear: (type: CashFlowType) => string;
  getYoY: (type: CashFlowType) => string;
  getAnnualTrendLabel: (type: CashFlowType) => string;
  getAnnualData: (type: CashFlowType) => Record<Month, number>;
  update: (
    yearMonth: YearMonthString,
    type: CashFlowType,
    amount: number
  ) => Promise<void>;
}
