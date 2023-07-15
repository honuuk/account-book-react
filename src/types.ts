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
  title: string;
  category: SpendingCategory;
  type: SpendingType;
  price: number;
  description: string;
}
