export type Year = `${number}`;
export type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;

export type YearMonthString = `${Year}-${Month}`;

export type CashFlowType = "spending" | "income" | "saving";
export type CashFlow = {
  id: string;
  year: Year;
  month: Month;
} & {
  [key in Exclude<CashFlowType, "saving">]: number | undefined;
};
