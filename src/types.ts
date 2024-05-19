export type Year = `${number}`;
export type Month = `0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}` | `1${0 | 1 | 2}`;

export type YearMonthString = `${Year}-${Month}`;

export type SpendingCategory =
  | "living"
  | "eat out"
  | "family"
  | "friend"
  | "transport"
  | "health"
  | "company"
  | "leisure"
  | "etc";
export type SpendingType = "card" | "cash" | "welfare";

export interface RecordData {
  id?: string;
  title: string;
  category: SpendingCategory;
  type: SpendingType;
  price: number;
  description: string;
  month: string;
  createdAt: Date;
  updatedAt: Date;
}
