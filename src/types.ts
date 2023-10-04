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
