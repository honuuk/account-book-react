export type Year = `${number}`;
export type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;

export type YearMonthString = `${Year}-${Month}`;

export interface Spending {
  year: Year;
  month: Month;
  income: number;
  spending: number;
}

export type SpendingTab = "spending" | "income" | "saving";
